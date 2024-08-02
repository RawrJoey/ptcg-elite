import { PokemonCard } from '../../game/store/card/pokemon-card';
import { CardType, Stage, SuperType } from '../../game/store/card/card-types';
import { Card, ChooseCardsPrompt, ConfirmPrompt, GameMessage, PowerType, ShuffleDeckPrompt, State, StoreLike } from '../../game';
import { Effect } from '../../game/store/effects/effect';
import { AttachEnergyEffect } from '../../game/store/effects/play-card-effects';
import { PowerEffect } from '../../game/store/effects/game-effects';

export class Skiploom extends PokemonCard {
  public stage: Stage = Stage.BASIC;
  public evolvesFrom = 'Hoppip';
  public cardType: CardType = CardType.GRASS;
  public hp: number = 60;
  public weakness = [{ type: CardType.FIRE }];

  public powers = [{
    name: 'Solar Evolution',
    powerType: PowerType.ABILITY,
    text: 'When you attach an Energy card from your hand to this Pokémon during your turn,'
      + ' you may search your deck for a card that evolves from this Pokémon and put it onto this Pokémon to evolve it.'
      + 'Then, shuffle your deck.'
  }];

  public attacks = [{
    name: 'Spinning Attack',
    cost: [CardType.GRASS],
    damage: 20,
    text: ''
  }];

  public set: string = 'EVS';
  public regulationMark: string = 'E';
  public cardImage: string = 'assets/cardback.png';
  public setNumber: string = '3';
  public name: string = 'Skiploom';
  public fullName: string = 'Skiploom EVS';

  public reduceEffect(store: StoreLike, state: State, effect: Effect): State {

    if (effect instanceof AttachEnergyEffect && effect.target.getPokemons().some(card => card === this)) {
      const player = effect.player;

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

      if (player.deck.cards.length === 0) {
        return state;
      }

      return store.prompt(state, new ConfirmPrompt(
        effect.player.id,
        GameMessage.WANT_TO_USE_ABILITY,
      ), wantToUse => {
        if (wantToUse) {
          let cards: Card[] = [];

          state = store.prompt(state, new ChooseCardsPrompt(
            player.id,
            GameMessage.CHOOSE_CARD_TO_EVOLVE,
            player.deck,
            { superType: SuperType.POKEMON, stage: Stage.STAGE_1, evolvesFrom: 'Skiploom' },
            { min: 1, max: 1, allowCancel: true }
          ), selected => {
            cards = selected || [];
            if (cards.length > 0) {
              // Evolve Pokemon
              player.deck.moveCardsTo(cards, player.active);
              player.active.clearEffects();
              player.active.pokemonPlayedTurn = state.turn;
            }

            return store.prompt(state, new ShuffleDeckPrompt(player.id), order => {
              player.deck.applyOrder(order);
            });
          });
        }
      });
    }

    return state;
  }
}