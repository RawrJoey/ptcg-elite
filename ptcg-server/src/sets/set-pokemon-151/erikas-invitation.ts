import { Card } from '../../game/store/card/card';
import { GameError } from '../../game/game-error';
import { GameMessage } from '../../game/game-message';
import { Effect } from '../../game/store/effects/effect';
import { PokemonCardList, StateUtils } from '../../game';
import { TrainerCard } from '../../game/store/card/trainer-card';
import { Stage, TrainerType, SuperType } from '../../game/store/card/card-types';
import { StoreLike } from '../../game/store/store-like';
import { State } from '../../game/store/state/state';
import { TrainerEffect } from '../../game/store/effects/play-card-effects';
import { ChooseCardsPrompt } from '../../game/store/prompts/choose-cards-prompt';

function* playCard(next: Function, store: StoreLike, state: State, effect: TrainerEffect): IterableIterator<State> {
  const player = effect.player;
  const opponent = StateUtils.getOpponent(state, player);
  const slots: PokemonCardList[] = opponent.bench.filter(b => b.cards.length === 0);

  const supporterTurn = player.supporterTurn;

  if (supporterTurn > 0) {
    throw new GameError(GameMessage.SUPPORTER_ALREADY_PLAYED);
  }
  
  player.hand.moveCardTo(effect.trainerCard, player.supporter);
  // We will discard this card after prompt confirmation
  effect.preventDefault = true;

  if (opponent.hand.cards.length === 0) {
    throw new GameError(GameMessage.CANNOT_PLAY_THIS_CARD);
  }
  // Check if bench has open slots
  const openSlots = opponent.bench.filter(b => b.cards.length === 0);
      
  if (openSlots.length === 0) {
    // No open slots, throw error
    throw new GameError(GameMessage.CANNOT_PLAY_THIS_CARD);
  }


  let cards: Card[] = [];
  yield store.prompt(state, new ChooseCardsPrompt(
    player.id,
    GameMessage.CHOOSE_CARD_TO_HAND,
    opponent.hand,
    { superType: SuperType.POKEMON, stage: Stage.BASIC },
    { min: 0, max: 1, allowCancel: true }
  ), selected => {
    cards = selected || [];
    next();
  });

  // Operation canceled by the user
  if (cards.length === 0) {
    return state;
  }

  player.supporter.moveCardTo(effect.trainerCard, player.discard);
  player.supporterTurn = 1;
  
  cards.forEach((card, index) => {
    opponent.hand.moveCardTo(card, slots[index]);
    slots[index].pokemonPlayedTurn = state.turn;
    opponent.switchPokemon(slots[index]); 
  });
  

}
export class EreikasInvitation extends TrainerCard {

  public regulationMark = 'G';

  public trainerType: TrainerType = TrainerType.SUPPORTER;

  public set: string = '151';

  public cardImage: string = 'assets/cardback.png';

  public setNumber: string = '160';

  public name: string = 'Erika\'s Invitation';

  public fullName: string = 'Erika\'s Invitation MEW';

  public text: string =
    'Your opponent reveals their hand, and you put a Basic Pokémon you find there onto your opponent\'s Bench. If you put a Pokémon onto their Bench in this way, switch in that Pokémon to the Active Spot.';

  public reduceEffect(store: StoreLike, state: State, effect: Effect): State {

    if (effect instanceof TrainerEffect && effect.trainerCard === this) {
      const generator = playCard(() => generator.next(), store, state, effect);
      return generator.next().value;
    }

    return state;
  }

}
