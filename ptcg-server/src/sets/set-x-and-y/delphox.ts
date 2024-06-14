import { PokemonCard } from '../../game/store/card/pokemon-card';
import { Stage, CardType, SpecialCondition, EnergyType } from '../../game/store/card/card-types';
import { StoreLike, State, PowerType, PlayerType, GameMessage, GameError, EnergyCard } from '../../game';
import { Effect } from '../../game/store/effects/effect';
import { AttackEffect, PowerEffect } from '../../game/store/effects/game-effects';
import { PlayPokemonEffect } from '../../game/store/effects/play-card-effects';
import { EndTurnEffect } from '../../game/store/effects/game-phase-effects';

export class Delphox extends PokemonCard {
  public stage: Stage = Stage.STAGE_2;
  public evolvesFrom = 'Braixen';
  public cardType: CardType = CardType.FIRE;
  public hp: number = 80;
  public weakness = [{ type: CardType.WATER }];
  public retreat = [CardType.COLORLESS];

  public powers = [{
    name: 'Mystical Fire',
    useWhenInPlay: true,
    powerType: PowerType.ABILITY,
    text: 'Once during your turn (before your attack), you may draw cards until you have 6 cards in hand.'
  }];

  public attacks = [
    {
      name: 'Blaze Ball',
      cost: [CardType.COLORLESS, CardType.COLORLESS, CardType.COLORLESS],
      damage: 50,
      text: 'This attack does 20 more damage for each [R] Energy attached to this Pokemon.'
    }];

  public set: string = 'XY';
  public name: string = 'Delphox';
  public fullName: string = 'Delphox XY';
  public cardImage: string = 'assets/cardback.png';
  public setNumber: string = '26';

  public readonly MYSTICAL_FIRE_MARKER = 'MYSTICAL_FIRE_MARKER';


  public reduceEffect(store: StoreLike, state: State, effect: Effect): State {

    if (effect instanceof PlayPokemonEffect && effect.pokemonCard === this) {
      const player = effect.player;
      player.marker.removeMarker(this.MYSTICAL_FIRE_MARKER, this);
    }

    if (effect instanceof EndTurnEffect) {
      const player = effect.player;
      player.marker.removeMarker(this.MYSTICAL_FIRE_MARKER, this);
    }


    if (effect instanceof PowerEffect && effect.power === this.powers[0]) {
      const player = effect.player;
      if (player.marker.hasMarker(this.MYSTICAL_FIRE_MARKER, this)) {
        throw new GameError(GameMessage.POWER_ALREADY_USED);
      }

      while (player.hand.cards.length < 6) {
        player.deck.moveTo(player.hand, 1);
      }
      player.marker.addMarker(this.MYSTICAL_FIRE_MARKER, this);

      player.forEachPokemon(PlayerType.BOTTOM_PLAYER, cardList => {
        if (cardList.getPokemonCard() === this) {
          cardList.addSpecialCondition(SpecialCondition.ABILITY_USED);
        }
      });
    }

    if (effect instanceof AttackEffect && effect.attack === this.attacks[0]) {
      const player = effect.player;
      const pokemon = player.active;

      let fireEnergyCount = 0;

      pokemon.cards.forEach(c => {
        if (c instanceof EnergyCard) {
          if (c.energyType === EnergyType.BASIC && c.name == 'Fire Energy') {
            fireEnergyCount++;
          }
        }
      });
      effect.damage += fireEnergyCount * 20;
    }

    return state;
  }
}