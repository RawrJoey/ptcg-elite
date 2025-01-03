import { Card, CardType, ChooseCardsPrompt, GameLog, GameMessage, PokemonCard, ShowCardsPrompt, ShuffleDeckPrompt, SpecialCondition, Stage, State, StateUtils, StoreLike, SuperType, TrainerCard, TrainerType } from '../../game';
import { AddSpecialConditionsEffect } from '../../game/store/effects/attack-effects';
import { Effect } from '../../game/store/effects/effect';
import { AttackEffect } from '../../game/store/effects/game-effects';

export class Chimecho extends PokemonCard {

  public stage: Stage = Stage.BASIC;

  public cardType: CardType = CardType.PSYCHIC;

  public hp: number = 70;

  public weakness = [{ type: CardType.DARK }];
  public resistance = [{ type: CardType.FIGHTING, value: -30 }];

  public retreat = [CardType.COLORLESS];

  public attacks = [{
    name: 'Auspicious Tone',
    cost: [CardType.COLORLESS],
    damage: 0,
    text: 'Search your deck for a Pokémon and a Supporter card, reveal them, and put them into your hand. Then, shuffle your deck.'
  }, {
    name: 'Hypnoblast',
    cost: [CardType.PSYCHIC, CardType.COLORLESS],
    damage: 30,
    text: 'Your opponent\'s Active Pokémon is now Asleep.'
  }];

  public set: string = 'VIV';

  public name: string = 'Chimecho';

  public fullName: string = 'Chimecho VIV';

  public cardImage: string = 'assets/cardback.png';

  public setNumber: string = '72';

  public reduceEffect(store: StoreLike, state: State, effect: Effect): State {

    if (effect instanceof AttackEffect && effect.attack === this.attacks[1]) {
      const specialConditionEffect = new AddSpecialConditionsEffect(effect, [SpecialCondition.ASLEEP]);
      store.reduceEffect(state, specialConditionEffect);
    }
    
    if (effect instanceof AttackEffect && effect.attack === this.attacks[0]) {
      const player = effect.player;
      const opponent = StateUtils.getOpponent(state, player);

      let supporters = 0; 
      let pokemon = 0;
      const blocked: number[] = [];
      player.deck.cards.forEach((c, index) => {
        if (c instanceof TrainerCard && c.trainerType === TrainerType.SUPPORTER) {
          supporters += 1; 
        } else if (c instanceof PokemonCard) {
          pokemon += 1;
        } else {
          blocked.push(index);
        }
      });
    
      const maxSupporters = Math.min(supporters, 1);
      const maxPokemons = Math.min(pokemon, 1);
      
      let cards: Card[] = [];

      return store.prompt(state, new ChooseCardsPrompt(
        player,
        GameMessage.CHOOSE_CARD_TO_HAND,
        player.deck,
        { superType: SuperType.POKEMON },
        { min: 0, max: maxSupporters + maxPokemons, allowCancel: false, maxSupporters, maxPokemons },
      ), selected => {
        cards = selected || [];

        cards.forEach((card, index) => {
          player.deck.moveCardTo(card, player.hand);
          store.log(state, GameLog.LOG_PLAYER_PUTS_CARD_IN_HAND, { name: player.name, card: card.name });
        });

        state = store.prompt(state, new ShowCardsPrompt(
          opponent.id,
          GameMessage.CARDS_SHOWED_BY_THE_OPPONENT,
          cards), () => state
        );

        return store.prompt(state, new ShuffleDeckPrompt(player.id), order => {
          player.deck.applyOrder(order);
        });
      });
    }
    return state;
  }
}