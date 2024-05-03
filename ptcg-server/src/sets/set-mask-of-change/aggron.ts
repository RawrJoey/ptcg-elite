import { CardType, Stage } from '../../game/store/card/card-types';
import { StoreLike } from '../../game/store/store-like';
import { State } from '../../game/store/state/state';
import { Effect } from '../../game/store/effects/effect';
import { GameError, GameMessage, PlayerType, PokemonCard, StateUtils } from '../../game';
import { AttackEffect } from '../../game/store/effects/game-effects';
import { PutDamageEffect } from '../../game/store/effects/attack-effects';
import { EndTurnEffect } from '../../game/store/effects/game-phase-effects';

export class Aggron extends PokemonCard {
  
  public stage: Stage = Stage.STAGE_2;

  public evolvesFrom: string = 'Lairon';

  public regulationMark = 'H';
  
  public cardType: CardType = CardType.METAL;
  
  public weakness = [{ type: CardType.FIRE }];

  public resistance = [{ type: CardType.FIRE, value: -30 }];

  public hp: number = 180;
  
  public retreat = [ CardType.COLORLESS, CardType.COLORLESS, CardType.COLORLESS ];
  
  public attacks = [
    {
      name: 'Angry Slam',
      cost: [ CardType.METAL ],
      damage: 50,
      text: 'This attack does 50 damage for each of your Pokémon that has any damage counters on it.'
    },
    {
      name: 'Guard Claw',
      cost: [ CardType.METAL, CardType.COLORLESS, CardType.COLORLESS ],
      damage: 120,
      text: 'During your opponent\'s next turn, this Pokémon takes 50 less damage from attacks (after applying Weakness and Resistance).'
    }
  ];
  
  public set: string = 'SV6';

  public cardImage: string = 'assets/cardback.png';

  public setNumber: string = '75';
  
  public name: string = 'Aggron';
  
  public fullName: string = 'Aggron SV6';

  public readonly DURING_OPPONENTS_NEXT_TURN_TAKE_LESS_DAMAGE_MARKER = 'DURING_OPPONENTS_NEXT_TURN_TAKE_LESS_DAMAGE_MARKER';

  public readonly CLEAR_DURING_OPPONENTS_NEXT_TURN_TAKE_LESS_DAMAGE_MARKER = 'CLEAR_DURING_OPPONENTS_NEXT_TURN_TAKE_LESS_DAMAGE_MARKER';

  public reduceEffect(store: StoreLike, state: State, effect: Effect): State {

    if (effect instanceof AttackEffect && effect.attack === this.attacks[0]) {
      const player = effect.player;
  
      const hasBenched = player.bench.some(b => b.cards.length > 0);
      if (!hasBenched) {
        throw new GameError(GameMessage.CANNOT_USE_ATTACK);
      }
  
      let benchPokemonWithDamage = 0;
  
      player.forEachPokemon(PlayerType.BOTTOM_PLAYER, (cardList, card, target) => {
        if (cardList.damage !== 0) {
          benchPokemonWithDamage++;
        }
      });
  
      effect.damage = benchPokemonWithDamage * 50;
  
    }

    if (effect instanceof AttackEffect && effect.attack === this.attacks[1]) {

      const player = effect.player;
      const opponent = StateUtils.getOpponent(state, player);
        
      player.active.attackMarker.addMarker(this.DURING_OPPONENTS_NEXT_TURN_TAKE_LESS_DAMAGE_MARKER, this);
      opponent.attackMarker.addMarker(this.CLEAR_DURING_OPPONENTS_NEXT_TURN_TAKE_LESS_DAMAGE_MARKER, this);
        
      if (effect instanceof PutDamageEffect
                            && effect.target.attackMarker.hasMarker(this.DURING_OPPONENTS_NEXT_TURN_TAKE_LESS_DAMAGE_MARKER)) {
        effect.damage -= 50;
        return state;
      }

      if (effect instanceof EndTurnEffect
                            && effect.player.attackMarker.hasMarker(this.CLEAR_DURING_OPPONENTS_NEXT_TURN_TAKE_LESS_DAMAGE_MARKER, this)) {
        effect.player.attackMarker.removeMarker(this.CLEAR_DURING_OPPONENTS_NEXT_TURN_TAKE_LESS_DAMAGE_MARKER, this);
        const opponent = StateUtils.getOpponent(state, effect.player);
        opponent.forEachPokemon(PlayerType.TOP_PLAYER, (cardList) => {
          cardList.attackMarker.removeMarker(this.DURING_OPPONENTS_NEXT_TURN_TAKE_LESS_DAMAGE_MARKER, this);
        });
        return state;
      }
      return state;
    }
    return state;
  }
}
  