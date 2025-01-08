
import { StoreLike, State, GamePhase, StateUtils, ChooseCardsPrompt, GameMessage, GameError } from '../../game';
import { CardType, TrainerType } from '../../game/store/card/card-types';
import { TrainerCard } from '../../game/store/card/trainer-card';
import { Effect } from '../../game/store/effects/effect';
import { KnockOutEffect } from '../../game/store/effects/game-effects';
import { EndTurnEffect } from '../../game/store/effects/game-phase-effects';
import { TrainerEffect } from '../../game/store/effects/play-card-effects';

export class Diantha extends TrainerCard {
  public trainerType: TrainerType = TrainerType.SUPPORTER;

  public set: string = 'FLI';

  public cardImage: string = 'assets/cardback.png';

  public setNumber: string = '105';

  public name: string = 'Diantha';

  public fullName: string = 'Diantha FLI';

  public text: string =
    'You can play this card only if 1 of your [Y] Pokémon was Knocked Out during your opponent\'s last turn.' +
    'Put 2 cards from your discard pile into your hand.';

  public readonly DIANTHA_MARKER = 'DIANTHA_MARKER';

  public reduceEffect(store: StoreLike, state: State, effect: Effect): State {

    if (effect instanceof TrainerEffect && effect.trainerCard === this) {
      const player = effect.player;
      const supporterTurn = player.supporterTurn;

      // No Pokemon KO last turn
      if (!player.marker.hasMarker(this.DIANTHA_MARKER)) {
        throw new GameError(GameMessage.CANNOT_PLAY_THIS_CARD);
      }

      if (supporterTurn > 0) {
        throw new GameError(GameMessage.SUPPORTER_ALREADY_PLAYED);
      }

      if (player.discard.cards.length < 2) {
        throw new GameError(GameMessage.CANNOT_PLAY_THIS_CARD);
      }

      // We will discard this card after prompt confirmation
      player.hand.moveCardTo(effect.trainerCard, player.supporter);

      // This will prevent unblocked supporter to appear in the discard pile
      effect.preventDefault = true;

      state = store.prompt(state, new ChooseCardsPrompt(
        player,
        GameMessage.CHOOSE_CARD_TO_HAND,
        player.discard,
        {},
        { min: 2, max: 2, allowCancel: false }
      ), cards => {
        player.discard.moveCardsTo(cards, player.hand);
        player.supporter.moveCardTo(effect.trainerCard, player.discard);

        return state;
      });
    }

    if (effect instanceof KnockOutEffect && effect.target.getPokemonCard()?.cardType === CardType.FAIRY) {
      const player = effect.player;
      const opponent = StateUtils.getOpponent(state, player);
      const duringTurn = [GamePhase.PLAYER_TURN, GamePhase.ATTACK].includes(state.phase);

      // Do not activate between turns, or when it's not opponents turn.
      if (!duringTurn || state.players[state.activePlayer] !== opponent) {
        return state;
      }

      const cardList = StateUtils.findCardList(state, this);
      const owner = StateUtils.findOwner(state, cardList);
      if (owner === player) {
        effect.player.marker.addMarker(this.DIANTHA_MARKER, this);
      }
      return state;
    }

    if (effect instanceof EndTurnEffect) {
      const player = effect.player;
      const cardList = StateUtils.findCardList(state, this);
      const owner = StateUtils.findOwner(state, cardList);

      if (owner === player) {
        effect.player.marker.removeMarker(this.DIANTHA_MARKER);
      }
    }

    return state;
  }
}