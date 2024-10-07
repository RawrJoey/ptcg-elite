import { PokemonCard } from '../../game/store/card/pokemon-card';
import { Stage, CardType } from '../../game/store/card/card-types';
import {
  StoreLike, State,
  StateUtils,
  PlayerType
} from '../../game';
import { AttackEffect } from '../../game/store/effects/game-effects';
import { Effect } from '../../game/store/effects/effect';
import { PutDamageEffect } from '../../game/store/effects/attack-effects';

export class TingLu extends PokemonCard {

  public regulationMark = 'H';

  public stage: Stage = Stage.BASIC;

  public cardType: CardType = CardType.FIGHTING;

  public hp: number = 140;

  public weakness = [{ type: CardType.GRASS }];

  public retreat = [CardType.COLORLESS, CardType.COLORLESS, CardType.COLORLESS];

  public attacks = [
    {
      name: 'Ground Crack',
      cost: [CardType.FIGHTING],
      damage: 30,
      text: 'If a Stadium is in play, this attack does 30 damage to each of your opponent\'s Benched Pokémon. Then, discard that Stadium. (Don\'t apply Weakness and Resistance for Benched Pokémon.)'
    },
    {
      name: 'Hammer In',
      cost: [CardType.FIGHTING, CardType.FIGHTING, CardType.COLORLESS],
      damage: 110,
      text: ''
    }
  ];

  public set: string = 'TWM';

  public cardImage: string = 'assets/cardback.png';

  public setNumber: string = '110';

  public name: string = 'Ting-Lu';

  public fullName: string = 'Ting-Lu TWM';

  public reduceEffect(store: StoreLike, state: State, effect: Effect): State {

    if (effect instanceof AttackEffect && effect.attack === this.attacks[0]) {

      const stadiumCard = StateUtils.getStadiumCard(state);
      if (stadiumCard == undefined) {
        return state;
      }
      // Discard Stadium
      const cardList = StateUtils.findCardList(state, stadiumCard);
      const owner = StateUtils.findOwner(state, cardList);
      const player = effect.player;
      const opponent = StateUtils.getOpponent(state, player);

      opponent.forEachPokemon(PlayerType.TOP_PLAYER, (cardList, card) => {
        if (cardList === opponent.active) {
          return;
        }
        const damageEffect = new PutDamageEffect(effect, 30);
        damageEffect.target = cardList;
        store.reduceEffect(state, damageEffect);
      });
      cardList.moveTo(owner.discard);
    }
    return state;
  }
}