import { PokemonCard } from '../../game/store/card/pokemon-card';
import { Stage, CardType, SuperType } from '../../game/store/card/card-types';
import { StoreLike, State, StateUtils, GameError, GameMessage, Card, ChooseCardsPrompt, ShowCardsPrompt, ShuffleDeckPrompt, GameLog } from '../../game';
import { Effect } from '../../game/store/effects/effect';
import { AttackEffect } from '../../game/store/effects/game-effects';

export class Tynamo extends PokemonCard {
  public stage: Stage = Stage.BASIC;
  public cardType: CardType = CardType.LIGHTNING;
  public hp: number = 30;
  public weakness = [{ type: CardType.FIGHTING }];
  public retreat = [CardType.COLORLESS];

  public attacks = [{
    name: 'Call Sign',
    cost: [CardType.COLORLESS],
    damage: 0,
    text: ' Search your deck for a [L] Pokémon, reveal it, and put it into your hand. Then, shuffle your deck. '
  },
  {
    name: 'Tiny Charge',
    cost: [CardType.LIGHTNING],
    damage: 10,
    text: ''
  }];

  public set: string = 'LOR';
  public setNumber: string = '59';
  public regulationMark: string = 'F';
  public cardImage: string = 'assets/cardback.png';
  public name: string = 'Tynamo';
  public fullName: string = 'Tynamo LOR';

  public reduceEffect(store: StoreLike, state: State, effect: Effect): State {

    if (effect instanceof AttackEffect && effect.attack === this.attacks[0]) {
      const player = effect.player;
      const opponent = StateUtils.getOpponent(state, player);

      if (player.deck.cards.length === 0) {
        throw new GameError(GameMessage.CANNOT_PLAY_THIS_CARD);
      }

      let cards: Card[] = [];

      return store.prompt(state, new ChooseCardsPrompt(
        player.id,
        GameMessage.CHOOSE_CARD_TO_HAND,
        player.deck,
        { superType: SuperType.POKEMON, cardType: CardType.LIGHTNING },
        { min: 0, max: 2, allowCancel: true }
      ), selected => {
        cards = selected || [];

        cards.forEach((card, index) => {
          player.deck.moveCardTo(card, player.hand);

          store.log(state, GameLog.LOG_PLAYER_PUTS_CARD_IN_HAND, { name: player.name, card: card.name });

          return store.prompt(state, new ShuffleDeckPrompt(player.id), order => {
            player.deck.applyOrder(order);
            return state;
          });
        });

        return store.prompt(state, new ShowCardsPrompt(
          opponent.id,
          GameMessage.CARDS_SHOWED_BY_THE_OPPONENT,
          cards), () => state
        );
      });
    }

    return state;
  }
}