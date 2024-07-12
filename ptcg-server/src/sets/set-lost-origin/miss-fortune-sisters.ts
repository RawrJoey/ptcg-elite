import { Effect } from '../../game/store/effects/effect';
import { GameMessage } from '../../game/game-message';
import { TrainerEffect } from '../../game/store/effects/play-card-effects';
import { State } from '../../game/store/state/state';
import { StoreLike } from '../../game/store/store-like';
import { TrainerCard } from '../../game/store/card/trainer-card';
import { SuperType, TrainerType } from '../../game/store/card/card-types';
import { CardList, ChooseCardsPrompt, GameError, ShuffleDeckPrompt, StateUtils } from '../../game';

export class MissFortuneSisters extends TrainerCard {

  public trainerType: TrainerType = TrainerType.SUPPORTER;

  public set: string = 'LOR';

  public regulationMark = 'F';

  public cardImage: string = 'assets/cardback.png';

  public setNumber: string = '164';

  public name: string = 'Miss Fortune Sisters';

  public fullName: string = 'Miss Fortune Sisters LOR';

  public text: string =
    'Look at the top 5 cards of your opponent\'s deck and discard any number of Item cards you find there. Your opponent shuffles the other cards back into their deck.';

  public reduceEffect(store: StoreLike, state: State, effect: Effect): State {
    if (effect instanceof TrainerEffect && effect.trainerCard === this) {
      const player = effect.player;
      const opponent = StateUtils.getOpponent(state, player);

      const supporterTurn = player.supporterTurn;

      if (supporterTurn > 0) {
        throw new GameError(GameMessage.SUPPORTER_ALREADY_PLAYED);
      }

      player.hand.moveCardTo(effect.trainerCard, player.supporter);
      // We will discard this card after prompt confirmation
      effect.preventDefault = true;

      const deckTop = new CardList();
      opponent.deck.moveTo(deckTop, 5);

      return store.prompt(state, new ChooseCardsPrompt(
        player.id,
        GameMessage.CHOOSE_CARD_TO_DISCARD,
        deckTop,
        { superType: SuperType.TRAINER, trainerType: TrainerType.ITEM },
        { min: 0, max: 5, allowCancel: false }
      ), selected => {
        deckTop.moveCardsTo(selected, opponent.discard);
        deckTop.moveTo(opponent.deck);
        player.supporter.moveCardTo(effect.trainerCard, player.discard);

        store.prompt(state, new ShuffleDeckPrompt(opponent.id), order => {
          opponent.deck.applyOrder(order);
        });

        return state;

      });

    }


    return state;
  }

}
