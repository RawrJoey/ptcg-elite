import { PokemonCard } from '../../game/store/card/pokemon-card';
import { Stage, CardType, SuperType, EnergyType } from '../../game/store/card/card-types';
import { StoreLike, State, ChooseCardsPrompt, GameMessage } from '../../game';
import { Effect } from '../../game/store/effects/effect';
import { AttackEffect } from '../../game/store/effects/game-effects';

export class Golduck extends PokemonCard {
  public stage: Stage = Stage.STAGE_1;
  public cardType: CardType = CardType.WATER;
  public hp: number = 90;
  public weakness = [{ type: CardType.GRASS }];
  public evolvesFrom = 'Psyduck';

  public attacks = [{
    name: 'Scratch',
    cost: [CardType.COLORLESS],
    damage: 20,
    text: ''
  },
  {
    name: 'Double Jet',
    cost: [CardType.WATER],
    damage: 60,
    text: 'Discard up to 2 [W] Energy cards from your hand. This attack does 60 damage for each card you discarded in this way.'
  }];

  public set: string = 'SUM';
  public setNumber: string = '29';
  public cardImage: string = 'assets/cardback.png';
  public name: string = 'Golduck';
  public fullName: string = 'Golduck SUM';

  public reduceEffect(store: StoreLike, state: State, effect: Effect): State {

    if (effect instanceof AttackEffect && effect.attack === this.attacks[1]) {
      const player = effect.player;

      state = store.prompt(state, new ChooseCardsPrompt(
        player.id,
        GameMessage.CHOOSE_CARD_TO_DISCARD,
        player.hand,
        { superType: SuperType.ENERGY, energyType: EnergyType.BASIC, name: 'Water Energy' },
        { allowCancel: true, min: 0, max: 2 }
      ), cards => {
        cards = cards || [];

        effect.damage = cards.length * 60;

        player.hand.moveCardsTo(cards, player.discard);

        return state;

      });
    }

    return state;
  }
}