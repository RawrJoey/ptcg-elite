import { CardType, SpecialCondition, Stage } from '../../game/store/card/card-types';
import { StoreLike } from '../../game/store/store-like';
import { State } from '../../game/store/state/state';
import { Effect } from '../../game/store/effects/effect';
import { CardList } from '../../game/store/state/card-list';
import { ChooseCardsPrompt } from '../../game/store/prompts/choose-cards-prompt';
import { GameMessage } from '../../game/game-message';
import { GameError, PlayerType, PokemonCard, PowerType } from '../../game';
import { PowerEffect } from '../../game/store/effects/game-effects';
import { EndTurnEffect } from '../../game/store/effects/game-phase-effects';
import { PlayPokemonEffect } from '../../game/store/effects/play-card-effects';

export class Comfey extends PokemonCard {
  
  public stage: Stage = Stage.BASIC;

  public regulationMark = 'F';
  
  public cardType: CardType = CardType.PSYCHIC;

  public cardTypez: CardType = CardType.COMFEY;
  
  public hp: number = 70;
  
  public weakness = [{ type: CardType.METAL }];
  
  public retreat = [ CardType.COLORLESS ];
  
  public powers = [{
    name: 'Flower Selecting',
    useWhenInPlay: true,
    powerType: PowerType.ABILITY,
    text: 'Once during your turn, if this Pokémon is in the Active Spot, you may look at the top 2 cards of your deck and put 1 of them into your hand. Put the other card in the Lost Zone.'
  }];
  
  public attacks = [
    {
      name: 'Spinning Attack',
      cost: [ CardType.PSYCHIC, CardType.COLORLESS ],
      damage: 30,
      text: ''
    }
  ];
  
  public set: string = 'LOR';

  public cardImage: string = 'assets/cardback.png';

  public setNumber: string = '79';
  
  public name: string = 'Comfey';
  
  public fullName: string = 'Comfey LOR';

  public readonly FLOWER_SELECTING_MARKER = 'FLOWER_SELECTING_MARKER';

  public reduceEffect(store: StoreLike, state: State, effect: Effect): State {
    if (effect instanceof PlayPokemonEffect && effect.pokemonCard === this) {
      const player = effect.player;
      player.marker.removeMarker(this.FLOWER_SELECTING_MARKER, this);
      return state;
    }

    if (effect instanceof PowerEffect && effect.power === this.powers[0]) {
      const player = effect.player;
  
      if (player.deck.cards.length === 0) {
        throw new GameError(GameMessage.CANNOT_USE_POWER);
      }
  
      if (player.marker.hasMarker(this.FLOWER_SELECTING_MARKER, this)) {
        throw new GameError(GameMessage.POWER_ALREADY_USED);
      }

      if (player.active.cards[0] !== this) {
        return state; // Not active
      }
  
      const deckTop = new CardList();
      player.deck.moveTo(deckTop, 2);

      player.forEachPokemon(PlayerType.BOTTOM_PLAYER, cardList => {
        if (cardList.getPokemonCard() === this) {
          cardList.addSpecialCondition(SpecialCondition.ABILITY_USED);
        }
      });
  
      return store.prompt(state, new ChooseCardsPrompt(
        player.id,
        GameMessage.CHOOSE_CARD_TO_HAND,
        deckTop,
        { },
        { min: 1, max: 1, allowCancel: false }
      ), selected => {
        player.marker.addMarker(this.FLOWER_SELECTING_MARKER, this);
        deckTop.moveCardsTo(selected, player.hand);
        deckTop.moveTo(player.lostzone);
        return state;
      });
    }
    
    if (effect instanceof EndTurnEffect) {
      const player = (effect as EndTurnEffect).player;
      player.marker.removeMarker(this.FLOWER_SELECTING_MARKER, this);
    }
    
    return state;
  }
}
    