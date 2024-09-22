import { TrainerCard } from '../../game/store/card/trainer-card';
import { SuperType, TrainerType } from '../../game/store/card/card-types';
import { StoreLike, State, ChooseCardsPrompt, GameMessage, GameError, Card, ShuffleDeckPrompt } from '../../game';
import { Effect } from '../../game/store/effects/effect';
import { TrainerEffect } from '../../game/store/effects/play-card-effects';


export class HelperBell extends TrainerCard {

  public trainerType: TrainerType = TrainerType.ITEM;

  public set: string = 'SV7a';

  public cardImage: string = 'assets/cardback.png';

  public setNumber: string = '59';

  public regulationMark = 'H';

  public name: string = 'Helper Bell';

  public fullName: string = 'Helper Bell SV7a';

  public text: string =
    'You can use this card only if you go second, and only on your first turn.' +
    '' +
    'Search your deck for a Supporter card, reveal it, and put it into your hand. Then, shuffle your deck.';

  public reduceEffect(store: StoreLike, state: State, effect: Effect): State {
    if (effect instanceof TrainerEffect && effect.trainerCard === this) {
      // Get current turn
      const turn = state.turn;

      // Check if it is player's first turn
      if (turn !== 2) {
        throw new GameError(GameMessage.CANNOT_PLAY_THIS_CARD);
      } else {
        const player = effect.player;
        effect.preventDefault = true;
        player.hand.moveCardTo(effect.trainerCard, player.supporter);

        if (player.deck.cards.length === 0) {
          throw new GameError(GameMessage.CANNOT_PLAY_THIS_CARD);
        }

        // We will discard this card after prompt confirmation
        effect.preventDefault = true;

        let cards: Card[] = [];
        return store.prompt(state, new ChooseCardsPrompt(
          player.id,
          GameMessage.CHOOSE_CARD_TO_HAND,
          player.deck,
          { superType: SuperType.TRAINER, trainerType: TrainerType.SUPPORTER },
          { min: 0, max: 1, allowCancel: false }
        ), selectedCards => {
          cards = selectedCards || [];

          cards.forEach((card, index) => {
            player.deck.moveCardTo(card, player.hand);
          });

          player.supporter.moveCardTo(this, player.discard);

          return store.prompt(state, new ShuffleDeckPrompt(player.id), order => {
            player.deck.applyOrder(order);

            return state;
          });
        });
      }
    }
    return state;
  }
}