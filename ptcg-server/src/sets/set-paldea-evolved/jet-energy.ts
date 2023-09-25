import { StoreLike, State } from '../../game';
import { CardType, EnergyType } from '../../game/store/card/card-types';
import { EnergyCard } from '../../game/store/card/energy-card';
import { Effect } from '../../game/store/effects/effect';
import { AttachEnergyEffect } from '../../game/store/effects/play-card-effects';

export class JetEnergy extends EnergyCard {

  public provides: CardType[] = [ CardType.COLORLESS, CardType.COLORLESS ];

  public energyType = EnergyType.SPECIAL;

  public set: string = 'PAL';

  public name = 'Jet Energy';

  public fullName = 'Jet Energy PAL';

  public reduceEffect(store: StoreLike, state: State, effect: Effect): State {

    if(effect instanceof AttachEnergyEffect && effect.energyCard === this) {
    
      const player = effect.player;
      const target = effect.target;
    
      player.switchPokemon(target);
    
    }
    
    return state;
    
  }
    
}