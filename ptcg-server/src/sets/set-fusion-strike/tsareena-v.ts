import { PokemonCard } from '../../game/store/card/pokemon-card';
import { Stage, CardType, CardTag } from '../../game/store/card/card-types';
import { Attack, ChoosePokemonPrompt, GameMessage, PlayerType, SlotType, State, StoreLike } from '../../game';
import { AttackEffect, Effect } from '../../game/store/effects/game-effects';

export class TsareenaV extends PokemonCard {

  public stage: Stage = Stage.BASIC;
  public cardType: CardType = G;
  public tags: string[] = [CardTag.POKEMON_V];
  public hp: number = 200;
  public weakness = [{ type: R }];
  public retreat = [C, C];

  public attacks: Attack[] = [
    {
      name: 'Queen\'s Orders',
      cost: [G, C],
      damage: 20,
      damageCalculation: '+',
      text: 'You may discard any number of your Benched Pokémon. ' +
        'This attack does 40 more damage for each Benched Pokémon you discarded in this way.'
    },
  ];

  public regulationMark: string = 'E';
  public set: string = 'FST';
  public name: string = 'Tsareena V';
  public fullName: string = 'Tsareena V FST';
  public cardImage: string = 'assets/cardback.png';
  public setNumber: string = '21';


  public reduceEffect(store: StoreLike, state: State, effect: Effect): State {

    if (effect instanceof AttackEffect && effect.attack === this.attacks[0]) {
      const player = effect.player;

      // Player has more Pokemons than bench size, discard some
      const count = player.bench.length;
      store.prompt(state, new ChoosePokemonPrompt(
        player.id,
        GameMessage.CHOOSE_POKEMON_TO_DISCARD,
        PlayerType.BOTTOM_PLAYER,
        [SlotType.BENCH],
        { min: 0, max: count, allowCancel: false }
      ), results => {
        results = results || [];

        let discardCount = 0;

        // Discard all selected Pokemon
        for (let i = player.bench.length - 1; i >= 0; i--)
          if (results.includes(player.bench[i])) {
            player.bench[i].moveTo(player.discard);
            discardCount++;
          }

        effect.damage += (40 * discardCount);
      });

    }

    return state;
  }
}