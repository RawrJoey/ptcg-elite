import { PokemonCard } from '../../game/store/card/pokemon-card';
import { Stage, CardType } from '../../game/store/card/card-types';
import { StoreLike } from '../../game/store/store-like';
import { State } from '../../game/store/state/state';
import { Effect } from '../../game/store/effects/effect';
import { PowerEffect } from '../../game/store/effects/game-effects';
import { PowerType } from '../../game/store/card/pokemon-types';
import { GameMessage } from '../../game/game-message';
import { EndTurnEffect } from '../../game/store/effects/game-phase-effects';
import { GameError } from '../../game/game-error';
import { PokemonCardList } from '../..';

export class Gengar extends PokemonCard {

  public stage: Stage = Stage.STAGE_2;

  public evolvesFrom = 'Haunter';

  public cardType: CardType = CardType.PSYCHIC;

  public hp: number = 120;

  public weakness = [{ type: CardType.DARK }];

  public resistance = [{ type: CardType.FIGHTING, value: -30 }];

  public retreat = [ CardType.COLORLESS, CardType.COLORLESS ];

  public powers = [{
    name: 'Netherworld Gate',
    useFromDiscard: true,
    powerType: PowerType.ABILITY,
    text: 'Once during your turn, if this Pokémon is in your discard pile, you may put it onto your Bench. If you do, put 3 damage counters on this Pokémon.'
  }];

  public attacks = [{
    name: 'Screaming Circle',
    cost: [ CardType.PSYCHIC ],
    damage: 0,
    text: 'Put 2 damage counters on your opponent\'s Active Pokémon for each of your opponent\'s Benched Pokémon.'
  }];

  public regulationMark = 'G';

  public set: string = 'LOR';

  public set2: string = 'lostorigin';

  public setNumber: string = '66';

  public name: string = 'Gengar';

  public fullName: string = 'Gengar LOR';

  public readonly NETHERWORLD_GATE_MARKER = 'NETHERWORLD_GATE_MARKER';

  public reduceEffect(store: StoreLike, state: State, effect: Effect): State {

    if (effect instanceof PowerEffect && effect.power === this.powers[0]) {
      const player = effect.player;
      const slots: PokemonCardList[] = player.bench.filter(b => b.cards.length === 0);

      // Check if card is in the discard
      if (!player.discard.cards.includes(this)) {
        throw new GameError(GameMessage.CANNOT_USE_POWER);
      }

      // Power already used
      if (player.marker.hasMarker(this.NETHERWORLD_GATE_MARKER, this)) {
        throw new GameError(GameMessage.POWER_ALREADY_USED);
      }

      // No open slots, throw error
      if (slots.length === 0) {
        throw new GameError(GameMessage.CANNOT_PLAY_THIS_CARD);
      }
      // Add Marker
      player.marker.addMarker(this.NETHERWORLD_GATE_MARKER, this);

      const cards = player.discard.cards.filter(c => c === this);
      cards.forEach(card => {
        player.discard.moveCardTo(card, slots[0]); // Move to Bench
        slots[0].damage += 30; // Add 30 damage
      });

      if (effect instanceof EndTurnEffect) {
        effect.player.marker.removeMarker(this.NETHERWORLD_GATE_MARKER, this);
      }

      return state;
    }

    return state;
  }
}