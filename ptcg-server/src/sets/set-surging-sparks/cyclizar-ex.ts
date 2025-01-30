import { PokemonCard } from '../../game/store/card/pokemon-card';
import { StoreLike, State, StateUtils, CardTag, CardType, Stage, GameMessage, ConfirmPrompt, ChoosePokemonPrompt, PlayerType, SlotType } from '../../game';
import { Effect } from '../../game/store/effects/effect';
import { AttackEffect } from '../../game/store/effects/game-effects';
import { PutDamageEffect } from '../../game/store/effects/attack-effects';

export class Cyclizarex extends PokemonCard {
  public tags = [CardTag.POKEMON_ex, CardTag.POKEMON_TERA];
  public stage: Stage = Stage.BASIC;
  public cardType: CardType = C;
  public hp: number = 210;
  public weakness = [{ type: F }];
  public retreat = [ C ];

  public attacks = [
    {
      name: 'Break Through',
      cost: [ C, C, C ],
      damage: 130,
      text: 'This attack also does 30 damage to 1 of your opponent\'s Benched Pokémon. (Don\'t apply Weakness and Resistance for Benched Pokémon.)'
    },
    {
      name: 'Zircon Road',
      cost: [ G, R, P ],
      damage: 180,
      text: 'You may draw 5 cards.'
    }
  ];

  public set: string = 'SSP';
  public regulationMark = 'H';
  public cardImage: string = 'assets/cardback.png';
  public setNumber: string = '159';
  public name: string = 'Cyclizar ex';
  public fullName: string = 'Cyclizar ex SSP';

  public reduceEffect(store: StoreLike, state: State, effect: Effect): State {
    // Break Through
    if (effect instanceof AttackEffect && effect.attack === this.attacks[0]) {
      const player = effect.player;
      const opponent = StateUtils.getOpponent(state, player);

      const hasBenched = opponent.bench.some(b => b.cards.length > 0);
      if (!hasBenched) {
        return state;
      }

      return store.prompt(state, new ChoosePokemonPrompt(
        player.id,
        GameMessage.CHOOSE_POKEMON_TO_DAMAGE,
        PlayerType.TOP_PLAYER,
        [SlotType.BENCH],
        { allowCancel: false }
      ), targets => {
        if (!targets || targets.length === 0) {
          return;
        }
        const damageEffect = new PutDamageEffect(effect, 30);
        damageEffect.target = targets[0];
        store.reduceEffect(state, damageEffect);
      });
    }

    // Zircon Road
    if (effect instanceof AttackEffect && effect.attack === this.attacks[1]) {
      const player = effect.player;
      
      state = store.prompt(state, new ConfirmPrompt(
        player.id,
        GameMessage.WANT_TO_USE_ABILITY,
      ), wantToUse => {
        if (wantToUse) {
          player.deck.moveTo(player.hand, 5);
        }
      });
    }
    return state;
  }
}