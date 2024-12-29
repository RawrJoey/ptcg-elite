import { StoreLike, State, GameError, GameMessage, PlayerType } from '../../game';
import { Stage, TrainerType } from '../../game/store/card/card-types';
import { TrainerCard } from '../../game/store/card/trainer-card';
import { Effect } from '../../game/store/effects/effect';
import { TrainerEffect } from '../../game/store/effects/play-card-effects';

export class MarysRequest extends TrainerCard {
  public trainerType: TrainerType = TrainerType.SUPPORTER;
  public set: string = 'UF';
  public cardImage: string = 'assets/cardback.png';
  public setNumber: string = '86';
  public name: string = 'Mary\'s Request';
  public fullName: string = 'Mary\'s Request UF';
  public text = 'Draw a card. If you don\'t have any Stage 2 Evolved Pokémon in play, draw 2 more cards.'

  public reduceEffect(store: StoreLike, state: State, effect: Effect): State {

    if (effect instanceof TrainerEffect && effect.trainerCard === this) {
      const player = effect.player;

      const supporterTurn = player.supporterTurn;

      if (supporterTurn > 0) {
        throw new GameError(GameMessage.SUPPORTER_ALREADY_PLAYED);
      }

      if (player.deck.cards.length === 0) {
        throw new GameError(GameMessage.CANNOT_PLAY_THIS_CARD);
      }

      player.deck.moveTo(player.hand, 1);

      let hasStage2: boolean = false;

      player.forEachPokemon(PlayerType.BOTTOM_PLAYER, (list, card, target) => {
        if (card.stage === Stage.STAGE_2) {
          hasStage2 = true;
          return;
        }
      });

      if (!hasStage2) {
        player.deck.moveTo(player.hand, Math.min(2, player.deck.cards.length));
      }

      player.supporter.moveCardTo(effect.trainerCard, player.discard);

    }

    return state;
  }
}