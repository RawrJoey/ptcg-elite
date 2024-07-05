import { GameLog, State, StateUtils, StoreLike } from '../../game';
import { TrainerType } from '../../game/store/card/card-types';
import { TrainerCard } from '../../game/store/card/trainer-card';
import { Effect } from '../../game/store/effects/effect';
import { AttachEnergyEffect } from '../../game/store/effects/play-card-effects';

export class FrozenCity extends TrainerCard {

  public regulationMark = 'F';

  public cardImage: string = 'assets/cardback.png';

  public setNumber: string = '100';
  
  public trainerType = TrainerType.STADIUM;

  public set = 'PLF';

  public name = 'Frozen City';

  public fullName = 'Frozen City PLF';

  public text = 'Whenever any player attaches an Energy from his or her hand to 1 of his or her Pokémon (excluding Team Plasma Pokémon), put 2 damage counters on that Pokémon.';

  reduceEffect(store: StoreLike, state: State, effect: Effect): State {

    if (effect instanceof AttachEnergyEffect && StateUtils.getStadiumCard(state) === this) {
      const owner = StateUtils.findOwner(state, effect.target);
      
      store.log(state, GameLog.LOG_PLAYER_PLACES_DAMAGE_COUNTERS, { name: owner.name, damage: 20, target: effect.target.getPokemonCard()!.name, effect: this.name });
      
      effect.target.damage += 20;
      return state;
    }

    return state;
  }

}