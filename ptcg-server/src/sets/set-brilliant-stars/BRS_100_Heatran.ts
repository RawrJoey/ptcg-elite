import { PokemonCard } from '../../game/store/card/pokemon-card';
import { Stage, CardType } from '../../game/store/card/card-types';
import { StoreLike, State, StateUtils, PlayerType, EnergyCard } from '../../game';
import { Effect } from '../../game/store/effects/effect';
import { AttackEffect } from '../../game/store/effects/game-effects';
import { PutDamageEffect } from '../../game/store/effects/attack-effects';
import { EndTurnEffect } from '../../game/store/effects/game-phase-effects';

export class Heatran extends PokemonCard {
  public stage: Stage = Stage.BASIC;
  public cardType: CardType = CardType.METAL;
  public hp: number = 140;
  public weakness = [{ type: CardType.FIRE }];
  public resistance = [{ type: CardType.GRASS, value: -30 }];

  public attacks = [{
    name: 'Guard Claw',
    cost: [CardType.COLORLESS, CardType.COLORLESS],
    damage: 30,
    text: 'During your opponent\'s next turn, this Pokémon takes 30 less damage from attacks (after applying Weakness and Resistance). '
  },
  {
    name: 'Iron Hammer',
    cost: [CardType.METAL, CardType.METAL, CardType.COLORLESS],
    damage: 80,
    text: 'If this Pokémon has any [R] Energy attached, this attack does 80 more damage. '
  }];

  public set: string = 'BRS';
  public regulationMark: string = 'F';
  public cardImage: string = 'assets/cardback.png';
  public setNumber: string = '100';
  public name: string = 'Heatran';
  public fullName: string = 'Heatran BRS';


  public readonly DURING_OPPONENTS_NEXT_TURN_TAKE_LESS_DAMAGE_MARKER = 'DURING_OPPONENTS_NEXT_TURN_TAKE_LESS_DAMAGE_MARKER';
  public readonly CLEAR_DURING_OPPONENTS_NEXT_TURN_TAKE_LESS_DAMAGE_MARKER = 'CLEAR_DURING_OPPONENTS_NEXT_TURN_TAKE_LESS_DAMAGE_MARKER';

  public reduceEffect(store: StoreLike, state: State, effect: Effect): State {

    if (effect instanceof AttackEffect && effect.attack === this.attacks[0]) {
      const player = effect.player;
      const opponent = StateUtils.getOpponent(state, player);

      player.active.attackMarker.addMarker(this.DURING_OPPONENTS_NEXT_TURN_TAKE_LESS_DAMAGE_MARKER, this);
      opponent.attackMarker.addMarker(this.CLEAR_DURING_OPPONENTS_NEXT_TURN_TAKE_LESS_DAMAGE_MARKER, this);

      return state;
    }

    if (effect instanceof AttackEffect && effect.attack === this.attacks[1]) {
      const player = effect.player;
      const pokemon = player.active;

      let fireEnergyCount = 0;
      pokemon.cards.forEach(c => {
        if (c instanceof EnergyCard) {
          if (c.provides.includes(CardType.FIRE)) {
            fireEnergyCount++;
          }
        }
      });

      if (fireEnergyCount > 0) {
        effect.damage += 80;
      }

      return state;
    }

    if (effect instanceof PutDamageEffect
      && effect.target.attackMarker.hasMarker(this.DURING_OPPONENTS_NEXT_TURN_TAKE_LESS_DAMAGE_MARKER)) {
      console.log('effect.damage before redux: ' + effect.damage);
      effect.damage -= 30;
      return state;
    }

    if (effect instanceof EndTurnEffect
      && effect.player.attackMarker.hasMarker(this.CLEAR_DURING_OPPONENTS_NEXT_TURN_TAKE_LESS_DAMAGE_MARKER, this)) {
      effect.player.attackMarker.removeMarker(this.CLEAR_DURING_OPPONENTS_NEXT_TURN_TAKE_LESS_DAMAGE_MARKER, this);
      const opponent = StateUtils.getOpponent(state, effect.player);
      opponent.forEachPokemon(PlayerType.TOP_PLAYER, (cardList) => {
        cardList.attackMarker.removeMarker(this.DURING_OPPONENTS_NEXT_TURN_TAKE_LESS_DAMAGE_MARKER, this);
      });
    }

    return state;
  }
}