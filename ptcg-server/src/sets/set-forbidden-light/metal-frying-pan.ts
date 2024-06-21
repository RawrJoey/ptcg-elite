import { CardType, TrainerType } from '../../game/store/card/card-types';
import { TrainerCard } from '../../game/store/card/trainer-card';
import { PutDamageEffect } from '../../game/store/effects/attack-effects';
import { CheckPokemonTypeEffect } from '../../game/store/effects/check-effects';
import { Effect } from '../../game/store/effects/effect';
import { ToolEffect } from '../../game/store/effects/play-card-effects';
import { StateUtils } from '../../game/store/state-utils';
import { GamePhase, State } from '../../game/store/state/state';
import { StoreLike } from '../../game/store/store-like';

export class MetalFryingPan extends TrainerCard {

  public trainerType: TrainerType = TrainerType.TOOL;

  public set: string = 'FLI';

  public cardImage: string = 'assets/cardback.png';

  public setNumber: string = '112';

  public name: string = 'Metal Frying Pan';

  public fullName: string = 'Metal Frying Pan FLI';

  public text: string =
    'The [M] Pokémon this card is attached to takes 30 less damage from your opponent\'s attacks (after applying Weakness and Resistance) and has no Weakness.';

  public reduceEffect(store: StoreLike, state: State, effect: Effect): State {
    if (effect instanceof PutDamageEffect && effect.source.cards.includes(this)) {
      const sourceCard = effect.source.getPokemonCard();

      // It's not an attack
      if (state.phase !== GamePhase.ATTACK) {
        return state;
      }
  
      if (effect.damageReduced) {
        // Damage already reduced, don't reduce again
        return state; 
      }
    
      const player = StateUtils.findOwner(state, effect.target);

      try {
        const toolEffect = new ToolEffect(player, this);
        store.reduceEffect(state, toolEffect);
      } catch {
        return state;
      }

      if (sourceCard) {
        const checkPokemonTypeEffect = new CheckPokemonTypeEffect(effect.source);
        store.reduceEffect(state, checkPokemonTypeEffect);
  
        if (checkPokemonTypeEffect.cardTypes.includes(CardType.METAL)) {
          // Check if damage target is owned by this card's owner 
          const targetPlayer = StateUtils.findOwner(state, effect.target);
          if (targetPlayer === player) {
            effect.damage = Math.max(0, effect.damage - 30);
            effect.damageReduced = true;
          }
    
          effect.attackEffect.ignoreWeakness = true;
          
          return state;   
        }
      }
    }
    return state;
  }

}
