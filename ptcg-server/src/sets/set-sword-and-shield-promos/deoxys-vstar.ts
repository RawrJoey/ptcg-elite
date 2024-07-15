import { PokemonCard } from '../../game/store/card/pokemon-card';
import { Stage, CardType, CardTag } from '../../game/store/card/card-types';
import { CardTarget, ChoosePokemonPrompt, GameError, GameMessage, PlayerType, SlotType, State, StateUtils, StoreLike } from '../../game';
import { Effect } from '../../game/store/effects/effect';
import { AttackEffect } from '../../game/store/effects/game-effects';
import { PutDamageEffect } from '../../game/store/effects/attack-effects';
import { CheckProvidedEnergyEffect } from '../../game/store/effects/check-effects';

export class DeoxysVSTAR extends PokemonCard {

  public stage = Stage.VSTAR;

  public cardType = CardType.PSYCHIC;

  public evolvesFrom = 'Deoxys V';

  public hp = 270;

  public tags = [CardTag.POKEMON_VSTAR];

  public weakness = [{ type: CardType.DARK }];

  public resistance = [{ type: CardType.FIGHTING, value: -30 }];

  public retreat = [CardType.COLORLESS, CardType.COLORLESS];

  public attacks = [
    {
      name: 'Psychict Javelin',
      cost: [CardType.PSYCHIC, CardType.PSYCHIC, CardType.COLORLESS],
      damage: 190,
      text: 'This attack also does 60 damage to 1 of your opponent\'s Benched Pokémon V. (Don\'t apply Weakness and Resistance for Benched Pokémon.)'
    },
    {
      name: 'Star Force',
      cost: [CardType.PSYCHIC],
      damage: 60,
      text: 'This attack does 60 damage for each Energy attached to both Active Pokémon. (You can\'t use more than 1 VSTAR Power in a game.)'
    },
  ];

  public regulationMark = 'F';

  public set = 'SSP';

  public cardImage: string = 'assets/cardback.png';

  public setNumber: string = '268';

  public name = 'Deoxys VSTAR';

  public fullName = 'Deoxys VSTAR SSP';

  public reduceEffect(store: StoreLike, state: State, effect: Effect): State {

    if (effect instanceof AttackEffect && effect.attack === this.attacks[0]) {
      const player = effect.player;
      const opponent = StateUtils.getOpponent(state, player);

      let opponentPokemonVInPlay = false;

      opponent.forEachPokemon(PlayerType.TOP_PLAYER, (list, card) => {
        if (card.tags.includes(CardTag.POKEMON_V || CardTag.POKEMON_VMAX || CardTag.POKEMON_VSTAR)) {
          opponentPokemonVInPlay = true;
        }
      });

      if (!opponentPokemonVInPlay) {
        return state;
      }

      const blocked2: CardTarget[] = [];
      opponent.forEachPokemon(PlayerType.TOP_PLAYER, (list, card, target) => {
        if (card.tags.includes(CardTag.POKEMON_V || CardTag.POKEMON_VMAX || CardTag.POKEMON_VSTAR)) {
          blocked2.push(target);
        }
      });

      state = store.prompt(state, new ChoosePokemonPrompt(
        player.id,
        GameMessage.CHOOSE_POKEMON_TO_DAMAGE,
        PlayerType.TOP_PLAYER,
        [SlotType.BENCH],
        { min: 1, max: 1, allowCancel: false, blocked: blocked2 }
      ), targets => {
        if (!targets || targets.length === 0) {
          return;
        }
        const damageEffect = new PutDamageEffect(effect, 60);
        damageEffect.target = targets[0];
        store.reduceEffect(state, damageEffect);
      });
    }

    if (effect instanceof AttackEffect && effect.attack === this.attacks[1]) {
      const player = effect.player;
      const opponent = StateUtils.getOpponent(state, player);

      if (player.usedVSTAR === true) {
        throw new GameError(GameMessage.LABEL_VSTAR_USED);
      }

      player.usedVSTAR = true;

      const checkProvidedEnergyEffect = new CheckProvidedEnergyEffect(opponent);
      const checkProvidedEnergyEffect2 = new CheckProvidedEnergyEffect(player);
      store.reduceEffect(state, checkProvidedEnergyEffect);
      const energyCount = checkProvidedEnergyEffect.energyMap.reduce((left, p) => left + p.provides.length, 0);
      const energyCount2 = checkProvidedEnergyEffect2.energyMap.reduce((left, p) => left + p.provides.length, 0);

      effect.damage += energyCount + energyCount2 * 60;
    }
    return state;
  }
}
