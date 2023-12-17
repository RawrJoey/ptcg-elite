import { AttachEnergyPrompt, CardList, EnergyCard, EnergyType, GameMessage, PlayerType, SlotType, State, StateUtils, StoreLike, SuperType, TrainerCard, TrainerType } from '../../game';
import { Effect } from '../../game/store/effects/effect';
import { TrainerEffect } from '../../game/store/effects/play-card-effects';

export class GutsyPickaxe extends TrainerCard {

  public trainerType: TrainerType = TrainerType.ITEM;

  public regulationMark = 'F';

  public set: string = 'ASR';

  public set2: string = 'astralradiance';

  public setNumber: string = '145';

  public name: string = 'Gutsy Pickaxe';

  public fullName: string = 'Gutsy Pickaxe ASR';

  public text: string =
    'Reveal the top card of your deck. If that card is a [F] Energy card, attach it to 1 of your Benched Pokémon. If it is not a [F] Energy card, put it into your hand.';

  public reduceEffect(store: StoreLike, state: State, effect: Effect): State {
    if (effect instanceof TrainerEffect && effect.trainerCard === this) {
      const player = effect.player;
      const temp = new CardList();

      player.deck.moveTo(temp, 1);

      // Check if any cards drawn are basic energy
      const energyCardsDrawn = temp.cards.filter(card => {
        return card instanceof EnergyCard && card.energyType === EnergyType.BASIC && card.name === 'Basic Fighting Energy';
      });


      // If no energy cards were drawn, move all cards to hand
      if (energyCardsDrawn.length == 0) {
        temp.cards.slice(0, 1).forEach(card => {
          temp.moveCardTo(card, player.hand); 
        });
      } else {
      

        // Prompt to attach energy if any were drawn
        return store.prompt(state, new AttachEnergyPrompt(
          player.id,
          GameMessage.ATTACH_ENERGY_CARDS, 
          temp, // Only show drawn energies
          PlayerType.BOTTOM_PLAYER,
          [SlotType.BENCH, SlotType.ACTIVE],
          {superType: SuperType.ENERGY, energyType: EnergyType.BASIC},
          {min: 0, max: energyCardsDrawn.length}
        ), transfers => {
    
          // Attach energy based on prompt selection
          if (transfers) {
            for (const transfer of transfers) {
              const target = StateUtils.getTarget(state, player, transfer.to);
              temp.moveCardTo(transfer.card, target); // Move card to target
            }
            temp.cards.forEach(card => {
              temp.moveCardTo(card, player.hand); // Move card to hand
            
            });
            return state;
          }
          return state;
        });
      }
      return state;
    }
    return state;
  }
}