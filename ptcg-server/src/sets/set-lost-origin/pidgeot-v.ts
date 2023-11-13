/* eslint-disable indent */
import { PokemonCard } from '../../game/store/card/pokemon-card';
import { Stage, CardType } from '../../game/store/card/card-types';
import { PowerType, ShuffleDeckPrompt, State, StateUtils, StoreLike } from '../../game';
import { CardTag } from '../../game/store/card/card-types';
import { Effect } from '../../game/store/effects/effect';
import { AttackEffect, PowerEffect } from '../../game/store/effects/game-effects';

export class PidgeotV extends PokemonCard {

  public tags = [ CardTag.POKEMON_V ];

  public regulationMark = 'F';

  public stage: Stage = Stage.BASIC;

  public cardType: CardType = CardType.COLORLESS;

  public hp: number = 210;

  public weakness = [{ type: CardType.LIGHTNING }];

  public resistance = [{ type: CardType.FIGHTING, value: -30 }];

  public retreat = [ CardType.COLORLESS ];

  public powers = [{
    name: 'Vanishing Wings',
    powerType: PowerType.ABILITY,
    useWhenInPlay: true,
    text: 'Once during your turn, if this Pokémon is on your Bench, you may shuffle it and all attached cards into your deck.'
  }];

  public attacks = [
    {
      name: 'Flight Surf',
      cost: [ CardType.COLORLESS, CardType.COLORLESS, CardType.COLORLESS ],
      damage: 80,
      text: 'If you have a Stadium in play, this attack does 80 more damage.'
    }
  ];

  public set: string = 'LOR';

  public set2: string = 'lostorigin';

  public setNumber: string = '137';

  public name: string = 'Pidgeot V';

  public fullName: string = 'Pidgeot V LOR';

  // Implement ability
  public reduceEffect(store: StoreLike, state: State, effect: Effect): State {

    if (effect instanceof PowerEffect && effect.power === this.powers[0]) {
        const player = effect.player;

        if (player.active.cards[0] !== this) {
        
                const cardList = player.bench.find(c => c.cards.includes(this));

                if (cardList) {
                  cardList.moveTo(player.deck);
                  cardList.clearEffects();
                }
            
                state = store.prompt(state, new ShuffleDeckPrompt(player.id), order => {
                    player.deck.applyOrder(order);
          });
          return state;
        }
        
        if (effect instanceof AttackEffect && effect.attack === this.attacks[0]) {

            const stadiumCard = StateUtils.getStadiumCard(state);

            if (stadiumCard && stadiumCard.id === effect.player.id) {
              effect.damage += 80; 
            }
          
          }
          return state;
        }
        return state;
    }
}