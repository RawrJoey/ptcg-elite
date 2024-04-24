import { PokemonCard } from '../../game/store/card/pokemon-card';
import { Stage, CardType } from '../../game/store/card/card-types';
import { StoreLike, State, StateUtils, GameError, GameMessage } from '../../game';
import { AttackEffect, RetreatEffect } from '../../game/store/effects/game-effects';
import { Effect } from '../../game/store/effects/effect';
import { EndTurnEffect } from '../../game/store/effects/game-phase-effects';

export class Luxio extends PokemonCard {

  public stage: Stage = Stage.STAGE_1;

  public evolvesFrom: string = 'Shinx';

  public regulationMark = 'H';

  public cardType: CardType = CardType.LIGHTNING;

  public hp: number = 90;

  public weakness = [{ type: CardType.FIGHTING }];

  public resistance = [ ];

  public retreat = [ CardType.COLORLESS ];

  public attacks = [
    {
      name: 'Big Bite',
      cost: [ CardType.LIGHTNING, CardType.LIGHTNING ],
      damage: 60,
      text: 'During your opponent\'s next turn, the Defending Pokémon can\'t retreat.'
    }
  ];

  public set: string = 'SV6';

  public cardImage: string = 'assets/cardback.png';

  public setNumber: string = '40';

  public name: string = 'Luxio';

  public fullName: string = 'Luxio SV6';

  public readonly MEAN_LOOK_MARKER = 'MEAN_LOOK_MARKER';

  public reduceEffect(store: StoreLike, state: State, effect: Effect): State {

    // Mean Look
    if (effect instanceof AttackEffect && effect.attack === this.attacks[0]) {
      const player = effect.player;
      const opponent = StateUtils.getOpponent(state, player);
      opponent.active.marker.addMarker(this.MEAN_LOOK_MARKER, this);
    }
        
    if (effect instanceof RetreatEffect && effect.player.active.marker.hasMarker(this.MEAN_LOOK_MARKER, this)) {
      throw new GameError(GameMessage.BLOCKED_BY_EFFECT);
    }
        
    if (effect instanceof EndTurnEffect) {
      effect.player.active.marker.removeMarker(this.MEAN_LOOK_MARKER, this);
    }

    return state;
  }

}
