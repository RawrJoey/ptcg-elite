import { PokemonCard } from '../../game/store/card/pokemon-card';
import { CardType, Stage } from '../../game/store/card/card-types';
import { StoreLike, State } from '../../game';
import { AttackEffect } from '../../game/store/effects/game-effects';
import { HEAL_X_DAMAGE_FROM_THIS_POKEMON } from '../../game/store/prefabs/attack-effects';
import { Effect } from '../../game/store/effects/effect';
import { WAS_ATTACK_USED } from '../../game/store/prefabs/prefabs';

export class Toedscool extends PokemonCard {

  public regulationMark = 'G';
  
  public stage: Stage = Stage.BASIC;

  public cardType: CardType = CardType.GRASS;

  public hp: number = 60;

  public weakness = [{ type: CardType.FIRE }];

  public retreat = [CardType.COLORLESS];

  public attacks = [
    {
      name: 'Kick',
      cost: [CardType.COLORLESS, CardType.COLORLESS],
      damage: 20,
      text: 'Heal 20 damage from this Pokémon.',
    },
    {
      name: 'Absorb',
      cost: [CardType.GRASS, CardType.COLORLESS, CardType.COLORLESS],
      damage: 40,
      text: 'Heal 20 damage from this Pokémon.',
      effect: (store: StoreLike, state: State, effect: AttackEffect) => {
      }
    }
  ];
  public set: string = 'PAR';

  public cardImage: string = 'assets/cardback.png';

  public setNumber: string = '16';

  public name: string = 'Toedscool';

  public fullName: string = 'Toedscool PAR';
  
  public reduceEffect(store: StoreLike, state: State, effect: Effect): State {
    if (WAS_ATTACK_USED(effect, 0, this)) {
      HEAL_X_DAMAGE_FROM_THIS_POKEMON(20, effect, store, state);
    }
    return state;
  }

}