/* eslint-disable indent */
import { PokemonCard } from '../../game/store/card/pokemon-card';
import { Stage, CardType } from '../../game/store/card/card-types';
import { PowerType, State, StoreLike } from '../../game';
import { CardTag } from '../../game/store/card/card-types';
import { CheckAttackCostEffect, CheckPokemonTypeEffect } from '../../game/store/effects/check-effects';
import { Effect } from '../../game/store/effects/effect';
import { PowerEffect } from '../../game/store/effects/game-effects';

export class DrapionV extends PokemonCard {

  public tags = [ CardTag.POKEMON_V ];

  public stage: Stage = Stage.BASIC;

  public cardType: CardType = CardType.DARK;

  public hp: number = 210;

  public weakness = [{ type: CardType.FIGHTING }];

  public retreat = [ CardType.COLORLESS, CardType.COLORLESS ];

  public powers = [{
    name: 'Wild Style',
    powerType: PowerType.ABILITY,
    text: 'This Pokémon\'s attacks cost C less for each of your opponent\'s Single Strike, Rapid Strike, and Fusion Strike Pokémon in play.'
  }];

  public attacks = [
    {
      name: 'Dynamic Tail',
      cost: [ CardType.COLORLESS, CardType.COLORLESS, CardType.COLORLESS, CardType.COLORLESS ],
      damage: 190,
      text: 'This attack also does 60 damage to 1 of your Pokémon. (Don\'t apply Weakness and Resistance for Benched Pokémon.)'
    }
  ];

  public set: string = 'LOR';

  public name: string = 'Drapion V';

  public fullName: string = 'Drapion V LOR';

  // Implement ability
  public reduceEffect(store: StoreLike, state: State, effect: Effect): State {

    if (effect instanceof PowerEffect && effect.power === this.powers[0]) {
  
  if (effect instanceof CheckAttackCostEffect) {
    const player = effect.player;
    const index = effect.cost.indexOf(CardType.COLORLESS);

    // No cost to reduce
    if (index === -1) {
      return state;
    }

    let wildStyleCount = 0;

    if (player.active?.getPokemonCard()?.tags.includes(CardTag.FUSION_STRIKE || CardTag.RAPID_STRIKE || CardTag.SINGLE_STRIKE)) {
      wildStyleCount++;
  }

  player.bench.forEach(benchSpot => {
      if (benchSpot.getPokemonCard()?.tags.includes(CardTag.FUSION_STRIKE || CardTag.RAPID_STRIKE || CardTag.SINGLE_STRIKE)) {
        wildStyleCount++;
      }
  });

    const checkPokemonTypeEffect = new CheckPokemonTypeEffect(player.active);
    store.reduceEffect(state, checkPokemonTypeEffect);

for (let i = 0; i < wildStyleCount; i++) {
  if (index !== -1) {
    effect.cost.splice(index, 1);
  }
    }

    return state;
  }
  return state;
}
return state;
}
}