import { PokemonCard } from '../../game/store/card/pokemon-card';
import { Stage, CardType, SpecialCondition } from '../../game/store/card/card-types';
import { PowerType } from '../../game/store/card/pokemon-types';
import { StoreLike } from '../../game/store/store-like';
import { State } from '../../game/store/state/state';
import { Effect } from '../../game/store/effects/effect';
import { EvolveEffect, PowerEffect } from '../../game/store/effects/game-effects';
import { GameError } from '../../game/game-error';
import { GameMessage } from '../../game/game-message';
import { PlayerType } from '../../game';
import { EndTurnEffect } from '../../game/store/effects/game-phase-effects';

export class Zebstrika extends PokemonCard {
  public stage: Stage = Stage.STAGE_1;
  public cardType: CardType = CardType.LIGHTNING;
  public hp: number = 110;
  public weakness = [{ type: CardType.FIGHTING }];
  public retreat = [CardType.COLORLESS];
  public evolvesFrom: string = 'Blitzle';

  public powers = [{
    name: 'Sprint',
    powerType: PowerType.ABILITY,
    useWhenInPlay: true,
    text: 'Once during your turn (before you attack), you may discard your hand and draw 4 cards.'
  }];

  public attacks = [{
    name: 'Head Bolt',
    cost: [CardType.LIGHTNING, CardType.COLORLESS],
    damage: 60,
    text: ''
  }];

  public set: string = 'LOT';
  public setNumber: string = '82';
  public name: string = 'Zebstrika';
  public fullName: string = 'Zebstrika LOT';
  public cardImage = 'assets/cardback.png';

  public readonly SPRINT_MARKER = 'SPRINT_MARKER';

  public reduceEffect(store: StoreLike, state: State, effect: Effect): State {

    if (effect instanceof EvolveEffect && effect.pokemonCard === this) {
      const player = effect.player;
      player.marker.removeMarker(this.SPRINT_MARKER, this);
    }

    if (effect instanceof EndTurnEffect) {
      const player = effect.player;
      player.marker.removeMarker(this.SPRINT_MARKER, this);
    }

    if (effect instanceof PowerEffect && effect.power === this.powers[0]) {
      const player = effect.player;

      if (player.deck.cards.length === 0) {
        throw new GameError(GameMessage.CANNOT_USE_POWER);
      }

      if (player.marker.hasMarker(this.SPRINT_MARKER, this)) {
        throw new GameError(GameMessage.POWER_ALREADY_USED);
      }

      player.marker.addMarker(this.SPRINT_MARKER, this);

      player.forEachPokemon(PlayerType.BOTTOM_PLAYER, cardList => {
        if (cardList.getPokemonCard() === this) {
          cardList.addSpecialCondition(SpecialCondition.ABILITY_USED);
        }
      });

      const cards = player.hand.cards.filter(c => c !== this);
      player.hand.moveCardsTo(cards, player.discard);
      player.deck.moveTo(player.hand, 4);

    }

    return state;
  }
}