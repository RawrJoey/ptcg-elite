import { PokemonCard } from '../../game/store/card/pokemon-card';
import { Stage, CardType } from '../../game/store/card/card-types';
import { PowerType, State, StateUtils, StoreLike } from '../../game';
import { Effect } from '../../game/store/effects/effect';
import { AttackEffect } from '../../game/store/effects/game-effects';
import { AttachEnergyEffect } from '../../game/store/effects/play-card-effects';

export class Minior extends PokemonCard {
    
  public stage: Stage = Stage.BASIC;
  
  public cardType: CardType = CardType.FIGHTING;
  
  public hp: number = 70;
  
  public weakness = [{ type: CardType.GRASS }];

  public retreat: CardType[] = [CardType.COLORLESS, CardType.COLORLESS];

  public powers = [{
    name: 'Far-Flying Meteor',
    powerType: PowerType.ABILITY, 
    text: 'Once during your turn, if this Pokémon is on your Bench, when you attach an Energy card from your hand to this Pokémon, you may switch it with your Active Pokémon.'
  }];

  public attacks = [{
    name: 'Gravitational Tackle',
    cost: [CardType.COLORLESS],
    damage: 20,
    text: 'This attack does 20 damage for each [C] in your opponent\'s Active Pokémon\'s Retreat Cost.'
  }];

  public regulationMark = 'G';

  public set: string = 'PAR';

  public set2: string = 'paradoxrift';

  public setNumber: string = '99';

  public name: string = 'Minior';

  public fullName: string = 'Minior PAR';

  public reduceEffect(store: StoreLike, state: State, effect: Effect): State {

    if (effect instanceof AttackEffect && effect.attack === this.attacks[0]) {
      const player = effect.player;
      const opponent = StateUtils.getOpponent(state, player);
  
      const opponentActiveCard = opponent.active.getPokemonCard();
      if (opponentActiveCard) {
        const retreatCost = opponentActiveCard.retreat.filter(c => c === CardType.COLORLESS).length;
  
        effect.damage = retreatCost * 20;
  
        return state;
      }

      if (effect instanceof AttachEnergyEffect && effect.target.cards == this) {
        const player = effect.player;

        player.switchPokemon(player.active);

        return state;
      }

    }
    return state;
  }

}

