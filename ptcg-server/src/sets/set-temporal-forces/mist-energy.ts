import { CardType, EnergyType } from '../../game/store/card/card-types';
import { EnergyCard } from '../../game/store/card/energy-card';
import { StoreLike } from '../../game/store/store-like';
import { State } from '../../game/store/state/state';
import { Effect } from '../../game/store/effects/effect';
import { AbstractAttackEffect, PutDamageEffect } from '../../game/store/effects/attack-effects';

export class MistEnergy extends EnergyCard {

  public provides: CardType[] = [ CardType.COLORLESS ];

  public energyType = EnergyType.SPECIAL;

  public set: string = 'TEF';

  public regulationMark = 'H';

  public cardImage: string = 'assets/cardback.png';

  public setNumber: string = '161';

  public name = 'Mist Energy';

  public fullName = 'Mist Energy TEF';

  public text =
    'As long as this card is attached to a Pokémon, it provides C Energy.' +
    '' +
    'Prevent all effects of attacks from your opponent\'s Pokémon done to the Pokémon this card is attached to. (Existing effects are not removed. Damage is not an effect.)';

  public reduceEffect(store: StoreLike, state: State, effect: Effect): State {

    // Prevent effects of attacks
    if (effect instanceof AbstractAttackEffect && effect.target.cards.includes(this)) {
      const sourceCard = effect.source.getPokemonCard();
      
      if (sourceCard) {
    
        // Allow damage
        if (effect instanceof PutDamageEffect) {
          return state; 
        }
        effect.preventDefault = true;
      }
    }
      
    return state;
  }
      
}
      