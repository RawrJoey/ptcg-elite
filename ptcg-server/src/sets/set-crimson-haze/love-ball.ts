import { TrainerCard } from '../../game/store/card/trainer-card';
import { SuperType, TrainerType } from '../../game/store/card/card-types';
import { TrainerEffect } from '../../game/store/effects/play-card-effects';
import { ChooseCardsPrompt } from '../../game/store/prompts/choose-cards-prompt';
import { ShowCardsPrompt } from '../../game/store/prompts/show-cards-prompt';
import { ShuffleDeckPrompt } from '../../game/store/prompts/shuffle-prompt';
import { GameMessage } from '../../game/game-message';
import { StoreLike, State, StateUtils, PokemonCard, Card, GameError } from '../../game';
import { Effect } from '../../game/store/effects/effect';

function* playCard(next: Function, store: StoreLike, state: State, effect: TrainerEffect): IterableIterator<State> {
  const player = effect.player;
  const opponent = StateUtils.getOpponent(state, player);
  let cards: Card[] = [];

  if (player.deck.cards.length === 0) {
    throw new GameError(GameMessage.CANNOT_PLAY_THIS_CARD);
  }

  const opponentBenchName = opponent.bench.filter(card => card instanceof PokemonCard).map(card => (card as unknown as PokemonCard).name);
  const opponentActiveName = opponent.active.cards[0].name;

  const loveBallFilter = opponentActiveName || opponentBenchName[0];


  yield store.prompt(state, new ChooseCardsPrompt(
    player.id,
    GameMessage.CHOOSE_CARD_TO_HAND,
    player.deck,
    { superType: SuperType.POKEMON, name: loveBallFilter },
    { min: 1, max: 1, allowCancel: true }
  ), selected => {
    cards = selected || [];
    next();
  });

  player.deck.moveCardsTo(cards, player.hand);

  if (cards.length > 0) {
    yield store.prompt(state, new ShowCardsPrompt(
      opponent.id,
      GameMessage.CARDS_SHOWED_BY_THE_OPPONENT,
      cards
    ), () => next());
  }

  return store.prompt(state, new ShuffleDeckPrompt(player.id), order => {
    player.deck.applyOrder(order);
  });
}


export class LoveBall extends TrainerCard {
  
  public trainerType: TrainerType = TrainerType.ITEM;

  public regulationMark = 'H';

  public set: string = 'SV5';

  public cardImage: string = 'assets/cardback.png';

  public setNumber: string = '141';

  public name: string = 'Love Ball';

  public fullName: string = 'Love Ball SV5';
  
  public text = 
    'Search your deck for a Pokémon with the same name as one of your opponent\'s Pokémon in play, reveal it, and put it into your hand. Then shuffle your deck.';
  
  public reduceEffect(store: StoreLike, state: State, effect: Effect): State {

    if (effect instanceof TrainerEffect && effect.trainerCard === this) {
      const generator = playCard(() => generator.next(), store, state, effect);
      return generator.next().value;
    }
    
    return state;
  }
    
}
    