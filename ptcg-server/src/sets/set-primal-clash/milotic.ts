import { PokemonCard } from '../../game/store/card/pokemon-card';
import { Stage, CardType } from '../../game/store/card/card-types';
import { StoreLike, State, PowerType, ChooseCardsPrompt, ConfirmPrompt, GameMessage, ShowCardsPrompt, StateUtils, ChoosePokemonPrompt, PlayerType, SlotType, GameLog } from '../../game';
import { AttackEffect, PowerEffect } from '../../game/store/effects/game-effects';
import { Effect } from '../../game/store/effects/effect';
import { PlayPokemonEffect } from '../../game/store/effects/play-card-effects';

export class Milotic extends PokemonCard {

  public stage: Stage = Stage.STAGE_1;

  public evolvesFrom = 'Feebas';

  public cardType: CardType = CardType.WATER;

  public hp: number = 110;

  public weakness = [{ type: CardType.GRASS }];

  public retreat = [ CardType.COLORLESS, CardType.COLORLESS ];

  public powers = [{
    name: 'Sparkling Ripples',
    powerType: PowerType.ABILITY,
    text: 'When you play this Pokémon from your hand to evolve 1 of your Pokémon, you may put a card from your discard pile into your hand.'
  }];

  public attacks = [
    {
      name: 'Aqua Swirl',
      cost: [ CardType.WATER, CardType.COLORLESS, CardType.COLORLESS ],
      damage: 120,
      text: 'You may have your opponent switch his or her Active Pokémon with 1 of his or her Benched Pokémon.'
    }
  ];

  public set: string = 'PRC';

  public name: string = 'Milotic';

  public fullName: string = 'Milotic PRC';

  public cardImage: string = 'assets/cardback.png';

  public setNumber: string = '44';

  public reduceEffect(store: StoreLike, state: State, effect: Effect): State {

    if (effect instanceof PlayPokemonEffect && effect.pokemonCard === this) {
      const player = effect.player;
      const opponent = StateUtils.getOpponent(state, player);
  
      if (player.deck.cards.length === 0) {
        return state;
      }
      
      // Try to reduce PowerEffect, to check if something is blocking our ability
      try {
        const stub = new PowerEffect(player, {
          name: 'test',
          powerType: PowerType.ABILITY,
          text: ''
        }, this);
        store.reduceEffect(state, stub);
      } catch {
        return state;
      }
      state = store.prompt(state, new ConfirmPrompt(
        effect.player.id,
        GameMessage.WANT_TO_USE_ABILITY,
      ), wantToUse => {
        if (wantToUse) {
      
          state = store.prompt(state, new ChooseCardsPrompt(
            player.id,
            GameMessage.CHOOSE_CARD_TO_HAND,
            player.discard,
            { },
            { min: 0, max: 1, allowCancel: false }
          ), selected => {
            const cards = selected || [];
  
            store.prompt(state, [new ShowCardsPrompt(
              opponent.id,
              GameMessage.CARDS_SHOWED_BY_THE_OPPONENT,
              cards
            )], () => {
              player.discard.moveCardsTo(cards, player.hand);
              
              cards.forEach((card, index) => {
                store.log(state, GameLog.LOG_PLAYER_PUTS_CARD_IN_HAND, { name: player.name, card: card.name });
              });
            });
          });
        }
      });
    }
    if (effect instanceof AttackEffect && effect.attack === this.attacks[0]) {
      const player = effect.player;
      const opponent = StateUtils.getOpponent(state, player);
      const hasBench = opponent.bench.some(b => b.cards.length > 0);

      if (hasBench === false) {
        return state;
      }

      return store.prompt(state, new ChoosePokemonPrompt(
        opponent.id,
        GameMessage.CHOOSE_POKEMON_TO_SWITCH,
        PlayerType.BOTTOM_PLAYER,
        [SlotType.BENCH],
        { allowCancel: false }
      ), targets => {
        if (targets && targets.length > 0) {
          opponent.active.clearEffects();
          opponent.switchPokemon(targets[0]);
          return state;
        }
      });
    }
    return state;
  }
}
