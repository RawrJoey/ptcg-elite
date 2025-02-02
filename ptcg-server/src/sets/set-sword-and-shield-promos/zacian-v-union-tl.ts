import { PokemonCard } from '../../game/store/card/pokemon-card';
import { Stage, CardType, SuperType, EnergyType, CardTag } from '../../game/store/card/card-types';
import { AttachEnergyPrompt, Card, CardTarget, ChooseEnergyPrompt, EnergyCard, GameError, GameMessage, PlayerType, PokemonCardList, PowerType, SlotType, State, StateUtils, StoreLike } from '../../game';
import { Effect } from '../../game/store/effects/effect';
import { AttackEffect, PowerEffect } from '../../game/store/effects/game-effects';
import {ZacianVUNIONTopRight} from './zacian-v-union-tr';
import {ZacianVUNIONBottomLeft} from './zacian-v-union-bl';
import {ZacianVUNIONBottomRight} from './zacian-v-union-br';
import {CheckProvidedEnergyEffect} from '../../game/store/effects/check-effects';
import {DiscardCardsEffect} from '../../game/store/effects/attack-effects';
import {EndTurnEffect} from '../../game/store/effects/game-phase-effects';

export class ZacianVUNIONTopLeft extends PokemonCard {
  public stage: Stage = Stage.VUNION;
  public tags = [ CardTag.POKEMON_VUNION ];
  public cardType: CardType = M;
  public hp: number = 320;
  public weakness = [{ type: F }];
  public resistance = [{ type: G, value: -30 }];
  public retreat = [ C, C ];

  public powers = [
    {
      name: 'Zacian V-UNION Assembly',
      text: 'Once per game during your turn, combine 4 different Zacian V-UNION from your discard pile and put them onto your bench.',
      useFromDiscard: true,
      exemptFromAbilityLock: true,
      powerType: PowerType.ABILITY
    }
  ];

  public attacks = [
    {
      name: 'Union Gain',
      cost: [ C ],
      damage: 0,
      text: 'Attach up to 2 [M] Energy cards from your discard pile to this Pokémon.'
    },
    {
      name: 'Dance of the Crowned Sword',
      cost: [ M, M, C ],
      damage: 150,
      text: 'During your opponent\'s next turn, the Defending Pokémon\'s attacks do 150 less damage (before applying Weakness and Resistance).'
    },
    {
      name: 'Steel Cut',
      cost: [ M, M, C ],
      damage: 200,
      text: ''
    },
    {
      name: 'Master Blade',
      cost: [ M, M, M, C ],
      damage: 340,
      text: 'Discard 3 Energy from this Pokémon.'
    }
  ];

  public set: string = 'SP';
  public regulationMark = 'E';
  public cardImage: string = 'assets/cardback.png';
  public setNumber: string = '163';
  public name: string = 'Zacian V-UNION';
  public fullName: string = 'Zacian V-UNION (Top Left) SP';

  public readonly DANCE_REDUCED_DAMAGE_MARKER = 'DANCE_REDUCED_DAMAGE_MARKER';

  public reduceEffect(store: StoreLike, state: State, effect: Effect): State {
    // assemblin the v-union
    if (effect instanceof PowerEffect && effect.power === this.powers[0]){
      const player = effect.player;
      const slots: PokemonCardList[] = player.bench.filter(b => b.cards.length === 0);

      if (player.assembledZacian){
        throw new GameError(GameMessage.CANNOT_PLAY_THIS_CARD);
      }
      if (slots.length === 0){
        throw new GameError(GameMessage.CANNOT_USE_POWER);
      }

      let topLeftPiece = false;
      let topRightPiece = false;
      let bottomLeftPiece = false;
      let bottomRightPiece = false;
      player.discard.cards.forEach(card => {
        if (card instanceof ZacianVUNIONTopLeft){ topLeftPiece = true; }
        if (card instanceof ZacianVUNIONTopRight){ topRightPiece = true; }
        if (card instanceof ZacianVUNIONBottomLeft){ bottomLeftPiece = true; }
        if (card instanceof ZacianVUNIONBottomRight){ bottomRightPiece = true; }
      });

      if (topLeftPiece && topRightPiece && bottomLeftPiece && bottomRightPiece){
        if (slots.length > 0) {
          player.discard.cards.forEach(card => { if (card instanceof ZacianVUNIONTopRight){ player.discard.moveCardTo(card, slots[0]); }});
          player.discard.cards.forEach(card => { if (card instanceof ZacianVUNIONBottomLeft){ player.discard.moveCardTo(card, slots[0]); }});
          player.discard.cards.forEach(card => { if (card instanceof ZacianVUNIONBottomRight){ player.discard.moveCardTo(card, slots[0]); }});
          // gotta make sure the actual mon ends up on top
          player.discard.cards.forEach(card => { if (card instanceof ZacianVUNIONTopLeft){ player.discard.moveCardTo(card, slots[0]); }});
          player.assembledZacian = true;
          slots[0].pokemonPlayedTurn = state.turn;
        }
      } else {
        throw new GameError(GameMessage.CANNOT_USE_POWER);
      }
    }

    // Union Gain
    if (effect instanceof AttackEffect && effect.attack === this.attacks[0]){
      const player = effect.player;

      let metalsInDiscard = 0;
      // checking for energies in the discard
      player.discard.cards.forEach(card => {
        if (card instanceof EnergyCard && card.energyType === EnergyType.BASIC && card.name === 'Metal Energy'){
          metalsInDiscard++;
        }
      })

      if (metalsInDiscard > 0){
        const blocked: CardTarget[] = [];
        player.forEachPokemon(PlayerType.BOTTOM_PLAYER, (list, card, target) => {
          if (card !== this) {
            blocked.push(target);
          }
        });

        state = store.prompt(state, new AttachEnergyPrompt(
          player.id,
          GameMessage.ATTACH_ENERGY_TO_BENCH,
          player.discard,
          PlayerType.BOTTOM_PLAYER,
          [SlotType.BENCH, SlotType.ACTIVE],
          { superType: SuperType.ENERGY, energyType: EnergyType.BASIC, name: 'Metal Energy' },
          { allowCancel: false, min: 0, max: Math.min(2, metalsInDiscard), blockedTo: blocked }
        ), transfers => {
          transfers = transfers || [];
          // cancelled by user
          if (transfers.length === 0) {
            return;
          }
          for (const transfer of transfers) {
            const target = StateUtils.getTarget(state, player, transfer.to);
            player.discard.moveCardTo(transfer.card, target);
          }
        });   
      }
    } 

    // Dance of the Crowned Sword
    if (effect instanceof AttackEffect && effect.attack === this.attacks[1]){
      const opponent = effect.opponent;

      opponent.active.marker.addMarker(this.DANCE_REDUCED_DAMAGE_MARKER, this);
      opponent.marker.addMarker(this.DANCE_REDUCED_DAMAGE_MARKER, this);
    }

    if (effect instanceof AttackEffect){
      if (effect.source.marker.hasMarker(this.DANCE_REDUCED_DAMAGE_MARKER, this)){
        effect.damage -= 150;
      }
    }

    if (effect instanceof EndTurnEffect && effect.player.marker.hasMarker(this.DANCE_REDUCED_DAMAGE_MARKER, this)){
      effect.player.marker.removeMarker(this.DANCE_REDUCED_DAMAGE_MARKER, this);

      effect.player.forEachPokemon(PlayerType.BOTTOM_PLAYER, (cardList) => {
        if (cardList.marker.hasMarker(this.DANCE_REDUCED_DAMAGE_MARKER, this)){
          cardList.marker.removeMarker(this.DANCE_REDUCED_DAMAGE_MARKER, this);
        }
      });
    }

    // Master Blade
    if (effect instanceof AttackEffect && effect.attack === this.attacks[3]){
      const player = effect.player;

      if (!player.active.cards.some(c => c instanceof EnergyCard)) {
        return state;
      }

      const checkProvidedEnergy = new CheckProvidedEnergyEffect(player);
      state = store.reduceEffect(state, checkProvidedEnergy);

      state = store.prompt(state, new ChooseEnergyPrompt(
        player.id,
        GameMessage.CHOOSE_ENERGIES_TO_DISCARD,
        checkProvidedEnergy.energyMap,
        [ C, C, C ],
        { allowCancel: false }
      ), energy => {
        const cards: Card[] = (energy || []).map(e => e.card);
        const discardEnergy = new DiscardCardsEffect(effect, cards);
        discardEnergy.target = player.active;
        store.reduceEffect(state, discardEnergy);
      });
    }

    return state;
  }
}