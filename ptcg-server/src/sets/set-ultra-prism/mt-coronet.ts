import { Card, ChooseCardsPrompt, EnergyCard, ShowCardsPrompt, ShuffleDeckPrompt } from '../../game';
import { GameError } from '../../game/game-error';
import { GameLog, GameMessage } from '../../game/game-message';
import { EnergyType, SuperType, TrainerType } from '../../game/store/card/card-types';
import { TrainerCard } from '../../game/store/card/trainer-card';
import { Effect } from '../../game/store/effects/effect';
import { UseStadiumEffect } from '../../game/store/effects/game-effects';
import { StateUtils } from '../../game/store/state-utils';
import { State } from '../../game/store/state/state';
import { StoreLike } from '../../game/store/store-like';

function* useStadium(next: Function, store: StoreLike, state: State, effect: UseStadiumEffect): IterableIterator<State> {
  const player = effect.player;
  const opponent = StateUtils.getOpponent(state, player);
  
  let basicEnergyInDiscard: number = 0;
  const blocked: number[] = [];
  player.discard.cards.forEach((c, index) => {
    const isPokemon = c instanceof EnergyCard && c.energyType === EnergyType.BASIC && c.name === 'Metal Energy';
    if (isPokemon) {
      basicEnergyInDiscard += 1;
    } else {
      blocked.push(index);
    }
  });
  
  if (basicEnergyInDiscard === 0) {
    throw new GameError(GameMessage.CANNOT_PLAY_THIS_CARD);
  }

  let cards: Card[] = [];
  return store.prompt(state, new ChooseCardsPrompt(
    player.id,
    GameMessage.CHOOSE_CARD_TO_HAND,
    player.discard,
    { superType: SuperType.ENERGY, energyType: EnergyType.BASIC, name: 'Metal Energy' },
    { min: Math.min(basicEnergyInDiscard, 2), max: 2, allowCancel: false, blocked }
  ), selectedCards => {
    cards = selectedCards || [];

    // Operation canceled by the user
    if (cards.length === 0) {
      return state;
    }

    if (cards.length > 0) {
      store.prompt(state, new ShowCardsPrompt(
        opponent.id,
        GameMessage.CARDS_SHOWED_BY_THE_OPPONENT,
        cards
      ), () => next());
    }
    
    cards.forEach((card, index) => {
      player.discard.moveCardTo(card, player.hand);
    });
    
    cards.forEach((card, index) => {
      store.log(state, GameLog.LOG_PLAYER_PUTS_CARD_IN_HAND, { name: player.name, card: card.name });
    });

    return store.prompt(state, new ShuffleDeckPrompt(player.id), order => {
      player.deck.applyOrder(order);
      return state;
    });
  });
}

export class MtCoronet extends TrainerCard {

  public cardImage: string = 'assets/cardback.png';

  public setNumber: string = '130';
  
  public trainerType = TrainerType.STADIUM;

  public set = 'UPR';

  public name = 'Mt. Coronet';

  public fullName = 'Mt. Coronet RCL';
  
  public  text = 'Once during each player\'s turn, that player may put 2 [M] Energy cards from their discard pile into their hand.';
    
  public reduceEffect(store: StoreLike, state: State, effect: Effect): State {
    if (effect instanceof UseStadiumEffect && StateUtils.getStadiumCard(state) === this) {
      const generator = useStadium(() => generator.next(), store, state, effect);
      return generator.next().value;
    }

    return state;
  }
}
