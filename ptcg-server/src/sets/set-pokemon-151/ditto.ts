import { PokemonCard } from '../../game/store/card/pokemon-card'; 
import { Stage, CardType, SuperType } from '../../game/store/card/card-types';
import { PowerType } from '../../game/store/card/pokemon-types';
import { PowerEffect } from '../../game/store/effects/game-effects';
import { StoreLike, State, GameError, GameMessage, Card, ChooseCardsPrompt, ShuffleDeckPrompt } from '../../game';
import { Effect } from '../../game/store/effects/effect';

export class Ditto extends PokemonCard {

  public stage: Stage = Stage.BASIC;

  public cardType: CardType = CardType.COLORLESS;  

  public hp: number = 60;

  public weakness = [{ type: CardType.FIGHTING }];

  public retreat = [ CardType.COLORLESS ];

  public powers = [{
    name: 'Transformative Start',
    powerType: PowerType.ABILITY, 
    useWhenInPlay: true,
    text: 'Once during your first turn, if this Pokémon is in the Active Spot, you may search your deck and choose a Basic Pokémon you find there, except any Ditto. If you do, discard this Pokémon and all attached cards, and put the chosen Pokémon in its place. Then, shuffle your deck.'
  }];

  public attacks = [{
    name: 'Splup',
    cost: [CardType.COLORLESS],
    damage: 10,
    text: ''
  }];

  public set: string = '151';

  public set2: string = '151';

  public setNumber: string = '132';

  public name: string = 'Ditto';

  public fullName: string = 'Ditto MEW';

  public reduceEffect(store: StoreLike, state: State, effect: Effect): State {

    if (effect instanceof PowerEffect && effect.power === this.powers[0]) {
      const player = effect.player;
      // Get current turn
      const turn = state.turn;
      
      // Check if it is player's first turn
      if (turn > 2) {
        throw new GameError(GameMessage.CANNOT_PLAY_THIS_CARD);
      } else {

        let cards: Card[] = [];
        return store.prompt(state, new ChooseCardsPrompt(
          player.id,
          GameMessage.CHOOSE_CARD_TO_PUT_ONTO_BENCH,
          player.deck,
          { superType: SuperType.POKEMON, stage: Stage.BASIC },
          { min: 0, max: 1, allowCancel: true }
        ), selectedCards => {
          cards = selectedCards || [];
      
  
          cards.forEach((card, index) => {
            player.active.moveCardTo(card, player.discard);
            player.deck.moveCardTo(card, player.active);
            player.active.pokemonPlayedTurn = state.turn;
          });
      
          return store.prompt(state, new ShuffleDeckPrompt(player.id), order => {
            player.deck.applyOrder(order);
            
            return state;
          });
        }
        );

      }

    }
    return state;
  }
}
