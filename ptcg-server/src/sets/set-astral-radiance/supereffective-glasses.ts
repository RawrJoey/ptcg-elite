import { State, StoreLike, TrainerCard, TrainerType } from '../../game';
import { Effect } from '../../game/store/effects/effect';  
import { ApplyWeaknessEffect } from '../../game/store/effects/attack-effects';

export class SupereffectiveGlasses extends TrainerCard {

  public trainerType: TrainerType = TrainerType.TOOL;

  public set: string = 'ASR';

  public set2: string = 'astralradiance';

  public setNumber: string = '152';

  public regulationMark = 'F';

  public name: string = 'Supereffective Glasses';

  public fullName: string = 'Supereffective Glasses ASR';

  public text: string = 
    'When applying Weakness to damage from the attacks of the Pokémon this card is attached to done to your opponent\'s Active Pokémon, apply it as ×3.';

  public reduceEffect(store: StoreLike, state: State, effect: Effect): State {
    
    if(effect instanceof ApplyWeaknessEffect && effect.target.tool === this) {
      effect.damage = effect.damage * 1.5;
    }

    return state;
  }

}
