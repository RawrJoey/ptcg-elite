import { ChoosePokemonPrompt, GameMessage, PlayerType, SlotType, State, StateUtils, StoreLike } from '../../game';
import { CardType, SpecialCondition, Stage } from '../../game/store/card/card-types';
import { PokemonCard } from '../../game/store/card/pokemon-card';
import { AddSpecialConditionsEffect, PutDamageEffect } from '../../game/store/effects/attack-effects';
import { Effect } from '../../game/store/effects/effect';
import { AttackEffect } from '../../game/store/effects/game-effects';


export class Espurr extends PokemonCard {

  public stage: Stage = Stage.BASIC;

  public cardType: CardType = CardType.PSYCHIC;

  public hp: number = 60;

  public weakness = [{ type: CardType.PSYCHIC }];

  public retreat = [CardType.COLORLESS];

  public attacks = [
    {
      name: 'Caturday',
      cost: [CardType.COLORLESS],
      damage: 0,
      text: 'Draw a card. If you do, this Pokémon is now Asleep.'
    },
    {
      name: 'Ear Kinesis',
      cost: [CardType.PSYCHIC],
      damage: 0,
      text: 'This attack does 20 damage to 1 of your opponent\'s Benched Pokémon for each damage counter on that Pokémon. (Don\'t apply Weakness and Resistance for Benched Pokémon.)'
    }
  ];
  public set: string = 'UNB';

  public cardImage: string = 'assets/cardback.png';

  public setNumber: string = '79';

  public name: string = 'Espurr';

  public fullName: string = 'Espurr UNB';

  public reduceEffect(store: StoreLike, state: State, effect: Effect): State {

    if (effect instanceof AttackEffect && effect.attack === this.attacks[0]) {
      const player = effect.player;
      player.deck.moveTo(player.hand, 1);

      const asleepEffect = new AddSpecialConditionsEffect(effect, [SpecialCondition.ASLEEP]);
      asleepEffect.target = player.active;
      store.reduceEffect(state, asleepEffect);

      return state;
    }

    if (effect instanceof AttackEffect && effect.attack === this.attacks[1]) {
      const player = effect.player;
      const opponent = StateUtils.getOpponent(state, player);
      const hasBench = opponent.bench.some(b => b.cards.length > 0);

      if (!hasBench) {
        return state;
      }

      return store.prompt(state, new ChoosePokemonPrompt(
        player.id,
        GameMessage.CHOOSE_POKEMON_TO_DAMAGE,
        PlayerType.TOP_PLAYER,
        [SlotType.BENCH],
        { min: 1, max: 1, allowCancel: false }
      ), selected => {
        const targets = selected || [];
        targets.forEach(target => {
          const damageEffect = new PutDamageEffect(effect, 2 * target.damage);
          damageEffect.target = target;
          store.reduceEffect(state, damageEffect);
        });

        return state;
      });
    }

    return state;
  }

}
