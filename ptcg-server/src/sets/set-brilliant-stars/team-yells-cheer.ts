import { TrainerCard } from '../../game/store/card/trainer-card';
import { TrainerType } from '../../game/store/card/card-types';
import { StoreLike } from '../../game/store/store-like';
import { State } from '../../game/store/state/state';
import { Effect } from '../../game/store/effects/effect';
import { TrainerEffect } from '../../game/store/effects/play-card-effects';
import { GameError } from '../../game/game-error';
import { GameMessage } from '../../game/game-message';
import { Card} from '../../game/store/card/card';
import { ChooseCardsPrompt } from '../../game/store/prompts/choose-cards-prompt';
import { PokemonCard } from '../../game';

function* playCard(next: Function, store: StoreLike, state: State, self: TeamYellsCheer, effect: TrainerEffect): IterableIterator<State> {
  const player = effect.player;

  const supporterTurn = player.supporterTurn;

  if (supporterTurn > 0) {
    throw new GameError(GameMessage.SUPPORTER_ALREADY_PLAYED);
  }

  player.hand.moveCardTo(effect.trainerCard, player.supporter);
  // We will discard this card after prompt confirmation
  effect.preventDefault = true;

  let pokemonOrSupporterInDiscard: number = 0;
  const blocked: number[] = [];
  player.discard.cards.forEach((c, index) => {
    const isPokemon = c instanceof PokemonCard;
    const isSupporter = c instanceof TrainerCard && c.trainerType === TrainerType.SUPPORTER;
    if (isPokemon || isSupporter) {
      pokemonOrSupporterInDiscard += 1;
    } else {
      blocked.push(index);
    }
    if (c.name === self.name) {
      blocked.push(index);
      return;
    }
  });

  // Player does not have correct cards in discard
  if (pokemonOrSupporterInDiscard === 0) {
    throw new GameError(GameMessage.CANNOT_PLAY_THIS_CARD);
  }

  let cards: Card[] = [];
  yield store.prompt(state, new ChooseCardsPrompt(
    player.id,
    GameMessage.CHOOSE_CARD_TO_DECK,
    player.discard,
    { },
    { min: 1, max: 3, allowCancel: false }
  ), selected => {
    cards = selected || [];
    next();
  });
  player.discard.moveCardsTo(cards, player.deck);
  player.supporter.moveCardTo(effect.trainerCard, player.discard);
  
  return state;
}

export class TeamYellsCheer extends TrainerCard {

  public trainerType: TrainerType = TrainerType.SUPPORTER;

  public regulationMark = 'F';
  
  public set: string = 'BRS';
  
  public cardImage: string = 'assets/cardback.png';
  
  public setNumber: string = '149';
  
  public name: string = 'Team Yell\'s Cheer';
  
  public fullName: string = 'Team Yell\'s Cheer BRS';

  public text: string =
    'Shuffle up to 3 in any combination of Pokémon and Supporter cards, except for Team Yell\'s Cheer, from your discard pile into your deck.';

  public reduceEffect(store: StoreLike, state: State, effect: Effect): State {
    if (effect instanceof TrainerEffect && effect.trainerCard === this) {
      const generator = playCard(() => generator.next(), store, state, this, effect);
      return generator.next().value;
    }
    return state;
  }

}
