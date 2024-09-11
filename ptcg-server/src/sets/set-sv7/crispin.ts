import { Effect } from '../../game/store/effects/effect';
import { State } from '../../game/store/state/state';
import { StoreLike } from '../../game/store/store-like';
import { TrainerCard } from '../../game/store/card/trainer-card';
import { EnergyType, SuperType, TrainerType } from '../../game/store/card/card-types';
import { GameError, GameMessage, PlayerType, AttachEnergyPrompt, SlotType, StateUtils, ChooseCardsPrompt, CardList, ShowCardsPrompt } from '../../game';
import { TrainerEffect } from '../../game/store/effects/play-card-effects';

export class Crispin extends TrainerCard {

  public regulationMark = 'H';

  public trainerType: TrainerType = TrainerType.SUPPORTER;

  public set: string = 'SV7';

  public cardImage: string = 'assets/cardback.png';

  public setNumber: string = '97';

  public name: string = 'Crispin';

  public fullName: string = 'Crispin SV7';

  public text: string =
    'Search your deck for up to 2 Basic Energy cards of different types, reveal them, put 1 in your hand, and attach the remaining Energy to your Pokémon in play. Then shuffle your deck.';

  public reduceEffect(store: StoreLike, state: State, effect: Effect): State {

    if (effect instanceof TrainerEffect && effect.trainerCard === this) {
      const player = effect.player;
      const opponent = StateUtils.getOpponent(state, player);

      const supporterTurn = player.supporterTurn;

      if (supporterTurn > 0) {
        throw new GameError(GameMessage.SUPPORTER_ALREADY_PLAYED);
      }

      player.hand.moveCardTo(effect.trainerCard, player.supporter);
      // We will discard this card after prompt confirmation
      effect.preventDefault = true;

      const cardList = new CardList();
      state = store.prompt(state, new ChooseCardsPrompt(
        player.id,
        GameMessage.CHOOSE_CARD_TO_HAND,
        player.deck,
        { superType: SuperType.ENERGY, energyType: EnergyType.BASIC },
        { min: 0, max: 2, allowCancel: false }
      ), selected => {
        const cards = selected || [];
        if (cards.length > 1) {
          if (cards[0].name === cards[1].name) {
            throw new GameError(GameMessage.CAN_ONLY_SELECT_TWO_DIFFERENT_ENERGY_TYPES);
          }
        }

        store.prompt(state, new ShowCardsPrompt(
          opponent.id,
          GameMessage.CARDS_SHOWED_BY_THE_OPPONENT,
          selected
        ), () => { });

        player.deck.moveCardsTo(cards, cardList);

        if (cardList.cards.length === 2) {
          state = store.prompt(state, new AttachEnergyPrompt(
            player.id,
            GameMessage.ATTACH_ENERGY_TO_ACTIVE,
            cardList,
            PlayerType.BOTTOM_PLAYER,
            [SlotType.BENCH, SlotType.ACTIVE],
            { superType: SuperType.ENERGY, energyType: EnergyType.BASIC },
            { allowCancel: false, min: 1, max: 1, differentTargets: true }
          ), transfers => {
            transfers = transfers || [];

            if (transfers.length === 0) {
              return;
            }

            for (const transfer of transfers) {
              const target = StateUtils.getTarget(state, player, transfer.to);
              cardList.moveCardTo(transfer.card, target);
            }

            // Move the remaining card to the player's hand
            const remainingCard = cardList.cards[0];
            cardList.moveCardTo(remainingCard, player.hand);
          });

        }

        if (cardList.cards.length === 1) {
          const remainingCard = cardList.cards[0];
          cardList.moveCardTo(remainingCard, player.hand);
        }

        player.supporter.moveCardTo(effect.trainerCard, player.discard);

      }
      );
    }
    return state;
  }
}