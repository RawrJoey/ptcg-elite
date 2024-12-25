import { CardTarget, ChoosePokemonPrompt, GameError, GameMessage, GameStoreMessage, PlayerType, SlotType, TrainerCard } from '../../game';
import { SuperType, TrainerType } from '../../game/store/card/card-types';
import { Effect } from '../../game/store/effects/effect';
import { TrainerEffect } from '../../game/store/effects/play-card-effects';
import { State } from '../../game/store/state/state';
import { StoreLike } from '../../game/store/store-like';

export class DevolutionSpray extends TrainerCard {
  public name = 'Devolution Spray';
  public cardImage: string = 'assets/cardback.png';
  public setNumber = '113';
  public set = 'DRX';
  public fullName = 'Devolution Spray DRX';
  public superType = SuperType.TRAINER;
  public trainerType = TrainerType.ITEM;

  public text = 'Devolve 1 of your evolved Pokémon and put the highest Stage Evolution card on it into your hand. (That Pokémon can\'t evolve this turn.)';

  public reduceEffect(store: StoreLike, state: State, effect: Effect): State {
    if (effect instanceof TrainerEffect && effect.trainerCard === this) {
      let canDevolve = false;
      const player = effect.player;

      const blocked: CardTarget[] = [];
      effect.player.forEachPokemon(PlayerType.BOTTOM_PLAYER, (list, card, target) => {
        if (list.getPokemons().length > 1) {
          canDevolve = true;
        } else {
          blocked.push(target);
        }
      });

      if (!canDevolve) {
        throw new GameError(GameStoreMessage.CANNOT_PLAY_THIS_CARD);
      }

      return store.prompt(
        state,
        new ChoosePokemonPrompt(
          effect.player.id,
          GameMessage.CHOOSE_POKEMON,
          PlayerType.BOTTOM_PLAYER,
          [SlotType.ACTIVE, SlotType.BENCH],
          { allowCancel: false, min: 1, max: 1, blocked }
        ),
        (results) => {
          if (results && results.length > 0) {
            const targetPokemon = results[0];

            targetPokemon.moveCardsTo([targetPokemon.cards[targetPokemon.cards.length - 1]], effect.player.hand);
            targetPokemon.clearEffects();
            targetPokemon.pokemonPlayedTurn = state.turn;
            player.supporter.moveCardTo(effect.trainerCard, player.discard);
          }

          return state;
        }
      );
    }

    return state;
  }
}
