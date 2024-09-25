import { CardType, Stage } from '../../game/store/card/card-types';
import { PokemonCard } from '../../game/store/card/pokemon-card';
import { PowerType } from '../../game/store/card/pokemon-types';
import { CheckRetreatCostEffect } from '../../game/store/effects/check-effects';
import { Effect } from '../../game/store/effects/effect';
import { AttackEffect, PowerEffect } from '../../game/store/effects/game-effects';
import { StateUtils } from '../../game/store/state-utils';
import { State } from '../../game/store/state/state';
import { StoreLike } from '../../game/store/store-like';

export class Dragonite extends PokemonCard {
  public stage: Stage = Stage.STAGE_2;
  public evolvesFrom = 'Dragonair';
  public cardType: CardType = CardType.DRAGON;
  public hp: number = 180;
  public weakness = [{ type: CardType.FAIRY }];
  public resistance = [];
  public retreat = [CardType.COLORLESS, CardType.COLORLESS, CardType.COLORLESS];

  public powers = [{
    name: 'Jet Cruise',
    powerType: PowerType.ABILITY,
    text: 'Your Pokémon in play have no Retreat Cost.'
  }];
  public attacks = [{
    name: 'Dragon Pulse',
    cost: [CardType.WATER, CardType.LIGHTNING],
    damage: 180,
    text: 'Discard the top 2 cards of your deck.'
  }];

  public set: string = 'MEW';
  public name: string = 'Dragonite';
  public fullName: string = 'Dragonite MEW';
  public cardImage: string = 'assets/cardback.png';
  public setNumber: string = '149';


  public reduceEffect(store: StoreLike, state: State, effect: Effect): State {

    if (effect instanceof AttackEffect && effect.attack === this.attacks[0]) {
      const player = effect.player;

      // Discard 2 cards from your deck 
      player.deck.moveTo(player.discard, 2);
      return state;
    }
    
    if (effect instanceof CheckRetreatCostEffect) {
      const player = effect.player
      const cardList = StateUtils.findCardList(state, this);
      const owner = StateUtils.findOwner(state, cardList);
      
      if (player === owner) {
                
        try {
          const stub = new PowerEffect(player, {
            name: 'test',
            powerType: PowerType.ABILITY,
            text: ''
          }, this);
          store.reduceEffect(state, stub);
        } catch {
          return state;
        }
        
        effect.cost = [];        
      }
      
      return state;
    }
    
    return state;
  }
}