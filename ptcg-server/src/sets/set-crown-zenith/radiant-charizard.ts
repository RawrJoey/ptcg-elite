import { PokemonCard } from '../../game/store/card/pokemon-card';
import { Stage, CardType, CardTag } from '../../game/store/card/card-types';
import { PowerType, StoreLike, State, GameError, GameMessage, StateUtils } from '../../game';
import { Effect } from '../../game/store/effects/effect';
import { EndTurnEffect } from '../../game/store/effects/game-phase-effects';
import { CheckAttackCostEffect, CheckPokemonAttacksEffect, CheckProvidedEnergyEffect } from '../../game/store/effects/check-effects';
import { AttackEffect, PowerEffect, RetreatEffect } from '../../game/store/effects/game-effects';
import { AttachEnergyEffect, PlayPokemonEffect } from '../../game/store/effects/play-card-effects';

export class RadiantCharizard extends PokemonCard {

  public tags = [CardTag.RADIANT];

  public regulationMark = 'F';

  public stage: Stage = Stage.BASIC;

  public cardType: CardType = CardType.FIRE;

  public hp: number = 160;

  public weakness = [{ type: CardType.WATER }];

  public retreat = [CardType.COLORLESS, CardType.COLORLESS, CardType.COLORLESS];

  public powers = [{
    name: 'Excited Heart',
    powerType: PowerType.ABILITY,
    text: 'This Pokémon\'s attacks cost C less for each Prize card your opponent has taken.'
  }];

  public attacks = [
    {
      name: 'Combustion Blast',
      cost: [CardType.FIRE, CardType.COLORLESS, CardType.COLORLESS, CardType.COLORLESS, CardType.COLORLESS],
      damage: 250,
      text: 'During your next turn, this Pokémon can\'t use Combustion Blast.'
    }
  ];

  public set: string = 'CRZ';

  public cardImage: string = 'assets/cardback.png';

  public setNumber: string = '20';

  public name: string = 'Radiant Charizard';

  public fullName: string = 'Radiant Charizard CRZ';

  public readonly ATTACK_USED_MARKER = 'ATTACK_USED_MARKER';
  public readonly ATTACK_USED_2_MARKER = 'ATTACK_USED_2_MARKER';

  public reduceEffect(store: StoreLike, state: State, effect: Effect): State {

    if (effect instanceof PlayPokemonEffect) {
      const player = effect.player;
      // Check attack cost
      const checkCost = new CheckAttackCostEffect(player, this.attacks[0]);
      state = store.reduceEffect(state, checkCost);

      // Check attached energy
      const checkEnergy = new CheckProvidedEnergyEffect(player);
      state = store.reduceEffect(state, checkEnergy);
    }

    if (effect instanceof RetreatEffect) {
      const player = effect.player;
      // Check attack cost
      const checkCost = new CheckAttackCostEffect(player, this.attacks[0]);
      state = store.reduceEffect(state, checkCost);

      // Check attached energy
      const checkEnergy = new CheckProvidedEnergyEffect(player);
      state = store.reduceEffect(state, checkEnergy);
    }

    if (effect instanceof AttachEnergyEffect) {
      const player = effect.player;
      // Check attack cost
      const checkCost = new CheckAttackCostEffect(player, this.attacks[0]);
      state = store.reduceEffect(state, checkCost);

      // Check attached energy
      const checkEnergy = new CheckProvidedEnergyEffect(player);
      state = store.reduceEffect(state, checkEnergy);
    }

    if (effect instanceof EndTurnEffect && effect.player.attackMarker.hasMarker(this.ATTACK_USED_2_MARKER, this)) {
      effect.player.attackMarker.removeMarker(this.ATTACK_USED_MARKER, this);
      effect.player.attackMarker.removeMarker(this.ATTACK_USED_2_MARKER, this);
      console.log('marker cleared');
    }

    if (effect instanceof EndTurnEffect && effect.player.attackMarker.hasMarker(this.ATTACK_USED_MARKER, this)) {
      effect.player.attackMarker.addMarker(this.ATTACK_USED_2_MARKER, this);
      console.log('second marker added');
    }

    if (effect instanceof CheckAttackCostEffect) {
      const player = effect.player;
      const opponent = StateUtils.getOpponent(state, player);

      new CheckPokemonAttacksEffect(player);

      try {
        const powerEffect = new PowerEffect(opponent, this.powers[0], this);
        store.reduceEffect(state, powerEffect);
      } catch {
        return state;
      }

      const prizesTaken = 6 - opponent.getPrizeLeft();
      const index = effect.attack.cost.findIndex(c => c === CardType.COLORLESS);

      if (index !== -1) {
        this.attacks.forEach(attack => {
          attack.cost.splice(index, prizesTaken);
        });


        if (effect instanceof AttackEffect && effect.attack === this.attacks[0]) {

          // Check marker
          if (effect.player.attackMarker.hasMarker(this.ATTACK_USED_MARKER, this)) {
            console.log('attack blocked');
            throw new GameError(GameMessage.BLOCKED_BY_EFFECT);
          }
          effect.player.attackMarker.addMarker(this.ATTACK_USED_MARKER, this);
          console.log('marker added');
        }
        return state;
      }
    }
    return state;
  }


}