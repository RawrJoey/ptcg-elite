import { TrainerCard } from '../../game/store/card/trainer-card';
import { CardTag, TrainerType } from '../../game/store/card/card-types';
import { StoreLike } from '../../game/store/store-like';
import { State } from '../../game/store/state/state';
import { Effect } from '../../game/store/effects/effect';
import { CheckHpEffect } from '../../game/store/effects/check-effects';
import { RemoveSpecialConditionsEffect } from '../../game/store/effects/attack-effects';

export class AncientBoosterEnergyCapsule extends TrainerCard {

  public trainerType: TrainerType = TrainerType.TOOL;

  public regulationMark = 'G';

  public tags = [ CardTag.ANCIENT ];

  public set: string = 'PAR';

  public cardImage: string = 'assets/cardback.png';

  public setNumber: string = '61';

  public name: string = 'Ancient Booster Energy Capsule';

  public fullName: string = 'Ancient Booster Energy Capsule PAR';

  public text: string =
    'The Ancient Pokémon this card is attached to gets +60 HP, recovers from all Special Conditions, and can\'t be affected by any Special Conditions.';

  public reduceEffect(store: StoreLike, state: State, effect: Effect): State {

    if (effect instanceof CheckHpEffect && effect.target.cards.includes(this)) {

      const card = effect.target.getPokemonCard();

      if (card === undefined) {
        return state;
      }

      if (card.tags.includes(CardTag.ANCIENT)) {
        effect.hp += 60;
      }
    }

    if (effect instanceof RemoveSpecialConditionsEffect && effect.target.cards.includes(this)) {
      const card = effect.target.getPokemonCard();

      if (card === undefined) {
        return state;
      }

      if (card.tags.includes(CardTag.ANCIENT)) {
        effect.target.specialConditions = [];
        effect.preventDefault = true;
        return state;
      }
    }

    return state;
  }
}
