import { PokemonCard } from '../../game/store/card/pokemon-card';
import { Stage, CardType } from '../../game/store/card/card-types';
import { StoreLike } from '../../game/store/store-like';
import { State } from '../../game/store/state/state';
import { Effect } from '../../game/store/effects/effect';
import { PowerEffect } from '../../game/store/effects/game-effects';
import { PowerType } from '../../game/store/card/pokemon-types';
import { GameMessage } from '../../game/game-message';
import { GameError } from '../../game/game-error';
import { DiscardToHandEffect } from '../../game/store/effects/play-card-effects';

export class Exeggcute extends PokemonCard {

  public stage: Stage = Stage.BASIC;

  public cardType: CardType = CardType.GRASS;

  public hp: number = 30;

  public weakness = [{ type: CardType.FIRE }];

  public resistance = [{ type: CardType.WATER, value: -20 }];

  public retreat = [CardType.COLORLESS];

  public powers = [{
    name: 'Propagation',
    useFromDiscard: true,
    powerType: PowerType.ABILITY,
    text: 'Once during your turn (before your attack), if this Pokemon is in '
      + 'your discard pile, you may put this Pokemon into your hand.'
  }];

  public attacks = [{
    name: 'Seed Bomb',
    cost: [CardType.GRASS, CardType.COLORLESS],
    damage: 20,
    text: ''
  }];

  public set: string = 'PLF';

  public name: string = 'Exeggcute';

  public fullName: string = 'Exeggcute PLF';

  public cardImage: string = 'assets/cardback.png';

  public setNumber: string = '4';

  public reduceEffect(store: StoreLike, state: State, effect: Effect): State {

    if (effect instanceof PowerEffect && effect.power === this.powers[0]) {
      const player = effect.player;

      // Check if card is in the discard
      if (player.discard.cards.includes(this) === false) {
        throw new GameError(GameMessage.CANNOT_USE_POWER);
      }

      // Check if DiscardToHandEffect is prevented
      const discardEffect = new DiscardToHandEffect(player, this);
      store.reduceEffect(state, discardEffect);

      if (discardEffect.preventDefault) {
        return state;
      }

      player.discard.moveCardTo(this, player.hand);
      return state;
    }
    return state;
  }

}
