import { PlayPokemonEffect } from '../effects/play-card-effects';
import { GameError } from '../../game-error';
import { GameMessage, GameLog } from '../../game-message';
import { Effect } from '../effects/effect';
import { SpecialCondition, Stage } from '../card/card-types';
import { State } from '../state/state';
import { StoreLike } from '../store-like';
import { CheckPokemonPlayedTurnEffect } from '../effects/check-effects';
import { EvolveEffect } from '../effects/game-effects';
import { PlayerType } from '../actions/play-card-action';


export function playPokemonReducer(store: StoreLike, state: State, effect: Effect): State {

  /* Play pokemon card */
  if (effect instanceof PlayPokemonEffect) {
    const stage = effect.pokemonCard.stage;
    const isBasic = stage === Stage.BASIC;

    if (isBasic && effect.target.cards.length === 0) {
      store.log(state, GameLog.LOG_PLAYER_PLAYS_BASIC_POKEMON, {
        name: effect.player.name,
        card: effect.pokemonCard.name
      });
      effect.player.hand.moveCardTo(effect.pokemonCard, effect.target);
      effect.target.pokemonPlayedTurn = state.turn;
      return state;
    }
    const player = effect.player;
    const isEvolved = stage === Stage.STAGE_1 || Stage.STAGE_2;
    const evolvesFrom = effect.pokemonCard.evolvesFrom;
    const pokemonCard = effect.target.getPokemonCard();
    if (pokemonCard === undefined) {
      throw new GameError(GameMessage.INVALID_TARGET);
    }

    if (isEvolved && pokemonCard.stage < stage && pokemonCard.name === evolvesFrom) {
      const playedTurnEffect = new CheckPokemonPlayedTurnEffect(effect.player, effect.target);
      store.reduceEffect(state, playedTurnEffect);

      if (state.turn == 0 && player.canEvolve === false) {
        throw new GameError(GameMessage.CANNOT_EVOLVE_ON_YOUR_FIRST_TURN);
      }

      if (state.turn == 1 && player.canEvolve === false) {
        throw new GameError(GameMessage.CANNOT_EVOLVE_ON_YOUR_FIRST_TURN);
      }
      if (state.turn == 2 && player.canEvolve === false) {
        throw new GameError(GameMessage.CANNOT_EVOLVE_ON_YOUR_FIRST_TURN);
      }

      if (playedTurnEffect.pokemonPlayedTurn >= state.turn) {
        throw new GameError(GameMessage.POKEMON_CANT_EVOLVE_THIS_TURN);
      }

      const evolveEffect = new EvolveEffect(effect.player, effect.target, effect.pokemonCard);
      store.reduceEffect(state, evolveEffect);
      effect.target.clearEffects();
      effect.player.removePokemonEffects(effect.target);

      player.forEachPokemon(PlayerType.BOTTOM_PLAYER, cardList => {
        const pokemonCard = cardList.getPokemonCard();
        if (pokemonCard && player.active.cards.includes(pokemonCard)) {
          cardList.removeSpecialCondition(SpecialCondition.ABILITY_USED);
        }
      });

      player.forEachPokemon(PlayerType.BOTTOM_PLAYER, (cardList, card) => {
        if (cardList === player.active) {
          return;
        }
        cardList.removeSpecialCondition(SpecialCondition.ABILITY_USED);
      });

      return state;
    }

    throw new GameError(GameMessage.INVALID_TARGET);
  }

  return state;
}
