import { PokemonCard } from '../../game/store/card/pokemon-card';
import { Stage, CardType, SpecialCondition } from '../../game/store/card/card-types';
import { StoreLike, State, PowerType, CardList, GameError, GameMessage, PlayerType } from '../../game';
import { Effect } from '../../game/store/effects/effect';
import { PowerEffect } from '../../game/store/effects/game-effects';
import { EndTurnEffect } from '../../game/store/effects/game-phase-effects';
import { PlayPokemonEffect } from '../../game/store/effects/play-card-effects';
import { ConfirmCardsPrompt } from '../../game/store/prompts/confirm-cards-prompt';

export class Morpeko extends PokemonCard {

  public stage: Stage = Stage.BASIC;

  public regulationMark = 'H';

  public cardType: CardType = CardType.LIGHTNING;

  public hp: number = 70;

  public weakness = [{ type: CardType.FIGHTING }];

  public resistance = [];

  public retreat = [CardType.COLORLESS];

  public powers = [
    {
      name: 'Snack Search',
      useWhenInPlay: true,
      powerType: PowerType.ABILITY,
      text: 'Once during your turn, you may look at the top card of your deck. You may discard that card.'
    }
  ];

  public attacks = [
    {
      name: 'Pick and Stick',
      cost: [CardType.LIGHTNING],
      damage: 0,
      text: 'Attach up to 2 Basic Energy cards from your discard pile to your Pokémon in any way you like.'
    }
  ];

  public set: string = 'TWM';

  public cardImage: string = 'assets/cardback.png';

  public setNumber: string = '72';

  public name: string = 'Morpeko';

  public fullName: string = 'Morpeko TWM';

  public readonly SNACK_SEARCH_MARKER = 'SNACK_SEARCH_MARKER';

  public reduceEffect(store: StoreLike, state: State, effect: Effect): State {

    if (effect instanceof EndTurnEffect) {
      const player = (effect as EndTurnEffect).player;
      player.marker.removeMarker(this.SNACK_SEARCH_MARKER, this);
    }

    if (effect instanceof PlayPokemonEffect && effect.pokemonCard === this) {
      const player = effect.player;

      player.marker.removeMarker(this.SNACK_SEARCH_MARKER, this);
      return state;
    }

    if (effect instanceof PowerEffect && effect.power === this.powers[0]) {
      const player = effect.player;

      if (player.deck.cards.length === 0) {
        throw new GameError(GameMessage.CANNOT_USE_POWER);
      }

      if (player.marker.hasMarker(this.SNACK_SEARCH_MARKER, this)) {
        throw new GameError(GameMessage.POWER_ALREADY_USED);
      }

      const deckTop = new CardList();
      player.deck.moveTo(deckTop, 1);
      player.marker.addMarker(this.SNACK_SEARCH_MARKER, this);

      player.forEachPokemon(PlayerType.BOTTOM_PLAYER, cardList => {
        if (cardList.getPokemonCard() === this) {
          cardList.addSpecialCondition(SpecialCondition.ABILITY_USED);
        }
      });

      return store.prompt(state, new ConfirmCardsPrompt(
        player.id,
        GameMessage.DISCARD_FROM_TOP_OF_DECK,
        deckTop.cards, // Fix error by changing toArray() to cards
        { allowCancel: true },
      ), selected => {

        if (selected !== null) {
          // Discard card
          deckTop.moveCardsTo(deckTop.cards, player.discard);
        } else {

          // Move back to the top of your deck
          deckTop.moveToTopOfDestination(player.deck);

        }
      });
    }
    return state;
  }
}