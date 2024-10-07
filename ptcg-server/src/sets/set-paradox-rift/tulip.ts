import { EnergyCard, GameError, PokemonCard } from '../../game';
import { GameMessage } from '../../game/game-message';
import { Card } from '../../game/store/card/card';
import { CardType, EnergyType, TrainerType } from '../../game/store/card/card-types';
import { TrainerCard } from '../../game/store/card/trainer-card';
import { Effect } from '../../game/store/effects/effect';
import { TrainerEffect } from '../../game/store/effects/play-card-effects';
import { ChooseCardsPrompt } from '../../game/store/prompts/choose-cards-prompt';
import { ShowCardsPrompt } from '../../game/store/prompts/show-cards-prompt';
import { StateUtils } from '../../game/store/state-utils';
import { State } from '../../game/store/state/state';
import { StoreLike } from '../../game/store/store-like';

function* playCard(next: Function, store: StoreLike, state: State,
  self: Tulip, effect: TrainerEffect): IterableIterator<State> {
  const player = effect.player;
  const opponent = StateUtils.getOpponent(state, player);
  let cards: Card[] = [];

  const supporterTurn = player.supporterTurn;

  if (supporterTurn > 0) {
    throw new GameError(GameMessage.SUPPORTER_ALREADY_PLAYED);
  }

  player.hand.moveCardTo(effect.trainerCard, player.supporter);
  // We will discard this card after prompt confirmation
  effect.preventDefault = true;

  let pokemons = 0;
  let energies = 0;
  const blocked: number[] = [];
  player.discard.cards.forEach((c, index) => {
    if (c instanceof EnergyCard && c.energyType === EnergyType.BASIC && c.name === 'Psychic Energy') {
      energies += 1;
    } else if (c instanceof PokemonCard && c.cardType === CardType.PSYCHIC) {
      pokemons += 1;
    } else {
      blocked.push(index);
    }
  });

  const maxPokemons = Math.min(pokemons, 4);
  const maxEnergies = Math.min(energies, 4);
  const count = 4;

  yield store.prompt(state, new ChooseCardsPrompt(
    player.id,
    GameMessage.CHOOSE_CARD_TO_HAND,
    player.discard,
    {},
    { min: 0, max: count, allowCancel: false, blocked, maxPokemons, maxEnergies }
  ), selected => {
    cards = selected || [];
    next();
  });

  player.discard.moveCardsTo(cards, player.hand);
  player.supporter.moveCardTo(effect.trainerCard, player.discard);


  if (cards.length > 0) {
    yield store.prompt(state, new ShowCardsPrompt(
      opponent.id,
      GameMessage.CARDS_SHOWED_BY_THE_OPPONENT,
      cards
    ), () => next());
  }
}

export class Tulip extends TrainerCard {

  public trainerType: TrainerType = TrainerType.SUPPORTER;

  public set: string = 'PAR';

  public cardImage: string = 'assets/cardback.png';

  public setNumber: string = '181';

  public regulationMark = 'G';

  public name: string = 'Tulip';

  public fullName: string = 'Tulip PAR';

  public text: string =
    'Put up to 4 in any combination of [P] Pokémon and Basic [P] Energy cards from your discard pile into your hand.';


  public reduceEffect(store: StoreLike, state: State, effect: Effect): State {

    if (effect instanceof TrainerEffect && effect.trainerCard === this) {
      const generator = playCard(() => generator.next(), store, state, this, effect);
      return generator.next().value;
    }

    return state;
  }

}