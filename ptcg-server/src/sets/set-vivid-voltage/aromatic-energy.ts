import { PokemonCardList, State, StateUtils, StoreLike } from '../../game';
import { CardType, EnergyType, SpecialCondition } from '../../game/store/card/card-types';
import { EnergyCard } from '../../game/store/card/energy-card';
import { CheckProvidedEnergyEffect, CheckTableStateEffect } from '../../game/store/effects/check-effects';
import { Effect } from '../../game/store/effects/effect';
import { AttachEnergyEffect } from '../../game/store/effects/play-card-effects';

export class AromaticEnergy extends EnergyCard {

  public provides: CardType[] = [C];

  public energyType = EnergyType.SPECIAL;

  public set: string = 'VIV';

  public cardImage: string = 'assets/cardback.png';

  public setNumber: string = '162';

  public regulationMark = 'D';

  public name = 'Aromatic Energy';

  public fullName = 'Aromatic Energy VIV';

  public text = 'As long as this card is attached to a Pokémon, it provides [G] Energy.' +
    '' +
    'The [G] Pokémon this card is attached to recovers from all Special Conditions and can\'t be affected by any Special Conditions.';

  public reduceEffect(store: StoreLike, state: State, effect: Effect): State {

    if (effect instanceof CheckProvidedEnergyEffect && effect.source.cards.includes(this)) {
      effect.energyMap.push({ card: this, provides: [G] });
    }

    if (effect instanceof AttachEnergyEffect && effect.target.cards.includes(this)) {
      const pokemon = effect.target;

      pokemon.removeSpecialCondition(SpecialCondition.ASLEEP);
      pokemon.removeSpecialCondition(SpecialCondition.PARALYZED);
      pokemon.removeSpecialCondition(SpecialCondition.CONFUSED);
      pokemon.removeSpecialCondition(SpecialCondition.BURNED);
      pokemon.removeSpecialCondition(SpecialCondition.POISONED);
    }

    if (effect instanceof CheckTableStateEffect &&
      (StateUtils.findCardList(state, this) instanceof PokemonCardList) &&
      StateUtils.findCardList(state, this).cards.includes(this)) {
      const cardList = StateUtils.findCardList(state, this);

      if (cardList instanceof PokemonCardList && cardList.cards.includes(this)) {
        const conditionsToKeep = [SpecialCondition.ABILITY_USED];
        const hasSpecialCondition = cardList.specialConditions.some(condition => !conditionsToKeep.includes(condition));
        if (hasSpecialCondition) {
          cardList.specialConditions = cardList.specialConditions.filter(condition => conditionsToKeep.includes(condition));
        }
      }
    }
    return state;
  }
}