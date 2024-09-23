import { AttachEnergyPrompt, CardList, GameError, GameLog, GameMessage, PlayerType, ShuffleDeckPrompt, SlotType, State, StateUtils, StoreLike, TrainerCard } from '../../game';
import { EnergyType, SuperType, TrainerType } from '../../game/store/card/card-types';
import { Effect } from '../../game/store/effects/effect';
import { TrainerEffect } from '../../game/store/effects/play-card-effects';

export class MaxElixir extends TrainerCard {

  public trainerType: TrainerType = TrainerType.ITEM;

  public set: string = 'BKP';

  public cardImage: string = 'assets/cardback.png';

  public setNumber: string = '102';

  public name: string = 'Max Elixir';

  public fullName: string = 'Max Elixir BKP';

  public text = 'Look at the top 6 cards of your deck and attach a basic Energy card you find there to a Basic Pokémon on your Bench. Shuffle the other cards back into your deck.';

  public reduceEffect(store: StoreLike, state: State, effect: Effect): State {

    if (effect instanceof TrainerEffect && effect.trainerCard === this) {
      const player = effect.player;

      if (player.deck.cards.length === 0) {
        throw new GameError(GameMessage.CANNOT_PLAY_THIS_CARD);
      }

      player.hand.moveCardTo(effect.trainerCard, player.supporter);
      // We will discard this card after prompt confirmation
      effect.preventDefault = true;

      const temp = new CardList();

      player.deck.moveTo(temp, 6); 

      // Prompt to attach energy if any were drawn
      return store.prompt(state, new AttachEnergyPrompt(
        player.id,
        GameMessage.ATTACH_ENERGY_CARDS,
        temp, // Only show drawn energies
        PlayerType.BOTTOM_PLAYER,
        [SlotType.BENCH],
        { superType: SuperType.ENERGY, energyType: EnergyType.BASIC },
        { min: 0, max: 1 }
      ), transfers => {

        // Attach energy based on prompt selection
        if (transfers) {
          for (const transfer of transfers) {
            const target = StateUtils.getTarget(state, player, transfer.to);
            temp.moveCardTo(transfer.card, target); // Move card to target

            store.log(state, GameLog.LOG_PLAYER_ATTACHES_CARD, { name: player.name, card: transfer.card.name, pokemon: target.getPokemonCard()!.name });
          }
        }

        temp.moveToTopOfDestination(player.deck);

        player.supporter.moveCardTo(effect.trainerCard, player.discard);
        
        return store.prompt(state, new ShuffleDeckPrompt(player.id), order => {
          player.deck.applyOrder(order);
          return state;
        });
      });
    }
    
    return state;
  }
}
