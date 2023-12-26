import { PokemonCard } from '../../game/store/card/pokemon-card';
import { Stage, CardType } from '../../game/store/card/card-types';
import { StoreLike } from '../../game/store/store-like'; 
import { State } from '../../game/store/state/state';
import { Effect } from '../../game/store/effects/effect';
import { CoinFlipPrompt } from '../../game/store/prompts/coin-flip-prompt';
import { GameMessage } from '../../game/game-message';
import { StateUtils } from '../../game/store/state-utils';
import { PlayerType } from '../../game/store/actions/play-card-action';
import { EndTurnEffect } from '../../game/store/effects/game-phase-effects';
import { PutDamageEffect } from '../../game/store/effects/attack-effects';
import { AttackEffect } from '../../game/store/effects/game-effects';

export class Squirtle extends PokemonCard {

  public regulationMark = 'G';
  
  public stage = Stage.BASIC;

  public cardType = CardType.WATER;

  public hp = 60;

  public weakness = [{
    type: CardType.LIGHTNING,
  }];
  public retreat = [CardType.COLORLESS];

  public attacks = [{
    name: 'Withdraw',
    cost: [CardType.WATER],
    damage: 0,
    text: 'Flip a coin. If heads, prevent all damage done to Squirtle by ' + 
            'attacks during your opponent\'s next turn.'
  }, {
    name: 'Skull Bash',
    cost: [CardType.WATER, CardType.WATER],
    damage: 20,
    text: ''
  }];

  public set = '151';

  public cardImage: string = 'assets/cardback.png';

  public setNumber: string = '7';

  public name = 'Squirtle';

  public fullName = 'Squirtle MEW';

  CLEAR_WITHDRAW_MARKER = 'CLEAR_WITHDRAW_MARKER';
  WITHDRAW_MARKER = 'WITHDRAW_MARKER';

  reduceEffect(store: StoreLike, state: State, effect: Effect) {
    if (effect instanceof AttackEffect && effect.attack === this.attacks[0]) {     
      const player = effect.player;
      const opponent = StateUtils.getOpponent(state, player);
      return store.prompt(state, new CoinFlipPrompt(player.id, GameMessage.COIN_FLIP), flipResult => {
        if (flipResult) {
          player.active.marker.addMarker(this.WITHDRAW_MARKER, this);
          opponent.marker.addMarker(this.CLEAR_WITHDRAW_MARKER, this);
        }
      });
    }
    if (effect instanceof PutDamageEffect 
            && effect.target.marker.hasMarker(this.WITHDRAW_MARKER)) {
      effect.preventDefault = true;
      return state;
    }
    if (effect instanceof EndTurnEffect 
            && effect.player.marker.hasMarker(this.CLEAR_WITHDRAW_MARKER, this)) {
      effect.player.marker.removeMarker(this.CLEAR_WITHDRAW_MARKER, this);
      const opponent = StateUtils.getOpponent(state, effect.player);
      opponent.forEachPokemon(PlayerType.TOP_PLAYER, (cardList) => {
        cardList.marker.removeMarker(this.WITHDRAW_MARKER, this);
      });
    }
    return state;
  }
}
