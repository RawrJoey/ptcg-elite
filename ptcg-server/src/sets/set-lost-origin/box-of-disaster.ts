import { TrainerCard } from '../../game/store/card/trainer-card';
import { TrainerType } from '../../game/store/card/card-types';
import { StoreLike } from '../../game/store/store-like';
import { State, GamePhase } from '../../game/store/state/state';
import { Effect } from '../../game/store/effects/effect';
import { AfterDamageEffect } from '../../game/store/effects/attack-effects';
import { StateUtils } from '../../game/store/state-utils';
import { PokemonCard } from '../..';

export class BoxOfDisaster extends TrainerCard {

  public regulationMark = 'F';

  public trainerType: TrainerType = TrainerType.TOOL;
  
  public set: string = 'LOR';
  
  public set2: string = 'lostorigin';
  
  public setNumber: string = '154';
  
  public name = 'Box of Disaster';
  
  public fullName = 'Box of Disaster LOR';

  public text: string =
    'If the Pokémon V this card is attached to has full HP and is Knocked Out by damage from an attack from your opponent\'s Pokémon, put 8 damage counters on the Attacking Pokémon.';

  public reduceEffect(store: StoreLike, state: State, effect: Effect): State {
    if (effect instanceof AfterDamageEffect && effect.target.tool === this) {
      const player = effect.player;
      const targetPlayer = StateUtils.findOwner(state, effect.target);

      if (effect.damage <= 0 || player === targetPlayer || targetPlayer.active !== effect.target) {
        return state;
      }

      const activePokemon = player.active as unknown as PokemonCard;
      const maxHp = activePokemon.hp;

      if (state.phase === GamePhase.ATTACK) {
        if (maxHp === maxHp && player.active.damage === maxHp) {
          effect.source.damage += 80;
        }
      }
    }

    return state;
  }
}