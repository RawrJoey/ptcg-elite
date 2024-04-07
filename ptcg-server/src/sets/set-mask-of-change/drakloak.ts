import { CardType, Stage } from '../../game/store/card/card-types';
import { StoreLike } from '../../game/store/store-like';
import { State } from '../../game/store/state/state';
import { Effect } from '../../game/store/effects/effect';
import { CardList } from '../../game/store/state/card-list';
import { ChooseCardsPrompt } from '../../game/store/prompts/choose-cards-prompt';
import { GameMessage } from '../../game/game-message';
import { GameError, PokemonCard, PowerType } from '../../game';
import { PowerEffect } from '../../game/store/effects/game-effects';
import { EndTurnEffect } from '../../game/store/effects/game-phase-effects';
import { PlayPokemonEffect } from '../../game/store/effects/play-card-effects';

export class Drakloak extends PokemonCard {
  
  public stage: Stage = Stage.STAGE_1;

  public evolvesFrom = 'Dreepy';

  public regulationMark = 'H';
  
  public cardType: CardType = CardType.DRAGON;
  
  public hp: number = 90;
  
  public weakness = [ ];
  
  public retreat = [ CardType.COLORLESS ];
  
  public powers = [{
    name: 'Telling Spirit',
    useWhenInPlay: true,
    powerType: PowerType.ABILITY,
    text: 'Once during your turn, you may look at the top 2 cards of your deck. Put 1 of them into your hand and put the other 1 on the bottom of your deck.'
  }];
  
  public attacks = [
    {
      name: 'Dragon Headbutt',
      cost: [ CardType.FIRE, CardType.PSYCHIC ],
      damage: 70,
      text: ''
    }
  ];
  
  public set: string = 'SV6';

  public cardImage: string = 'assets/cardback.png';

  public setNumber: string = '80';
  
  public name: string = 'Drakloak';
  
  public fullName: string = 'Drakloak SV6';

  public readonly TELLING_SPIRIT_MARKER = 'TELLING_SPIRIT_MARKER';

  public reduceEffect(store: StoreLike, state: State, effect: Effect): State {
    if (effect instanceof PlayPokemonEffect && effect.pokemonCard === this) {
      const player = effect.player;
      player.marker.removeMarker(this.TELLING_SPIRIT_MARKER, this);
      return state;
    }

    if (effect instanceof PowerEffect && effect.power === this.powers[0]) {
      const player = effect.player;
  
      if (player.deck.cards.length === 0) {
        throw new GameError(GameMessage.CANNOT_USE_POWER);
      }
  
      if (player.marker.hasMarker(this.TELLING_SPIRIT_MARKER, this)) {
        throw new GameError(GameMessage.POWER_ALREADY_USED);
      }

      const deckBottom = new CardList();
      const deckTop = new CardList();
      player.deck.moveTo(deckTop, 2);
  
      return store.prompt(state, new ChooseCardsPrompt(
        player.id,
        GameMessage.CHOOSE_CARD_TO_HAND,
        deckTop,
        { },
        { min: 1, max: 1, allowCancel: true }
      ), selected => {
        player.marker.addMarker(this.TELLING_SPIRIT_MARKER, this);
        deckTop.moveCardsTo(selected, player.hand);
        deckTop.moveTo(deckBottom);
        deckBottom.moveTo(player.deck);
        return state;
      });
    }
    
    if (effect instanceof EndTurnEffect) {
      const player = (effect as EndTurnEffect).player;
      player.marker.removeMarker(this.TELLING_SPIRIT_MARKER, this);
    }
    
    return state;
  }
}
    