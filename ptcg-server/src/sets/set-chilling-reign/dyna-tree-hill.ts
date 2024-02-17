import { StateUtils } from '../../game/store/state-utils';
import { TrainerCard } from '../../game/store/card/trainer-card';
import { TrainerType } from '../../game/store/card/card-types';
import { HealEffect, UseStadiumEffect } from '../../game/store/effects/game-effects';
import { StoreLike } from '../../game/store/store-like';
import { State } from '../../game/store/state/state';
import { Effect } from '../../game/store/effects/effect';
import { GameError, GameMessage } from '../../game';
import { checkState } from '../../game/store/effect-reducers/check-effect';
import { HealTargetEffect } from '../../game/store/effects/attack-effects';

export class DynaTreeHill extends TrainerCard {

  public trainerType = TrainerType.STADIUM;

  public set = 'CRE';

  public cardImage: string = 'assets/cardback.png';

  public setNumber: string = '135';

  public regulationMark = 'E';

  public name = 'Dyna Tree Hill';

  public fullName = 'Dyna Tree Hill CRE';
  
  public text = 'Pokémon (both yours and your opponent\'s) can\'t be healed.';
    
  public reduceEffect(store: StoreLike, state: State, effect: Effect): State {

    if (effect instanceof HealEffect || HealTargetEffect && StateUtils.getStadiumCard(state) === this) {

      effect.preventDefault = true;

      checkState(store, state);

      if (effect instanceof UseStadiumEffect && StateUtils.getStadiumCard(state) === this) {
        throw new GameError(GameMessage.CANNOT_USE_STADIUM);
      }

      checkState(store, state);

      return state;
    }

    return state;
  }



}
