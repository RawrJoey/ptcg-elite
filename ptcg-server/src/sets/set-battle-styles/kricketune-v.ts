/* eslint-disable indent */
import { PokemonCard } from '../../game/store/card/pokemon-card';
import { Stage, CardType } from '../../game/store/card/card-types';
import { CoinFlipPrompt } from '../../game/store/prompts/coin-flip-prompt';
import { GameError, PowerType } from '../../game';
import { StoreLike } from '../../game/store/store-like';
import { State } from '../../game/store/state/state';
import { Effect } from '../../game/store/effects/effect';
import { GameMessage } from '../../game';
import { PlayPokemonEffect } from '../../game/store/effects/play-card-effects';
import { AttackEffect, PowerEffect } from '../../game/store/effects/game-effects';
import { CardTag } from '../../game/store/card/card-types';
import { EndTurnEffect } from '../../game/store/effects/game-phase-effects';

export class KricketuneV extends PokemonCard {

  public tags = [ CardTag.POKEMON_V ];

  public regulationMark = 'E';

  public stage: Stage = Stage.BASIC;

  public cardType: CardType = CardType.GRASS;

  public hp: number = 180;

  public weakness = [{ type: CardType.FIRE }];

  public retreat = [ CardType.COLORLESS ];

  public powers = [{
    name: 'Exciting Stage',
    useWhenInPlay: true,
    powerType: PowerType.ABILITY,
    text: 'Once during your turn, , you may draw cards until you have ' +
      '3 cards in your hand. If this Pokémon is in the Active Spot, ' +
      'you may draw cards until you have 4 cards in your hand ' +
      'instead. You can’t use more than 1 Exciting Stage Ability ' +
      'each turn.'
  }];

  public attacks = [
    {
      name: 'X-Scissor',
      cost: [ CardType.GRASS, CardType.COLORLESS, CardType.COLORLESS ],
      damage: 80,
      text: 'Flip a coin. If heads, this attack does 80 more damage.' +
      ''
    }
  ];

  public set: string = 'BST';

  public cardImage: string = 'assets/cardback.png';

  public setNumber: string = '6';

  public name: string = 'Kricketune V';

  public fullName: string = 'Kricketune V BST';

  public readonly EXCITING_STAGE_MARKER = 'EXCITING_STAGE_MARKER';

  public reduceEffect(store: StoreLike, state: State, effect: Effect): State {
    if (effect instanceof PlayPokemonEffect && effect.pokemonCard === this) {
      const player = effect.player;
      player.marker.removeMarker(this.EXCITING_STAGE_MARKER, this);
    }
    
    if (effect instanceof EndTurnEffect) {
      const player = effect.player;
      player.marker.removeMarker(this.EXCITING_STAGE_MARKER, this);
    }
    
    if (effect instanceof PowerEffect && effect.power === this.powers[0]) {
      const player = effect.player;
      if (player.marker.hasMarker(this.EXCITING_STAGE_MARKER)) {
        throw new GameError(GameMessage.POWER_ALREADY_USED);
      }
  
      player.marker.addMarker(this.EXCITING_STAGE_MARKER, this);
      if (player.active.getPokemonCard() === this) {
        while (player.hand.cards.length < 4) {
          player.deck.moveTo(player.hand, 1);
        }
      } else {
        while (player.hand.cards.length < 3) {
          player.deck.moveTo(player.hand, 1);
        }
      }
  
      return state;
    }


    
    if (effect instanceof AttackEffect && effect.attack === this.attacks[0]) {
      const player = effect.player;
      return store.prompt(state, [
        new CoinFlipPrompt(player.id, GameMessage.COIN_FLIP)
      ], (results: boolean[]) => {
        let heads: number = 0;
        results.forEach(r => { heads += r ? 1 : 0; });
        effect.damage += 80 * heads;
        return state;
      });
    } 
    
    return state;
  }
}