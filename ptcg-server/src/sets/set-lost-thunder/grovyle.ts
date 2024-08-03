import { PokemonCard } from '../../game/store/card/pokemon-card';
import { Stage, CardType, SuperType } from '../../game/store/card/card-types';
import { ChooseCardsPrompt, GameError, GameMessage, PlayerType, PowerType, ShuffleDeckPrompt, State, StoreLike } from '../../game';
import { Effect } from '../../game/store/effects/effect';
import { PlayPokemonEffect } from '../../game/store/effects/play-card-effects';
import { EndTurnEffect } from '../../game/store/effects/game-phase-effects';
import { PowerEffect } from '../../game/store/effects/game-effects';

export class Grovyle extends PokemonCard {
  public stage: Stage = Stage.STAGE_1;
  public evolvesFrom = 'Treecko';
  public cardType: CardType = CardType.GRASS;
  public hp: number = 80;
  public weakness = [{ type: CardType.FIRE }];
  public retreat = [CardType.COLORLESS, CardType.COLORLESS, CardType.COLORLESS];
  public powers = [{
    name: 'Sunshine Grace',
    useWhenInPlay: true,
    powerType: PowerType.ABILITY,
    text: 'Once during your turn, you may search your deck for a [G] Pokémon, reveal it, and put it into your hand. Shuffle your deck afterward.'
  }];
  public attacks = [
    {
      name: 'Slicing Blade',
      cost: [CardType.GRASS, CardType.GRASS],
      damage: 40,
      text: ''
    }
  ];


  public set: string = 'LOT';
  public cardImage: string = 'assets/cardback.png';
  public setNumber: string = '21';
  public name: string = 'Grovyle';
  public fullName: string = 'Grovyle LOT';

  public readonly SUNSHINE_GRACE_MARKER = 'SUNSHINE_GRACE_MARKER';

  public reduceEffect(store: StoreLike, state: State, effect: Effect): State {
    if (effect instanceof PlayPokemonEffect && effect.pokemonCard === this) {
      const player = effect.player;
      player.marker.removeMarker(this.SUNSHINE_GRACE_MARKER, this);
    }

    if (effect instanceof EndTurnEffect) {
      const player = effect.player;
      player.marker.removeMarker(this.SUNSHINE_GRACE_MARKER, this);
    }

    if (effect instanceof PowerEffect && effect.power === this.powers[0]) {
      const player = effect.player;
      if (player.marker.hasMarker(this.SUNSHINE_GRACE_MARKER, this)) {
        throw new GameError(GameMessage.POWER_ALREADY_USED);
      }

      return store.prompt(state, new ChooseCardsPrompt(
        player.id,
        GameMessage.CHOOSE_CARD_TO_HAND,
        player.deck,
        { superType: SuperType.POKEMON, cardType: CardType.GRASS },
        { min: 0, max: 1, allowCancel: true }
      ), cards => {
        player.deck.moveCardsTo(cards, player.hand);

        return store.prompt(state, new ShuffleDeckPrompt(player.id), order => {
          player.deck.applyOrder(order);
          player.marker.addMarker(this.SUNSHINE_GRACE_MARKER, this);
        });
      });
    }
    if (effect instanceof EndTurnEffect) {
      effect.player.forEachPokemon(PlayerType.BOTTOM_PLAYER, player => {
        if (player instanceof Grovyle) {
          player.marker.removeMarker(this.SUNSHINE_GRACE_MARKER);
        }
      });
      return state;
    }
    return state;
  }
}