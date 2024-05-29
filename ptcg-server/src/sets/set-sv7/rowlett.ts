import { PokemonCard } from '../../game/store/card/pokemon-card';
import { Stage, CardType } from '../../game/store/card/card-types';
import { StoreLike, State } from '../../game';
import { Effect } from '../../game/store/effects/effect';
import { AttackEffect } from '../../game/store/effects/game-effects';

export class Rowlett extends PokemonCard {

  public regulationMark = 'H';

  public stage: Stage = Stage.BASIC;

  public cardType: CardType = CardType.GRASS;

  public hp: number = 70;

  public weakness = [{ type: CardType.FIRE }];

  public retreat = [CardType.COLORLESS];

  public attacks = [
    {
      name: 'Collect',
      cost: [CardType.COLORLESS],
      damage: 0,
      text: 'Draw a card.'
    },
    {
      name: 'Leafage',
      cost: [CardType.GRASS],
      damage: 10,
      text: ''
    },
  ];

  public set: string = 'SV6a';

  public cardImage: string = 'assets/cardback.png';

  public setNumber: string = '3';

  public name: string = 'Rowlett';

  public fullName: string = 'Rowlett SV6a';

  public reduceEffect(store: StoreLike, state: State, effect: Effect): State {


    if (effect instanceof AttackEffect && effect.attack === this.attacks[0]) {
      const player = effect.player;
      player.deck.moveTo(player.hand, 1);
      return state;
    }
    
    return state;
  }
    
}
    