import { PokemonCard } from '../../game/store/card/pokemon-card';
import { Stage, CardType, TrainerType } from '../../game/store/card/card-types';
import { StoreLike, State, StateUtils, Card, TrainerCard, ChooseCardsPrompt, GameMessage, GameLog, ShowCardsPrompt, ShuffleDeckPrompt } from '../../game';
import { Effect } from '../../game/store/effects/effect';
import { AttackEffect } from '../../game/store/effects/game-effects';

function* useMixedCall(next: Function, store: StoreLike, state: State,
  self: Oricorio, effect: AttackEffect): IterableIterator<State> {
  const player = effect.player;
  const opponent = StateUtils.getOpponent(state, player);
  let cards: Card[] = [];

  // Count pokemon and supporters separately
  let pokemon = 0;
  let supporters = 0;
  const blocked: number[] = [];
  player.deck.cards.forEach((c, index) => {
    if (c instanceof PokemonCard) {
      pokemon++;
    } else if (c instanceof TrainerCard && c.trainerType === TrainerType.SUPPORTER) {
      supporters++;
    } else {
      blocked.push(index);
    }
  });

  const maxPokemons = Math.min(pokemon, 1);
  const maxSupporters = Math.min(supporters, 1);

  const count = maxPokemons + maxSupporters;

  // Pass max counts to prompt options
  yield store.prompt(state, new ChooseCardsPrompt(
    player,
    GameMessage.CHOOSE_ONE_POKEMON_AND_ONE_SUPPORTER_TO_HAND,
    player.deck,
    {},
    { min: 0, max: count, allowCancel: false, blocked, maxPokemons, maxSupporters }
  ), selected => {
    cards = selected || [];
    next();
  });

  player.deck.moveCardsTo(cards, player.hand);

  cards.forEach((card, index) => {
    store.log(state, GameLog.LOG_PLAYER_PUTS_CARD_IN_HAND, { name: player.name, card: card.name });
  });

  if (cards.length > 0) {
    return store.prompt(state, new ShowCardsPrompt(
      opponent.id,
      GameMessage.CARDS_SHOWED_BY_THE_OPPONENT,
      cards
    ), () => next());
  }

  return store.prompt(state, new ShuffleDeckPrompt(player.id), order => {
    player.deck.applyOrder(order);
  });
}


export class Oricorio extends PokemonCard {
  public stage: Stage = Stage.BASIC;
  public cardType: CardType = CardType.PSYCHIC;
  public hp: number = 90;
  public weakness = [{ type: CardType.DARK }];
  public resistance = [{ type: CardType.FIGHTING, value: -30 }];
  public retreat = [CardType.COLORLESS];

  public attacks = [{
    name: 'Mixed Call',
    cost: [CardType.COLORLESS],
    damage: 0,
    text: 'Search your deck for a Pokémon and a Supporter card, reveal them, and put them into your hand. Then, shuffle your deck.'
  },
  {
    name: 'Razor Wing',
    cost: [CardType.PSYCHIC, CardType.COLORLESS, CardType.COLORLESS],
    damage: 80,
    text: ''
  }];

  public regulationMark = 'E';
  public set: string = 'SWSH';
  public cardImage: string = 'assets/cardback.png';
  public name: string = 'Oricorio';
  public fullName: string = 'Oricorio SWSH';
  public setNumber: string = '210';

  public reduceEffect(store: StoreLike, state: State, effect: Effect): State {

    if (effect instanceof AttackEffect && effect.attack === this.attacks[0]) {
      const generator = useMixedCall(() => generator.next(), store, state, this, effect);
      return generator.next().value;
    }

    return state;
  }
}
