import { CardType, EnergyType } from '../../game/store/card/card-types';
import { EnergyCard } from '../../game/store/card/energy-card';
import { CheckProvidedEnergyEffect } from '../../game/store/effects/check-effects';
import { Effect } from '../../game/store/effects/effect';

import { State } from '../../game/store/state/state';
import { StoreLike } from '../../game/store/store-like';

export class UnitEnergyLPM extends EnergyCard {

  public provides: CardType[] = [CardType.COLORLESS];

  public energyType = EnergyType.SPECIAL;

  public set: string = 'UPR';

  public cardImage: string = 'assets/cardback.png';

  public setNumber: string = '138';

  public name = 'Unit Energy LPM';

  public fullName = 'Unit Energy LPM UPR';

  public text = 'This card provides [C] Energy.' +
    '' +
    'While this card is attached to a Pokémon, it provides [L], [P], and [M] Energy but provides only 1 Energy at a time.';

  blendedEnergies = [CardType.LIGHTNING, CardType.PSYCHIC, CardType.METAL];

  public reduceEffect(store: StoreLike, state: State, effect: Effect): State {
    if (effect instanceof CheckProvidedEnergyEffect && effect.source.cards.includes(this)) {
      const pokemon = effect.source;
      const pokemonCard = pokemon.getPokemonCard();
      const attackCosts = pokemonCard?.attacks.map(attack => attack.cost);

      const costs = attackCosts?.flat().filter(t => t !== CardType.COLORLESS) || [];
      const alreadyProvided = effect.energyMap.flatMap(e => e.provides);
      const neededType = costs.find(cost =>
        this.blendedEnergies.includes(cost) &&
        !alreadyProvided.includes(cost)
      );

      effect.energyMap.push({
        card: this,
        provides: neededType ? [neededType] : [CardType.COLORLESS]
      });
    }
    return state;
  }
}