import { PokemonCard } from '../../game/store/card/pokemon-card';
import { Stage, CardType } from '../../game/store/card/card-types';
import { PowerType, StoreLike, State, GameError, GameMessage,
  ChooseCardsPrompt} from '../../game';
import { Effect } from '../../game/store/effects/effect';
import { PowerEffect } from '../../game/store/effects/game-effects';
import { PlayPokemonEffect } from '../../game/store/effects/play-card-effects';
import { EndTurnEffect } from '../../game/store/effects/game-phase-effects';

export class Kirlia extends PokemonCard {

  public stage: Stage = Stage.STAGE_1;

  public evolvesFrom = 'Ralts';

  public regulationMark = 'F';

  public cardType: CardType = CardType.PSYCHIC;

  public hp: number = 80;

  public weakness = [{ type: CardType.METAL }];

  public retreat = [ CardType.COLORLESS, CardType.COLORLESS ];

  public powers = [{
    name: 'Refinement',
    useWhenInPlay: true,
    powerType: PowerType.ABILITY,
    text: 'You must discard a card from your hand in order to use ' +
      'this Ability. Once during your turn, you may draw 2 cards.'
  }];

  public attacks = [
    {
      name: 'Slap',
      cost: [ CardType.PSYCHIC, CardType.COLORLESS ],
      damage: 30,
      text: '   '
    }
  ];

  public set: string = 'SIT';

  public set2: string = 'silvertempest';

  public setNumber: string = '68';

  public name: string = 'Kirlia';

  public fullName: string = 'Kirlia SIT';

  public readonly REFINEMENT_MARKER = 'REFINEMENT_MARKER';

  public reduceEffect(store: StoreLike, state: State, effect: Effect): State {
    if (effect instanceof PlayPokemonEffect && effect.pokemonCard === this) {
      const player = effect.player;
      player.marker.removeMarker(this.REFINEMENT_MARKER, this);
    }

    if (effect instanceof PowerEffect && effect.power === this.powers[0]) {
      const player = effect.player;
      if (player.hand.cards.length === 0) {
        throw new GameError(GameMessage.CANNOT_USE_POWER);
      }
      if (player.marker.hasMarker(this.REFINEMENT_MARKER, this)) {
        throw new GameError(GameMessage.POWER_ALREADY_USED);
      }
      state = store.prompt(state, new ChooseCardsPrompt(
        player.id,
        GameMessage.CHOOSE_CARD_TO_DISCARD,
        player.hand,
        { },
        { allowCancel: true, min: 1, max: 1 }
      ), cards => {
        cards = cards || [];
        if (cards.length === 0) {
          return;
        }
        player.marker.addMarker(this.REFINEMENT_MARKER, this);
        player.hand.moveCardsTo(cards, player.discard);
        player.deck.moveTo(player.hand, 2);
      });

      return state;
    }

    if (effect instanceof EndTurnEffect) {
      effect.player.marker.removeMarker(this.REFINEMENT_MARKER, this);
    }

    return state;
  }

}
