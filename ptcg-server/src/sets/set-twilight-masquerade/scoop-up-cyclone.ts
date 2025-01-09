import { GameMessage } from '../../game/game-message';
import { TrainerCard } from '../../game/store/card/trainer-card';
import { TrainerType, CardTag, BoardEffect } from '../../game/store/card/card-types';
import { StoreLike } from '../../game/store/store-like';
import { State } from '../../game/store/state/state';
import { Effect } from '../../game/store/effects/effect';
import { ChoosePokemonPrompt } from '../../game/store/prompts/choose-pokemon-prompt';
import { TrainerEffect } from '../../game/store/effects/play-card-effects';
import { PlayerType, SlotType } from '../../game';


export class ScoopUpCyclone extends TrainerCard {

  public trainerType: TrainerType = TrainerType.ITEM;

  public tags = [CardTag.ACE_SPEC];

  public regulationMark = 'H';

  public set: string = 'TWM';

  public name: string = 'Scoop Up Cyclone';

  public fullName: string = 'Scoop Up Cyclone TWM';

  public cardImage: string = 'assets/cardback.png';

  public setNumber: string = '162';

  public text: string =
    'Put 1 of your Pokemon and all cards attached to it into your hand.';

  public reduceEffect(store: StoreLike, state: State, effect: Effect): State {
    if (effect instanceof TrainerEffect && effect.trainerCard === this) {
      const player = effect.player;

      // We will discard this card after prompt confirmation
      effect.preventDefault = true;

      return store.prompt(state, new ChoosePokemonPrompt(
        player.id,
        GameMessage.CHOOSE_POKEMON_TO_PICK_UP,
        PlayerType.BOTTOM_PLAYER,
        [SlotType.ACTIVE, SlotType.BENCH],
        { allowCancel: false }
      ), result => {
        const cardList = result.length > 0 ? result[0] : null;
        if (cardList !== null) {
          const pokemons = cardList.getPokemons();
          cardList.clearEffects();
          cardList.damage = 0;
          cardList.moveCardsTo(pokemons, player.hand);
          cardList.moveTo(player.hand);
          cardList.removeBoardEffect(BoardEffect.ABILITY_USED);
          player.supporter.moveCardTo(effect.trainerCard, player.discard);
        }
      });
    }
    return state;
  }

}

