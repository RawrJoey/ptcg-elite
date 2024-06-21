import { GameError } from '../../game/game-error';
import { GameMessage } from '../../game/game-message';
import { StateUtils } from '../../game/store/state-utils';
import { TrainerCard } from '../../game/store/card/trainer-card';
import { CardType, Stage, SuperType, TrainerType } from '../../game/store/card/card-types';
import { UseStadiumEffect } from '../../game/store/effects/game-effects';
import { Card, ChooseCardsPrompt, PokemonCardList, ShuffleDeckPrompt } from '../../game';
import { StoreLike } from '../../game/store/store-like';
import { State } from '../../game/store/state/state';
import { Effect } from '../../game/store/effects/effect';

function* useStadium(next: Function, store: StoreLike, state: State, effect: UseStadiumEffect): IterableIterator<State> {
  const player = effect.player;
  
  const slots: PokemonCardList[] = player.bench.filter(b => b.cards.length === 0);

  if (player.deck.cards.length === 0) {
    throw new GameError(GameMessage.CANNOT_PLAY_THIS_CARD);
  }
  if (slots.length === 0) {
    throw new GameError(GameMessage.CANNOT_PLAY_THIS_CARD);
  } else {
    // handle no open slots

    let cards: Card[] = [];
    return store.prompt(state, new ChooseCardsPrompt(
      player.id,
      GameMessage.CHOOSE_CARD_TO_PUT_ONTO_BENCH,
      player.deck,
      { superType: SuperType.POKEMON, stage: Stage.BASIC, cardType: CardType.LIGHTNING || CardType.DRAGON },
      { min: 0, max: 1, allowCancel: false }
    ), selectedCards => {
      cards = selectedCards || [];

      // Operation canceled by the user
      if (cards.length === 0) {
        return state;
      }

      cards.forEach((card, index) => {
        player.deck.moveCardTo(card, slots[index]);
        slots[index].pokemonPlayedTurn = state.turn;
      });

      return store.prompt(state, new ShuffleDeckPrompt(player.id), order => {
        player.deck.applyOrder(order);
        return state;
      });
    });
  }
}

export class StormyMountains extends TrainerCard {

  public regulationMark = 'E';

  public cardImage: string = 'assets/cardback.png';

  public setNumber: string = '161';
  
  public  trainerType = TrainerType.STADIUM;

  public set = 'EVS';

  public name = 'Stormy Mountains';

  public fullName = 'Stormy Mountains EVS';
  
  public  text = 'Once during each player\'s turn, that player may search their deck for a Basic [L] Pokémon or Basic [N] Pokémon and put it onto their Bench. Then, that player shuffles their deck.';
    
  public reduceEffect(store: StoreLike, state: State, effect: Effect): State {
    if (effect instanceof UseStadiumEffect && StateUtils.getStadiumCard(state) === this) {
      const generator = useStadium(() => generator.next(), store, state, effect);
      return generator.next().value;
    }

    return state;
  }

}
