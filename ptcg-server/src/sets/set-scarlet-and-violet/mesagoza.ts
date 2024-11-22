import { ChooseCardsPrompt, CoinFlipPrompt, ShowCardsPrompt, ShuffleDeckPrompt } from '../../game';
import { GameMessage } from '../../game/game-message';
import { SuperType, TrainerType } from '../../game/store/card/card-types';
import { TrainerCard } from '../../game/store/card/trainer-card';
import { Effect } from '../../game/store/effects/effect';
import { UseStadiumEffect } from '../../game/store/effects/game-effects';
import { StateUtils } from '../../game/store/state-utils';
import { State } from '../../game/store/state/state';
import { StoreLike } from '../../game/store/store-like';

export class Mesagoza extends TrainerCard {

  public trainerType = TrainerType.STADIUM;

  public regulationMark = 'G';

  public set = 'SVI';

  public cardImage: string = 'assets/cardback.png';

  public setNumber: string = '178';

  public name = 'Mesagoza';

  public fullName = 'Mesagoza SVI';

  public text = 'Once during each player\'s turn, that player may flip a coin. If heads, that player searches their deck for a Pokémon, reveals it, and puts it into their hand. Then, that player shuffles their deck.';

  reduceEffect(store: StoreLike, state: State, effect: Effect): State {
    if (effect instanceof UseStadiumEffect && StateUtils.getStadiumCard(state) === this) {
      return this.useStadium(store, state, effect);
    }
    return state;
  }

  useStadium(store: StoreLike, state: State, effect: UseStadiumEffect): State {
    const player = effect.player;
    const opponent = StateUtils.getOpponent(state, player);

    return store.prompt(state, new CoinFlipPrompt(player.id, GameMessage.COIN_FLIP), flipResult => {
      if (flipResult) {
        return store.prompt(state, new ChooseCardsPrompt(
          player,
          GameMessage.CHOOSE_CARD_TO_HAND,
          player.deck,
          { superType: SuperType.POKEMON },
          { min: 0, max: 1, allowCancel: false }
        ), selected => {
          const cards = selected || [];

          player.deck.moveCardsTo(cards, player.hand);

          if (cards.length > 0) {
            return store.prompt(state, new ShowCardsPrompt(
              opponent.id,
              GameMessage.CARDS_SHOWED_BY_THE_OPPONENT,
              cards
            ), () => {
            });
          }
          return store.prompt(state, new ShuffleDeckPrompt(player.id), order => {
            player.deck.applyOrder(order);
          });
        });

      }
      return state;
    });

  }
}