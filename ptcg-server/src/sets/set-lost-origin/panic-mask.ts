import { TrainerCard } from '../../game/store/card/trainer-card';
import { TrainerType } from '../../game/store/card/card-types';
import { StoreLike } from '../../game/store/store-like';
import { State } from '../../game/store/state/state';
import { Effect } from '../../game/store/effects/effect';
import { DealDamageEffect } from '../../game/store/effects/attack-effects';
import { StateUtils } from '../../game/store/state-utils';
import { ToolEffect } from '../../game/store/effects/play-card-effects';

export class PanicMask extends TrainerCard {

  public regulationMark = 'F';

  public trainerType: TrainerType = TrainerType.TOOL;

  public set: string = 'LOR';

  public cardImage: string = 'assets/cardback.png';

  public setNumber: string = '165';

  public name = 'Panic Mask';

  public fullName = 'Panic Mask LOR';

  public text: string =
    'Prevent all damage done to the Pokémon this card is attached to by attacks from your opponent\'s Pokémon that have 40 HP or less remaining.';

  public reduceEffect(store: StoreLike, state: State, effect: Effect): State {

    if (effect instanceof DealDamageEffect && effect.target.tool === this) {
      const player = effect.player;
      const opponent = StateUtils.getOpponent(state, player);
      const targetPlayer = StateUtils.findOwner(state, effect.target);

      try {
        const toolEffect = new ToolEffect(player, this);
        store.reduceEffect(state, toolEffect);
      } catch {
        return state;
      }

      if (effect.damage <= 0 || player === targetPlayer || targetPlayer.active !== effect.target) {
        return state;
      }

      const activePokemon = opponent.active;
      const maxHp = activePokemon.getPokemonCard()?.hp || 0;
      const currentHp = maxHp - activePokemon.damage;

      if (currentHp <= 40) {
        effect.damage = 0;
      }
    }


    return state;
  }
}