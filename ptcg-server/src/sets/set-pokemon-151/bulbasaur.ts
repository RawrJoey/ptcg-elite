import { PokemonCard } from '../../game/store/card/pokemon-card';
import { CardType, Stage } from '../../game/store/card/card-types';
import { StoreLike, State } from '../../game';
import { AttackEffect } from '../../game/store/effects/game-effects';
import { HEAL_X_DAMAGE_FROM_THIS_POKEMON } from '../../game/store/effect-factories/prefabs';

export class Bulbasaur extends PokemonCard {

  public regulationMark = 'G';
  
  public stage: Stage = Stage.BASIC;
  public cardType: CardType = CardType.GRASS;
  public hp: number = 70;
  public weakness = [{ type: CardType.FIRE }];
  public retreat = [CardType.COLORLESS, CardType.COLORLESS];
  public attacks = [
    {
      name: 'Leech Seed',
      cost: [CardType.GRASS, CardType.COLORLESS],
      damage: 20,
      text: 'Heal 20 damage from this Pokémon.',
      effect: (store: StoreLike, state: State, effect: AttackEffect) => {
        HEAL_X_DAMAGE_FROM_THIS_POKEMON(effect, store, state, 20);
      }
    }
  ];
  public set: string = '151';
  public name: string = 'Bulbasaur';
  public fullName: string = 'Bulbasaur MEW 001';
  
}