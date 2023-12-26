import { PokemonCard } from '../../game/store/card/pokemon-card';
import { Stage, CardType, SuperType, TrainerType } from '../../game/store/card/card-types';
import { StoreLike } from '../../game/store/store-like';
import { State } from '../../game/store/state/state';
import { Effect } from '../../game/store/effects/effect';
import { PowerEffect } from '../../game/store/effects/game-effects';
import { PowerType } from '../../game/store/card/pokemon-types';
import { GameError } from '../../game/game-error';
import { GameMessage } from '../../game/game-message';
import { EndTurnEffect } from '../../game/store/effects/game-phase-effects';
import { PlayPokemonEffect } from '../../game/store/effects/play-card-effects';
import { CardList } from '../../game/store/state/card-list';
import { ChooseCardsPrompt } from '../../game/store/prompts/choose-cards-prompt';


export class Altaria extends PokemonCard {

  public stage: Stage = Stage.STAGE_1;

  public evolvesFrom = 'Swablu';

  public cardType: CardType = CardType.DRAGON;

  public hp: number = 90;

  public retreat = [  ];

  public powers = [{
    name: 'Tempting Tune',
    useWhenInPlay: true,
    powerType: PowerType.ABILITY,
    text: 'Once during your turn, you may search your deck for a Supporter card, reveal it, shuffle your deck, then put that card on top of it.'
  }];

  public attacks = [{
    name: 'Glide',
    cost: [ CardType.WATER, CardType.METAL ],
    damage: 60,
    text: ''
  }];

  public set: string = 'EVS';

  public cardImage: string = 'assets/cardback.png';

  public setNumber: string = '106';

  public name: string = 'Altaria';

  public fullName: string = 'Altaria EVS';

  public readonly FOREWARN_MARKER = 'FOREWARN_MARKER';

  public reduceEffect(store: StoreLike, state: State, effect: Effect): State {

    if (effect instanceof PlayPokemonEffect && effect.pokemonCard === this) {
      const player = effect.player;
      player.marker.removeMarker(this.FOREWARN_MARKER, this);
    }

    if (effect instanceof PowerEffect && effect.power === this.powers[0]) {
      const player = effect.player;

      if (player.deck.cards.length === 0) {
        throw new GameError(GameMessage.CANNOT_USE_POWER);
      }

      if (player.marker.hasMarker(this.FOREWARN_MARKER, this)) {
        throw new GameError(GameMessage.POWER_ALREADY_USED);
      }
      player.marker.addMarker(this.FOREWARN_MARKER, this);

      const deckTop = new CardList();
      deckTop.cards = player.deck.cards;

      return store.prompt(state, new ChooseCardsPrompt(
        player.id,
        GameMessage.CHOOSE_CARD_TO_HAND,
        deckTop,
        { superType: SuperType.TRAINER, trainerType: TrainerType.SUPPORTER },
        { min: 0, max: 1, allowCancel: true }
      ), selected => {
        if (selected.length > 0) {
          const card = selected[0];
          player.deck.moveCardTo(card, player.deck);
        }
      });
    }

    if (effect instanceof EndTurnEffect) {
      effect.player.marker.removeMarker(this.FOREWARN_MARKER, this);
    }

    return state;
  }
}

