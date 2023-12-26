import { Effect } from '../../game/store/effects/effect';
import { PokemonCard } from '../../game/store/card/pokemon-card';
import { PowerType, StoreLike, State, ChoosePokemonPrompt, PlayerType, SlotType,
  StateUtils } from '../../game';
import { Stage, CardType } from '../../game/store/card/card-types';
import { PlayPokemonEffect } from '../../game/store/effects/play-card-effects';
import { GameMessage } from '../../game/game-message';
import { PowerEffect } from '../../game/store/effects/game-effects';


export class Hawlucha extends PokemonCard {

  public stage: Stage = Stage.BASIC;

  public regulationMark = 'G';

  public cardType: CardType = CardType.FIGHTING;

  public hp: number = 70;

  public weakness = [{ type: CardType.PSYCHIC }];

  public retreat = [ CardType.COLORLESS];

  public powers = [{
    name: 'Flying Entry',
    powerType: PowerType.ABILITY,
    text: 'When you play this Pokémon from your hand onto your ' +
      'Bench during your turn, you may choose 2 of your ' +
      'opponent\'s Benched Pokémon and put 1 damage counter' +
      'on each of them.'
  }];

  public attacks = [
    {
      name: 'Wing Attack',
      cost: [ CardType.FIGHTING, CardType.COLORLESS, CardType.COLORLESS ],
      damage: 70,
      text: ''
    }
  ];

  public set: string = 'SVI';

  public cardImage: string = 'assets/cardback.png';

  public setNumber: string = '118';

  public name: string = 'Hawlucha';

  public fullName: string = 'Hawlucha SVI';

  public reduceEffect(store: StoreLike, state: State, effect: Effect): State {

    if (effect instanceof PlayPokemonEffect && effect.pokemonCard === this) {
      const player = StateUtils.findOwner(state, effect.target);

      // Try to reduce PowerEffect, to check if something is blocking our ability
      try {
        const powerEffect = new PowerEffect(player, this.powers[0], this);
        store.reduceEffect(state, powerEffect);
      } catch {
        return state;
      }

      return store.prompt(state, new ChoosePokemonPrompt(
        player.id,
        GameMessage.CHOOSE_POKEMON_TO_DAMAGE,
        PlayerType.TOP_PLAYER,
        [ SlotType.BENCH ],
        { min: 1, max: 2, allowCancel: true },
      ), selected => {
        const targets = selected || [];
        targets.forEach(target => {
          target.damage += 10;
        });
      });
    }

    return state;
  }

}
