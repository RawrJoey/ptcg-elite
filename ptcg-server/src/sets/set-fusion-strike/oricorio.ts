import { PokemonCard } from '../../game/store/card/pokemon-card';
import { Stage, CardType, CardTag } from '../../game/store/card/card-types';
import { StoreLike } from '../../game/store/store-like';
import { State, GamePhase } from '../../game/store/state/state';
import { Effect } from '../../game/store/effects/effect';
import { PowerEffect, AttackEffect } from '../../game/store/effects/game-effects';
import { PutDamageEffect } from '../../game/store/effects/attack-effects';
import { PowerType } from '../../game/store/card/pokemon-types';
import { StateUtils } from '../../game/store/state-utils';

export class Oricorio extends PokemonCard {

  public tags = [ CardTag.FUSION_STRIKE ];

  public regulationMark = 'E';

  public stage: Stage = Stage.BASIC;

  public cardType: CardType = CardType.FIRE;

  public hp: number = 90;

  public weakness = [{ type: CardType.WATER }];

  public retreat = [ CardType.COLORLESS ];

  public powers = [{
    name: 'Bouffer',
    powerType: PowerType.ABILITY,
    text: 'Any damage done to this Pokemon by attacks is reduced by 20 ' +
      '(after applying Weakness and Resistance).'
  }];

  public attacks = [{
    name: 'Gold Breaker',
    cost: [ CardType.FIRE, CardType.COLORLESS ],
    damage: 0,
    text: 'Put 5 damage counters on your opponent\'s Pokémon in ' +
      'any way you like.'
  }];

  public set: string = 'FST';

  public name: string = 'Oricorio';

  public fullName: string = 'Oricorio FST';

  public reduceEffect(store: StoreLike, state: State, effect: Effect): State {

    if (effect instanceof AttackEffect && effect.attack === this.attacks[0]) {
      const player = effect.player;
      const opponent = StateUtils.getOpponent(state, player);

      const defending = opponent.active.getPokemonCard();
      if (defending && defending.tags.includes(CardTag.POKEMON_EX)) {
        effect.damage += 60;
      }
    }

    // Reduce damage by 20
    if (effect instanceof PutDamageEffect && effect.target.cards.includes(this)) {
      const pokemonCard = effect.target.getPokemonCard();

      // It's not this pokemon card
      if (pokemonCard !== this) {
        return state;
      }

      // It's not an attack
      if (state.phase !== GamePhase.ATTACK) {
        return state;
      }

      const player = StateUtils.findOwner(state, effect.target);

      // Try to reduce PowerEffect, to check if something is blocking our ability
      try {
        const powerEffect = new PowerEffect(player, this.powers[0], this);
        store.reduceEffect(state, powerEffect);
      } catch {
        return state;
      }
      
      if (effect.target.cards.some(c => c.tags.includes(CardTag.FUSION_STRIKE))) {
        effect.damage = Math.max(0, effect.damage - 20);
      }

      return state;
    }

    return state;
  }

}
