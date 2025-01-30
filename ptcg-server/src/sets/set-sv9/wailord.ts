import { PokemonCard } from '../../game/store/card/pokemon-card';
import { Stage, CardType, EnergyType } from '../../game/store/card/card-types';
import { StoreLike } from '../../game/store/store-like';
import { State } from '../../game/store/state/state';
import { Effect } from '../../game/store/effects/effect';
import { AttackEffect } from '../../game/store/effects/game-effects';
import { EnergyCard } from '../../game';

export class Wailord extends PokemonCard {
  public stage: Stage = Stage.STAGE_1;
  public evolvesFrom = 'Wailmer';
  public cardType: CardType = W;
  public hp: number = 240;
  public weakness = [{ type: L }];
  public retreat = [C, C, C, C];

  public attacks = [{
    name: 'Hydro Pump',
    cost: [C, C, C, C],
    damage: 10,
    damageCalculation: '+',
    text: 'This attack does 50 more damage for each [W] Energy attached to this Pokémon.'
  }];

  public set: string = 'SV9';
  public name: string = 'Wailord';
  public fullName: string = 'Wailord SV9';
  public setNumber: string = '25';
  public regulationMark: string = 'I';
  public cardImage: string = 'assets/cardback.png';

  public reduceEffect(store: StoreLike, state: State, effect: Effect): State {
    // Hydro Pump
    if (effect instanceof AttackEffect && effect.attack === this.attacks[1]){
      const player = effect.player;
      
      let waterEnergies = 0;
      player.active.cards.forEach(card =>{
        if (card instanceof EnergyCard && card.energyType === EnergyType.BASIC && card.name === 'Water Energy'){
          waterEnergies++;
        }
      });

      effect.damage += 50 * waterEnergies;
    }
    
    return state;
  }
}