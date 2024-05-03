import { PokemonCard } from '../../game/store/card/pokemon-card';
import { Stage, CardType, CardTag, SuperType, EnergyType } from '../../game/store/card/card-types';
import { PowerType, StoreLike, State, 
  GameMessage, GameError, PlayerType, AttachEnergyPrompt, EnergyCard, SlotType, StateUtils } from '../../game';
import { Effect } from '../../game/store/effects/effect';
import { AttackEffect, PowerEffect } from '../../game/store/effects/game-effects';
import { EndTurnEffect } from '../../game/store/effects/game-phase-effects';

export class Koraidonex extends PokemonCard {

  public regulationMark = 'G';

  public tags = [ CardTag.POKEMON_ex ];

  public stage: Stage = Stage.BASIC;

  public cardType: CardType = CardType.FIGHTING;

  public hp: number = 230;

  public weakness = [{ type: CardType.PSYCHIC }];

  public retreat = [ CardType.COLORLESS, CardType.COLORLESS ];

  public powers = [{
    name: 'Dino Cry',
    useWhenInPlay: true,
    powerType: PowerType.ABILITY,
    text: 'Once during your turn, you may attach up to 2 Basic [F] Energy cards from your discard pile to your Basic [F] Pokémon in any way you like. If you use this Ability, your turn ends.'
  }];

  public attacks = [
    {
      name: 'Wild Impact',
      cost: [ CardType.FIGHTING, CardType.FIGHTING, CardType.COLORLESS ],
      damage: 220,
      text: 'During your next turn, this Pokémon can\'t attack.'
    }
  ];

  public set: string = 'SVI';

  public cardImage: string = 'assets/cardback.png';

  public setNumber: string = '125';

  public name: string = 'Koraidon ex';

  public fullName: string = 'Koraidon ex SVI';

  public readonly DINO_CRY_MARKER = 'DINO_CRY_MARKER';
  public readonly ATTACK_USED_MARKER = 'ATTACK_USED_MARKER';
  public readonly ATTACK_USED_2_MARKER = 'ATTACK_USED_2_MARKER';

  public reduceEffect(store: StoreLike, state: State, effect: Effect): State {
  
    if (effect instanceof EndTurnEffect && effect.player.attackMarker.hasMarker(this.ATTACK_USED_2_MARKER, this)) {
      effect.player.attackMarker.removeMarker(this.ATTACK_USED_MARKER, this);
      effect.player.attackMarker.removeMarker(this.ATTACK_USED_2_MARKER, this);
      console.log('marker cleared');
    }

    if (effect instanceof EndTurnEffect && effect.player.attackMarker.hasMarker(this.ATTACK_USED_MARKER, this)) {
      effect.player.attackMarker.addMarker(this.ATTACK_USED_2_MARKER, this);
      console.log('second marker added');
    }
    if (effect instanceof AttackEffect && effect.attack === this.attacks[0]) {

      // Check marker
      if (effect.player.attackMarker.hasMarker(this.ATTACK_USED_MARKER, this)) {
        console.log('attack blocked');
        throw new GameError(GameMessage.BLOCKED_BY_EFFECT);
      }
      effect.player.attackMarker.addMarker(this.ATTACK_USED_MARKER, this);
      console.log('marker added');
    }

    if (effect instanceof PowerEffect && effect.power === this.powers[0]) {
      const player = effect.player;
  
      const hasBench = player.bench.some(b => b.cards.length > 0);
      if (!hasBench) {
        throw new GameError(GameMessage.CANNOT_USE_POWER);
      }
      const hasEnergyInDiscard = player.discard.cards.some(c => {
        return c instanceof EnergyCard
            && c.energyType === EnergyType.BASIC
            && c.provides.includes(CardType.FIGHTING);
      });
      if (!hasEnergyInDiscard) {
        throw new GameError(GameMessage.CANNOT_USE_POWER);
      }
      if (player.attackMarker.hasMarker(this.DINO_CRY_MARKER, this)) {
        throw new GameError(GameMessage.POWER_ALREADY_USED);
      }
  
      state = store.prompt(state, new AttachEnergyPrompt(
        player.id,
        GameMessage.ATTACH_ENERGY_TO_BENCH,
        player.discard,
        PlayerType.BOTTOM_PLAYER,
        [ SlotType.BENCH ],
        { superType: SuperType.ENERGY, energyType: EnergyType.BASIC, name: 'Fighting Energy' },
        { allowCancel: false, min: 1, max: 2 }
      ), transfers => {
        transfers = transfers || [];
        // cancelled by user
        if (transfers.length === 0) {
          return;
        }
        player.attackMarker.addMarker(this.DINO_CRY_MARKER, this);
        for (const transfer of transfers) {
          const target = StateUtils.getTarget(state, player, transfer.to);
          player.discard.moveCardTo(transfer.card, target);
          const endTurnEffect = new EndTurnEffect(player);
          store.reduceEffect(state, endTurnEffect);
          return state;
        }
      });
  
      return state;
    }
    return state;
  }
}