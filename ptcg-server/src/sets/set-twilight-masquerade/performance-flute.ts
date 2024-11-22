import { GameError } from '../../game/game-error';
import { GameMessage } from '../../game/game-message';
import { Effect } from '../../game/store/effects/effect';
import { CardList, PokemonCardList, ShowCardsPrompt, ShuffleDeckPrompt, StateUtils } from '../../game';
import { TrainerCard } from '../../game/store/card/trainer-card';
import { TrainerType, SuperType, Stage } from '../../game/store/card/card-types';
import { StoreLike } from '../../game/store/store-like';
import { State } from '../../game/store/state/state';
import { TrainerEffect } from '../../game/store/effects/play-card-effects';
import { ChooseCardsPrompt } from '../../game/store/prompts/choose-cards-prompt';

export class PerformanceFlute extends TrainerCard {

  public regulationMark = 'H';

  public trainerType: TrainerType = TrainerType.ITEM;

  public set: string = 'TWM';

  public cardImage: string = 'assets/cardback.png';

  public setNumber: string = '142';

  public name: string = 'Accompanying Flute';

  public fullName: string = 'Accompanying Flute TWM';

  public text: string =
    'Reveal the top 5 cards of your opponent\'s deck, and put any number of Basic Pokémon you find there onto your opponent\'s Bench. Then, they shuffle the remaining cards back into their deck.';


  public reduceEffect(store: StoreLike, state: State, effect: Effect): State {

    if (effect instanceof TrainerEffect && effect.trainerCard === this) {
      const player = effect.player;
      const opponent = StateUtils.getOpponent(state, player);
      const slots: PokemonCardList[] = opponent.bench.filter(b => b.cards.length === 0);
      
      // Check if bench has open slots
      const openSlots = opponent.bench.filter(b => b.cards.length === 0);
            
      if (openSlots.length === 0) {
        // No open slots, throw error
        throw new GameError(GameMessage.CANNOT_PLAY_THIS_CARD);
      }
      
      // We will discard this card after prompt confirmation
      effect.preventDefault = true;
      
      if (opponent.deck.cards.length === 0) {
        throw new GameError(GameMessage.CANNOT_USE_POWER);
      }
    
      const deckTop = new CardList();
      opponent.deck.moveTo(deckTop, 5);
      
      return store.prompt(state, new ChooseCardsPrompt(
        player,
        GameMessage.CHOOSE_CARD_TO_HAND,
        deckTop,
        { superType: SuperType.POKEMON, stage: Stage.BASIC },
        { min: 0, max: openSlots.length, allowCancel: false }
      ), selected => {
        const cards = selected || [];
      
        // Operation canceled by the user
        if (cards.length === 0) {

          return store.prompt(state, new ShowCardsPrompt(
            opponent.id,
            GameMessage.CARDS_SHOWED_BY_THE_OPPONENT,
            deckTop.cards
          ), () => {

            deckTop.moveTo(opponent.deck);
            player.supporter.moveCardTo(effect.trainerCard, player.discard);
            return store.prompt(state, new ShuffleDeckPrompt(player.id), order => {
              player.deck.applyOrder(order);
              return state;
            });
          });
        }
      
        cards.forEach((card, index) => {

          return store.prompt(state, new ShowCardsPrompt(
            opponent.id,
            GameMessage.CARDS_SHOWED_BY_THE_OPPONENT,
            deckTop.cards
          ), () => {

            deckTop.moveCardTo(card, slots[index]);
            slots[index].pokemonPlayedTurn = state.turn;
      
            deckTop.moveTo(opponent.deck);

            player.supporter.moveCardTo(effect.trainerCard, player.discard);

            return store.prompt(state, new ShuffleDeckPrompt(player.id), order => {
              player.deck.applyOrder(order);
              return state;
            });
          });
        });
      });
    }
    return state;
  }
}