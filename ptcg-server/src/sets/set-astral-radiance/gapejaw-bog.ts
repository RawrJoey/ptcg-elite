import { GameLog, State, StateUtils, StoreLike } from '../../game';
import { TrainerType } from '../../game/store/card/card-types';
import { TrainerCard } from '../../game/store/card/trainer-card';
import { Effect } from '../../game/store/effects/effect';
import { PlayPokemonEffect } from '../../game/store/effects/play-card-effects';

export class GapejawBog extends TrainerCard {

  public regulationMark = 'F';

  public cardImage: string = 'assets/cardback.png';

  public setNumber: string = '142';
  
  public trainerType = TrainerType.STADIUM;

  public set = 'ASR';

  public name = 'Gapejaw Bog';

  public fullName = 'Gapejaw Bog ASR';

  public text = 'Whenever either player puts a Basic Pokémon from their hand onto their Bench, put 2 damage counters on that Pokémon.';

  reduceEffect(store: StoreLike, state: State, effect: Effect): State {

    if (effect instanceof PlayPokemonEffect && StateUtils.getStadiumCard(state) === this) {
      if (effect.target.cards.length > 0) {
        return state;
      }
      
      const owner = StateUtils.findOwner(state, effect.target);
      
      store.log(state, GameLog.LOG_PLAYER_PLACES_DAMAGE_COUNTERS, { name: owner.name, damage: 20, target: effect.pokemonCard.name, effect: this.name });
      
      effect.target.damage += 20;
      return state;
    }

    return state;
  }

}