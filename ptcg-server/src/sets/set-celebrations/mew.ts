import { CardType, Stage, SuperType, TrainerType } from '../../game/store/card/card-types';
import { StoreLike } from '../../game/store/store-like';
import { State } from '../../game/store/state/state';
import { Effect } from '../../game/store/effects/effect';
import { CardList } from '../../game/store/state/card-list';
import { ChooseCardsPrompt } from '../../game/store/prompts/choose-cards-prompt';
import { GameMessage } from '../../game/game-message';
import { GameError, PokemonCard, PowerType, ShuffleDeckPrompt } from '../../game';
import { PowerEffect } from '../../game/store/effects/game-effects';
import { EndTurnEffect } from '../../game/store/effects/game-phase-effects';
import { PlayPokemonEffect } from '../../game/store/effects/play-card-effects';

export class Mew extends PokemonCard {
  
  public stage: Stage = Stage.BASIC;
  
  public cardType: CardType = CardType.PSYCHIC;
  
  public hp: number = 60;
  
  public weakness = [{ type: CardType.DARK }];

  public resistance = [{ type: CardType.FIGHTING, value: -30 }];
  
  public retreat = [ CardType.COLORLESS ];
  
  public powers = [{
    name: 'Mysterious Tail',
    useWhenInPlay: true,
    powerType: PowerType.ABILITY,
    text: 'Once during your turn, if this Pokémon is in the Active Spot, you may look at the top 6 cards of your deck, reveal an Item card you find there, and put it into your hand. Shuffle the other cards back into your deck.'
  }];
  
  public attacks = [
    {
      name: 'Psyshot',
      cost: [ CardType.PSYCHIC, CardType.COLORLESS ],
      damage: 30,
      text: ''
    }
  ];
  
  public set: string = 'CEL';
  
  public name: string = 'Mew';
  
  public fullName: string = 'Mew CEL';

  public readonly MYSTERIOUS_TAIL_MARKER = 'MYSTERIOUS_TAIL_MARKER';

  public reduceEffect(store: StoreLike, state: State, effect: Effect): State {
    if (effect instanceof PlayPokemonEffect && effect.pokemonCard === this) {
      const player = effect.player;
      player.marker.removeMarker(this.MYSTERIOUS_TAIL_MARKER, this);
      return state;
    }

    if (effect instanceof PowerEffect && effect.power === this.powers[0]) {
      const player = effect.player;
  
      if (player.deck.cards.length === 0) {
        throw new GameError(GameMessage.CANNOT_USE_POWER);
      }
  
      if (player.marker.hasMarker(this.MYSTERIOUS_TAIL_MARKER, this)) {
        throw new GameError(GameMessage.POWER_ALREADY_USED);
      }

      if (player.active.cards[0] !== this) {
        return state; // Not active
      }
  
      const deckTop = new CardList();
      player.deck.moveTo(deckTop, 6);
  
      return store.prompt(state, new ChooseCardsPrompt(
        player.id,
        GameMessage.CHOOSE_CARD_TO_HAND,
        deckTop,
        { superType: SuperType.TRAINER, trainerType: TrainerType.ITEM },
        { min: 1, max: 1, allowCancel: false }
      ), selected => {
        player.marker.addMarker(this.MYSTERIOUS_TAIL_MARKER, this);
        deckTop.moveCardsTo(selected, player.hand);
        deckTop.moveTo(player.deck);
    
        return store.prompt(state, new ShuffleDeckPrompt(player.id), order => {
          player.deck.applyOrder(order);
          return state;
        });
      });
    }
    
    if (effect instanceof EndTurnEffect) {
      const player = (effect as EndTurnEffect).player;
      player.marker.removeMarker(this.MYSTERIOUS_TAIL_MARKER, this);
    }
    
    return state;
  }
}
    