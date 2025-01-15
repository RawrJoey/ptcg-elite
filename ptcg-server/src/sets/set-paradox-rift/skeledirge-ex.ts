import { PokemonCard } from '../../game/store/card/pokemon-card';
import { Stage, CardType, CardTag, SuperType, EnergyType } from '../../game/store/card/card-types';
import { StoreLike, State, GameError, GameMessage, PowerType, EnergyCard, StateUtils } from '../../game';
import { AttackEffect, PowerEffect } from '../../game/store/effects/game-effects';
import { Effect } from '../../game/store/effects/effect';
import { ChooseCardsPrompt } from '../../game/store/prompts/choose-cards-prompt';
import { AfterDamageEffect, ApplyWeaknessEffect, DealDamageEffect, PutDamageEffect } from '../../game/store/effects/attack-effects';
import { EndTurnEffect } from '../../game/store/effects/game-phase-effects';
import { PlayPokemonEffect } from '../../game/store/effects/play-card-effects';

export class SkeledirgeEX extends PokemonCard {
  public stage: Stage = Stage.STAGE_2;
  public evolvesFrom = 'Crocalor';
  public tags = [CardTag.POKEMON_ex, CardTag.POKEMON_TERA];
  public cardType: CardType = M;
  public hp: number = 330;
  public retreat = [C, C, C];
  public weakness = [{ type: R }];
  public resistance = [{ type: G, value: -30 }];

  public powers = [{
    name: 'Incendiary Song',
    useWhenInPlay: true,
    powerType: PowerType.ABILITY,
    text: 'Once during your turn, you may discard a Basic [R] Energy card from your hand in order to use this Ability. During this turn, attacks used by your Pokémon do 60 more damage to your opponent\'s Active Pokémon (before applying Weakness and Resistance).',
  }];

  public attacks = [{
    name: 'Luster Burn',
    cost: [R, R],
    damage: 160,
    shredAttack: true,
    text: 'This attack\'s damage isn\'t affected by any effects on your opponent\'s Active Pokémon.'
  }];

  public regulationMark = 'H';
  public set: string = 'PAR';
  public name: string = 'Skeledirge ex';
  public fullName: string = 'Skeledirge ex PAR';
  public cardImage: string = 'assets/cardback.png';
  public setNumber: string = '137';

  public readonly INCENDIARY_SONG_MARKER = 'INCENDIARY_SONG_MARKER';

  public reduceEffect(store: StoreLike, state: State, effect: Effect): State {

    if (effect instanceof PlayPokemonEffect && effect.pokemonCard === this) {
      const player = effect.player;
      player.marker.removeMarker(this.INCENDIARY_SONG_MARKER, this);
    }

    if (effect instanceof EndTurnEffect) {
      const player = effect.player;
      player.marker.removeMarker(this.INCENDIARY_SONG_MARKER, this);
    }

    if (effect instanceof PowerEffect && effect.power === this.powers[0]) {
      const player = effect.player;
      const hasEnergyInHand = player.hand.cards.some(c => {
        return c instanceof EnergyCard && c.name === 'Fire Energy';
      });

      if (!hasEnergyInHand) {
        throw new GameError(GameMessage.CANNOT_USE_POWER);
      }

      if (player.marker.hasMarker(this.INCENDIARY_SONG_MARKER, this)) {
        throw new GameError(GameMessage.POWER_ALREADY_USED);
      }

      return store.prompt(state, new ChooseCardsPrompt(
        player,
        GameMessage.CHOOSE_CARD_TO_DISCARD,
        player.hand,
        { superType: SuperType.ENERGY, energyType: EnergyType.BASIC, name: 'Fire Energy' },
        { min: 1, max: 1, allowCancel: false }
      ), selected => {
        if (!selected || selected.length === 0) {
          return state;
        }

        const card = selected[0];
        player.hand.moveCardTo(card, player.discard);
        player.marker.addMarker(this.INCENDIARY_SONG_MARKER, this);
      });
    }

    if (effect instanceof AttackEffect) {
      const player = effect.player;

      if (player.marker.hasMarker(this.INCENDIARY_SONG_MARKER, this)) {
        effect.damage += 60;
      }
    }

    if (effect instanceof AttackEffect && effect.attack === this.attacks[1]) {
      const player = effect.player;
      const opponent = StateUtils.getOpponent(state, player);

      const dealDamage = new DealDamageEffect(effect, 160);
      store.reduceEffect(state, dealDamage);

      const applyWeakness = new ApplyWeaknessEffect(effect, dealDamage.damage);
      store.reduceEffect(state, applyWeakness);
      const damage = applyWeakness.damage;

      effect.damage = 0;

      if (damage > 0) {
        opponent.active.damage += damage;
        const afterDamage = new AfterDamageEffect(effect, damage);
        state = store.reduceEffect(state, afterDamage);
      }
    }

    if (effect instanceof PutDamageEffect) {
      const player = effect.player;
      const opponent = StateUtils.getOpponent(state, player);

      // Target is not Active
      if (effect.target === player.active || effect.target === opponent.active) {
        return state;
      }

      // Target is this Pokemon
      if (effect.target.cards.includes(this) && effect.target.getPokemonCard() === this) {
        effect.preventDefault = true;
      }
    }
    return state;
  }
}
