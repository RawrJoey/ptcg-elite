import { PokemonCard } from '../../game/store/card/pokemon-card';
import { Stage, CardType, CardTag, SpecialCondition } from '../../game/store/card/card-types';
import { StoreLike, State, PowerType, StateUtils, GameError, GameMessage, PlayerType } from '../../game';
import { AttackEffect, PowerEffect } from '../../game/store/effects/game-effects';
import { Effect } from '../../game/store/effects/effect';
import { EndTurnEffect } from '../../game/store/effects/game-phase-effects';
import { PlayPokemonEffect } from '../../game/store/effects/play-card-effects';

export class EnteiV extends PokemonCard {

  public tags = [ CardTag.POKEMON_V ];

  public regulationMark = 'F';

  public stage: Stage = Stage.BASIC;

  public cardType: CardType = CardType.FIRE;

  public hp: number = 230;

  public weakness = [{ type: CardType.WATER }];

  public retreat = [ CardType.COLORLESS, CardType.COLORLESS, CardType.COLORLESS ];

  public powers = [{
    name: 'Fleet-Footed',
    useWhenInPlay: true,
    powerType: PowerType.ABILITY,
    text: 'Once during your turn, if this Pokémon is in the Active Spot, ' +
    'you may draw a card.'
  }];

  public attacks = [
    {
      name: 'Burning Rondo',
      cost: [ CardType.FIRE, CardType.COLORLESS ],
      damage: 20,
      text: 'This attack does 20 more damage for each Benched ' +
      'Pokémon (both yours and your opponent\'s).'
    }
  ];

  public set: string = 'BRS';

  public cardImage: string = 'assets/cardback.png';

  public setNumber: string = '22';

  public name: string = 'Entei V';

  public fullName: string = 'Entei V BRS';

  public readonly FLEET_FOOTED_MARKER = 'FLEET_FOOTED_MARKER';


  public reduceEffect(store: StoreLike, state: State, effect: Effect): State {

    if (effect instanceof PlayPokemonEffect && effect.pokemonCard === this) {
      const player = effect.player;
      player.marker.removeMarker(this.FLEET_FOOTED_MARKER, this);
    }
      
    if (effect instanceof EndTurnEffect) {
      const player = effect.player;
      player.marker.removeMarker(this.FLEET_FOOTED_MARKER, this);
    }


    if (effect instanceof PowerEffect && effect.power === this.powers[0]) {
      
      const player = effect.player;
      if (player.marker.hasMarker(this.FLEET_FOOTED_MARKER, this)) {
        throw new GameError(GameMessage.POWER_ALREADY_USED);
      }

      if (player.active.cards[0] !== this) {
        return state; // Not active
      }
      // Draw a card
      player.deck.moveTo(player.hand, 1);
      player.marker.addMarker(this.FLEET_FOOTED_MARKER, this);

      player.forEachPokemon(PlayerType.BOTTOM_PLAYER, cardList => {
        if (cardList.getPokemonCard() === this) {
          cardList.addSpecialCondition(SpecialCondition.ABILITY_USED);
        }
      });

    }
    if (effect instanceof EndTurnEffect) {

      effect.player.forEachPokemon(PlayerType.BOTTOM_PLAYER, player => {
        if (player instanceof EnteiV) {
          player.marker.removeMarker(this.FLEET_FOOTED_MARKER);
        }
        return state;
      });
    }
      
    if (effect instanceof AttackEffect && effect.attack === this.attacks[0]) {

      const player = effect.player;
      const opponent = StateUtils.getOpponent(state, player);
    
      const playerBenched = player.bench.reduce((left, b) => left + (b.cards.length ? 1 : 0), 0);
      const opponentBenched = opponent.bench.reduce((left, b) => left + (b.cards.length ? 1 : 0), 0);
      
      const totalBenched = playerBenched + opponentBenched;
    
      effect.damage = 20 + totalBenched * 20;
    }
    return state;
  }
}