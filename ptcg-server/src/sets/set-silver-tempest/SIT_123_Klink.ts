import { PokemonCard } from '../../game/store/card/pokemon-card';
import { Stage, CardType, SuperType } from '../../game/store/card/card-types';
import { StoreLike, State, StateUtils, Card, GameError, GameMessage, ChooseCardsPrompt, GameLog, ShowCardsPrompt, ShuffleDeckPrompt } from '../../game';
import { Effect } from '../../game/store/effects/effect';
import { AttackEffect } from '../../game/store/effects/game-effects';

function* useCallSign(next: Function, store: StoreLike, state: State,
  self: Klink, effect: AttackEffect): IterableIterator<State> {
  const player = effect.player;
  const opponent = StateUtils.getOpponent(state, player);
  let cards: Card[] = [];

  if (player.deck.cards.length === 0) {
    throw new GameError(GameMessage.CANNOT_PLAY_THIS_CARD);
  }

  yield store.prompt(state, new ChooseCardsPrompt(
    player.id,
    GameMessage.CHOOSE_CARD_TO_HAND,
    player.deck,
    { superType: SuperType.POKEMON },
    { min: 0, max: 1, allowCancel: false }
  ), selected => {
    cards = selected || [];
    next();
  });

  cards.forEach( card => {
    store.log(state, GameLog.LOG_PLAYER_PUTS_CARD_IN_HAND, { name: player.name, card: card.name });
  });

  if (cards.length > 0) {
    yield store.prompt(state, new ShowCardsPrompt(
      opponent.id,
      GameMessage.CARDS_SHOWED_BY_THE_OPPONENT,
      cards
    ), () => next());
  }

  player.deck.moveCardsTo(cards, player.hand);

  return store.prompt(state, new ShuffleDeckPrompt(player.id), order => {
    player.deck.applyOrder(order);
  });
}

export class Klink extends PokemonCard {
  public stage: Stage = Stage.BASIC;
  public regulationMark: string = 'F';
  public cardType: CardType = CardType.METAL;
  public hp: number = 50;
  public weakness = [{ type: CardType.FIRE }];
  public resistance = [{ type: CardType.GRASS, value: -30 }];
  public retreat = [CardType.COLORLESS];

  public attacks = [{
    name: 'Call Sign',
    cost: [CardType.METAL],
    damage: 0,
    text: 'Search your deck for a Pokémon, reveal it, and put it into your hand. Then, shuffle your deck. '
  }];

  public set: string = 'SIT';
  public cardImage: string = 'assets/cardback.png';
  public setNumber: string = '123';
  public name: string = 'Klink';
  public fullName: string = 'Klink SIT';

  public reduceEffect(store: StoreLike, state: State, effect: Effect): State {

    if (effect instanceof AttackEffect && effect.attack === this.attacks[0]) {
      const generator = useCallSign(() => generator.next(), store, state, this, effect);
      return generator.next().value;
    }

    return state;
  }
}