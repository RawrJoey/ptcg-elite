import { GameError } from '../../game';
import { GameMessage } from '../../game/game-message';
import { SuperType, TrainerType } from '../../game/store/card/card-types';
import { TrainerCard } from '../../game/store/card/trainer-card';
import { Effect } from '../../game/store/effects/effect';
import { TrainerEffect } from '../../game/store/effects/play-card-effects';
import { ChooseCardsPrompt } from '../../game/store/prompts/choose-cards-prompt';
import { CoinFlipPrompt } from '../../game/store/prompts/coin-flip-prompt';
import { ShuffleDeckPrompt } from '../../game/store/prompts/shuffle-prompt';
import { State } from '../../game/store/state/state';
import { StoreLike } from '../../game/store/store-like';

function* playCard(next: Function, store: StoreLike, state: State, effect: TrainerEffect): IterableIterator<State> {
  const player = effect.player;

  if (player.deck.cards.length === 0) {
    throw new GameError(GameMessage.CANNOT_PLAY_THIS_CARD);
  }

  // We will discard this card after prompt confirmation
  effect.preventDefault = true;
  player.hand.moveCardTo(effect.trainerCard, player.supporter);

  let coin1Result = false;
  yield store.prompt(state, new CoinFlipPrompt(player.id, GameMessage.COIN_FLIP), (result: boolean) => {
    coin1Result = result;
    next();
  });
  
  if (coin1Result) {
    let cards: any[] = [];
    yield store.prompt(state, new ChooseCardsPrompt(
      player.id,
      GameMessage.CHOOSE_CARD_TO_HAND,
      player.deck,
      { superType: SuperType.TRAINER, trainerType: TrainerType.SUPPORTER},
      { min: 0, max: 1, allowCancel: false }), (selected: any[]) => {
      cards = selected || [];
      next();
    });
    
    player.deck.moveCardsTo(cards, player.hand);
  }
  
  player.supporter.moveCardTo(effect.trainerCard, player.discard);
  
  return store.prompt(state, new ShuffleDeckPrompt(player.id), (order: any[]) => {
    player.deck.applyOrder(order);
  });
}


export class Xtransceiver extends TrainerCard {

  public trainerType = TrainerType.ITEM;

  public set: string = 'NVI';

  public cardImage: string = 'assets/cardback.png';

  public setNumber: string = '96';

  public regulationMark = 'E';

  public name: string = 'Xtransceiver';

  public fullName: string = 'Xtransceiver NVI';

  public text: string = 'Flip a coin. If heads, search your deck for a Supporter card, reveal it, and put it into your hand. Shuffle your deck afterward.';

  public reduceEffect(store: StoreLike, state: State, effect: Effect): State {
    if (effect instanceof TrainerEffect && effect.trainerCard === this) {
      const generator = playCard(() => generator.next(), store, state, effect);
      return generator.next().value;
    }
                                                    
    return state;
  }
}                         