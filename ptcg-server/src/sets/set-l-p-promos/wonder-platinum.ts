import { Card, CardList, ChooseCardsPrompt, GameError, GameMessage, ShowCardsPrompt, State, StateUtils, StoreLike, SuperType, TrainerCard, TrainerType } from '../../game';
import { Effect } from '../../game/store/effects/effect';
import { TrainerEffect } from '../../game/store/effects/play-card-effects';

export class WonderPlatinum extends TrainerCard {

  public trainerType: TrainerType = TrainerType.ITEM;

  public set: string = 'DPt-P';

  public name: string = 'Wonder Platinum';

  public cardImage: string = 'assets/cardback.png';

  public setNumber: string = '33';

  public fullName: string = 'Wonder Platinum DPt-P';

  public text: string =
    'Look at all of your face-down Prize cards. You may choose 1 Energy card you find there, show it to your opponent, and put it into your hand. If you do, put this card as a Prize card face up instead of discarding it.';

  public reduceEffect(store: StoreLike, state: State, effect: Effect): State {
    if (effect instanceof TrainerEffect && effect.trainerCard === this) {
      const player = effect.player;
      const opponent = StateUtils.getOpponent(state, player);
      const prizes = player.prizes.filter(p => p.isSecret);

      if (prizes.length === 0) {
        throw new GameError(GameMessage.CANNOT_PLAY_THIS_CARD);
      }

      const cards: Card[] = [];
      prizes.forEach(p => { p.cards.forEach(c => cards.push(c)); });

      const blocked: number[] = [];

      player.prizes.forEach((c, index) => {
        if (c.faceUpPrize) {
          blocked.push(index);
        }
      });

      // Make prizes no more secret, before displaying prompt
      prizes.forEach(p => { p.isSecret = false; });

      // We will discard this card after prompt confirmation
      effect.preventDefault = true;
      player.hand.moveCardTo(effect.trainerCard, player.supporter);

      // state = store.prompt(state, new ChoosePrizePrompt(
      //   player.id,
      //   GameMessage.CHOOSE_POKEMON,
      //   { count: 1, blocked: blocked, allowCancel: true },
      // ), chosenPrize => {


      const allPrizeCards = new CardList();
      player.prizes.forEach(prizeList => {
        allPrizeCards.cards.push(...prizeList.cards);
      });

      store.prompt(state, new ChooseCardsPrompt(
        player.id,
        GameMessage.CHOOSE_CARD_TO_HAND,
        allPrizeCards,
        { superType: SuperType.ENERGY },
        { min: 0, max: 1, allowCancel: false, blocked: blocked }
      ), chosenPrize => {

        if (chosenPrize === null || chosenPrize.length === 0) {
          player.prizes.forEach(p => { p.isSecret = true; });
          player.supporter.moveCardTo(effect.trainerCard, player.discard);
          // player.prizes = this.shuffleFaceDownPrizeCards(player.prizes);
          return state;
        }

        const prizePokemon = chosenPrize[0];
        const hand = player.hand;
        const heavyBall = effect.trainerCard;

        // Find the prize list containing the chosen card
        const chosenPrizeList = player.prizes.find(prizeList => prizeList.cards.includes(prizePokemon));

        if (chosenPrize.length > 0) {
          state = store.prompt(state, new ShowCardsPrompt(
            opponent.id,
            GameMessage.CARDS_SHOWED_BY_THE_OPPONENT,
            chosenPrize
          ), () => { });
        }

        if (chosenPrizeList) {
          chosenPrizeList.moveCardTo(prizePokemon, hand);
          player.supporter.moveCardTo(heavyBall, chosenPrizeList);
        }

        player.prizes.forEach(p => { p.isSecret = true; });
        // player.prizes = this.shuffleFaceDownPrizeCards(player.prizes);

        return state;

      });
    }

    return state;
  }
}

//   shuffleFaceDownPrizeCards(array: CardList[]): CardList[] {

//     const faceDownPrizeCards = array.filter(p => p.isSecret && p.cards.length > 0);

//     for (let i = faceDownPrizeCards.length - 1; i > 0; i--) {
//       const j = Math.floor(Math.random() * (i + 1));
//       const temp = faceDownPrizeCards[i];
//       faceDownPrizeCards[i] = faceDownPrizeCards[j];
//       faceDownPrizeCards[j] = temp;
//     }

//     const prizePositions = [];

//     for (let i = 0; i < array.length; i++) {
//       if (array[i].cards.length === 0 || !array[i].isSecret) {
//         prizePositions.push(array[i]);
//         continue;
//       }

//       prizePositions.push(faceDownPrizeCards.splice(0, 1)[0]);
//     }

//     return prizePositions;
//   }
// }