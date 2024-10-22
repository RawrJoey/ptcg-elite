import { PokemonCard } from '../../game/store/card/pokemon-card';
import { Stage, CardType } from '../../game/store/card/card-types';
import { StoreLike } from '../../game/store/store-like';
import { State } from '../../game/store/state/state';
import { AttackEffect } from '../../game/store/effects/game-effects';
import { Effect } from '../../game/store/effects/effect';

export class Zapdos extends PokemonCard {
  public stage: Stage = Stage.BASIC;
  public cardType: CardType = CardType.LIGHTNING;
  public hp: number = 80;
  public weakness = [];
  public resistance = [{ type: CardType.FIGHTING, value: 30 }];
  public retreat = [CardType.COLORLESS, CardType.COLORLESS];
  public attacks = [
    {
      name: 'Thunderstorm',
      cost: [CardType.LIGHTNING, CardType.LIGHTNING, CardType.LIGHTNING, CardType.LIGHTNING],
      damage: 40,
      text: 'For each of your opponent\'s Benched Pokémon, flip a coin. If heads, this attack does 20 damage to that Pokémon. (Don\'t apply Weakness and Resistance for Benched Pokémon.) Then, Zapdos does 10 damage times the number of tails to itself.'
    }
  ];

  public set: string = 'FO';

  public cardImage: string = 'assets/cardback.png';

  public setNumber: string = '54';

  public name: string = 'Zapdos';

  public fullName: string = 'Zapdos FO';

  public reduceEffect(store: StoreLike, state: State, effect: Effect): State {
    if (effect instanceof AttackEffect && effect.attack === this.attacks[0]) {
      // Implement Thunderstorm logic
    }
    return state;
  }
}
