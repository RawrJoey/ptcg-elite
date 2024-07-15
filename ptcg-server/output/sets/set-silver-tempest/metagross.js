"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Metagross = void 0;
const pokemon_card_1 = require("../../game/store/card/pokemon-card");
const card_types_1 = require("../../game/store/card/card-types");
const game_1 = require("../../game");
const game_effects_1 = require("../../game/store/effects/game-effects");
const game_phase_effects_1 = require("../../game/store/effects/game-phase-effects");
class Metagross extends pokemon_card_1.PokemonCard {
    constructor() {
        super(...arguments);
        this.stage = card_types_1.Stage.STAGE_2;
        this.evolvesFrom = 'Metang';
        this.regulationMark = 'F';
        this.cardType = card_types_1.CardType.METAL;
        this.hp = 170;
        this.weakness = [{ type: card_types_1.CardType.FIRE }];
        this.resistance = [{ type: card_types_1.CardType.GRASS, value: -30 }];
        this.retreat = [card_types_1.CardType.COLORLESS, card_types_1.CardType.COLORLESS, card_types_1.CardType.COLORLESS];
        this.powers = [{
                name: 'Emergency Entry',
                powerType: game_1.PowerType.ABILITY,
                useFromHand: true,
                text: 'Once during your turn, if you drew this Pokémon from your deck at the beginning of your turn and your Bench isn\'t full, before you put it into your hand, you may put it onto your Bench. If you do, draw 3 cards.'
            }];
        this.attacks = [
            {
                name: 'Meteor Mash',
                cost: [card_types_1.CardType.METAL, card_types_1.CardType.COLORLESS],
                damage: 100,
                text: 'During your next turn, this Pokémon\'s Meteor Mash attack does 100 more damage (before applying Weakness and Resistance).'
            }
        ];
        this.set = 'SIT';
        this.cardImage = 'assets/cardback.png';
        this.setNumber = '119';
        this.name = 'Metagross';
        this.fullName = 'Metagross SIT';
        this.ATTACK_USED_MARKER = 'ATTACK_USED_MARKER';
        this.ATTACK_USED_2_MARKER = 'ATTACK_USED_2_MARKER';
    }
    reduceEffect(store, state, effect) {
        if (effect instanceof game_phase_effects_1.EndTurnEffect && effect.player.attackMarker.hasMarker(this.ATTACK_USED_2_MARKER, this)) {
            effect.player.attackMarker.removeMarker(this.ATTACK_USED_MARKER, this);
            effect.player.attackMarker.removeMarker(this.ATTACK_USED_2_MARKER, this);
            console.log('marker cleared');
        }
        if (effect instanceof game_phase_effects_1.EndTurnEffect && effect.player.attackMarker.hasMarker(this.ATTACK_USED_MARKER, this)) {
            effect.player.attackMarker.addMarker(this.ATTACK_USED_2_MARKER, this);
            console.log('second marker added');
        }
        // const player = state.players[state.activePlayer];
        // if (player.drewMetagross == true) {
        //   const slots: PokemonCardList[] = player.bench.filter(b => b.cards.length === 0);
        //   // No open slots, throw error
        //   if (slots.length === 0) {
        //     return state;
        //   }
        //   // Try to reduce PowerEffect, to check if something is blocking our ability
        //   try {
        //     const stub = new PowerEffect(player, {
        //       name: 'test',
        //       powerType: PowerType.ABILITY,
        //       text: ''
        //     }, this);
        //     store.reduceEffect(state, stub);
        //   } catch {
        //     return state;
        //   }
        //   state = store.prompt(state, new ConfirmPrompt(
        //     player.id,
        //     GameMessage.WANT_TO_USE_ABILITY,
        //   ), wantToUse => {
        //     if (wantToUse) {
        //       const cards = player.hand.cards.filter(c => c === this);
        //       cards.forEach(card => {
        //         player.hand.moveCardTo(card, slots[0]); // Move to Bench
        //       });
        //     }
        //   });
        // }
        if (effect instanceof game_effects_1.AttackEffect && effect.attack === this.attacks[0]) {
            // Check marker
            if (effect.player.attackMarker.hasMarker(this.ATTACK_USED_MARKER, this)) {
                console.log('attack added damage');
                effect.damage += 100;
            }
            effect.player.attackMarker.addMarker(this.ATTACK_USED_MARKER, this);
            console.log('marker added');
        }
        return state;
    }
}
exports.Metagross = Metagross;
