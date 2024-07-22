import { Effect } from '../../game/store/effects/effect';
import { GameMessage } from '../../game/game-message';
import { TrainerEffect } from '../../game/store/effects/play-card-effects';
import { State } from '../../game/store/state/state';
import { StoreLike } from '../../game/store/store-like';
import { TrainerCard } from '../../game/store/card/trainer-card';
import { TrainerType } from '../../game/store/card/card-types';
import { ChoosePokemonPrompt, GameError, PlayerType, SelectPrompt, SlotType } from '../../game';
import { DealDamageEffect } from '../../game/store/effects/attack-effects';
import { EndTurnEffect } from '../../game/store/effects/game-phase-effects';

export class Kieran extends TrainerCard {

  public trainerType: TrainerType = TrainerType.SUPPORTER;

  public set: string = 'TWM';

  public cardImage: string = 'assets/cardback.png';

  public setNumber: string = '154';

  public regulationMark = 'H';

  public name: string = 'Kieran';

  public fullName: string = 'Kieran TWM';

  private readonly LEON_MARKER = 'LEON_MARKER';

  public text: string =
    'Choose 1:' +
    '• Switch your Active Pokémon with 1 of your Benched Pokémon.' +
    '• Your Pokémon\'s attacks do 30 more damage to your opponent\'s Active Pokémon ex and Pokémon V this turn.';

  public reduceEffect(store: StoreLike, state: State, effect: Effect): State {

    if (effect instanceof EndTurnEffect) {
      effect.player.marker.removeMarker(this.LEON_MARKER, this);
      return state;
    }

    if (effect instanceof TrainerEffect && effect.trainerCard === this) {
      const player = effect.player;

      const supporterTurn = player.supporterTurn;

      if (supporterTurn > 0) {
        throw new GameError(GameMessage.SUPPORTER_ALREADY_PLAYED);
      }

      player.hand.moveCardTo(effect.trainerCard, player.supporter);
      // We will discard this card after prompt confirmation
      effect.preventDefault = true;

      const options: { message: GameMessage, action: () => void }[] = [
        {
          message: GameMessage.SWITCH_POKEMON,
          action: () => {

            return store.prompt(state, new ChoosePokemonPrompt(
              player.id,
              GameMessage.CHOOSE_POKEMON_TO_SWITCH,
              PlayerType.BOTTOM_PLAYER,
              [SlotType.BENCH],
              { allowCancel: false }
            ), result => {
              const cardList = result[0];
              player.switchPokemon(cardList);
              player.supporter.moveCardTo(effect.trainerCard, player.discard);
              return state;
            });
          }
        },
        {
          message: GameMessage.INCREASE_DAMAGE_BY_30_AGAINST_OPPONENTS_EX_AND_V_POKEMON,
          action: () => {

            player.marker.addMarker(this.LEON_MARKER, this);

            if (effect instanceof DealDamageEffect) {
              const marker = effect.player.marker;
              if (marker.hasMarker(this.LEON_MARKER, this) && effect.damage > 0) {
                effect.damage += 30;
              }
              return state;
            }
          }
        }
      ];
      player.supporter.moveCardTo(effect.trainerCard, player.discard);
      const hasBench = player.bench.some(b => b.cards.length > 0);

      if (!hasBench) {
        options.splice(1, 1);
      }

      return store.prompt(state, new SelectPrompt(
        player.id,
        GameMessage.CHOOSE_OPTION,
        options.map(opt => opt.message),
        { allowCancel: false }
      ), choice => {
        const option = options[choice];
        option.action();
      });
    }
    return state;
  }



}