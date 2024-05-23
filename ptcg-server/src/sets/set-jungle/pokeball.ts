import { TrainerCard } from '../../game/store/card/trainer-card';
import { SuperType, TrainerType } from '../../game/store/card/card-types';
import { TrainerEffect } from '../../game/store/effects/play-card-effects';
import { GameMessage } from '../../game/game-message';
import { ChooseCardsPrompt } from '../../game/store/prompts/choose-cards-prompt';
import { ShuffleDeckPrompt } from '../../game/store/prompts/shuffle-prompt';
import { CoinFlipPrompt } from '../../game/store/prompts/coin-flip-prompt';
import { State } from '../../game/store/state/state';
import { StoreLike } from '../../game/store/store-like';
import { Effect } from '../../game/store/effects/effect';

function* playCard(next: Function, store: StoreLike, state: State, effect: TrainerEffect): IterableIterator<State> {
  const player = effect.player;
  let coinResult = false;

  // We will discard this card after prompt confirmation
  effect.preventDefault = true;

  yield store.prompt(state, new CoinFlipPrompt(player.id, GameMessage.COIN_FLIP), (result: boolean) => {
    coinResult = result;
    next();
  });

  if (coinResult) { 
    let cards: any[] = [];
    yield store.prompt(state, new ChooseCardsPrompt(
      player.id, 
      GameMessage.CHOOSE_CARD_TO_HAND, 
      player.deck, 
      { superType: SuperType.POKEMON }, 
      { min: 0, max: 1, allowCancel: false }), 
    (selected: any[]) => {
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

export class PokeBall extends TrainerCard {

  public trainerType = TrainerType.ITEM;

  public regulationMark = 'G';

  public set = 'JU';

  public cardImage: string = 'assets/cardback.png';

  public setNumber: string = '64';

  public name = 'Poké Ball';

  public fullName: string = 'Poké Ball JU';

  public text: string = 'Flip a coin. If heads, you may search your deck for any Basic Pokémon or Evolution card. Show that card to your opponent, then put it into your hand. Shuffle your deck afterward.';

  public reduceEffect(store: StoreLike, state: State, effect: Effect): State {

    if (effect instanceof TrainerEffect && effect.trainerCard === this) {
      const generator = playCard(() => generator.next(), store, state, effect);
      return generator.next().value;
    }                
    return state;
  }
}                         