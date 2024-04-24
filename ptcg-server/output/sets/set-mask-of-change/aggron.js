"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Aggron = void 0;
const card_types_1 = require("../../game/store/card/card-types");
const game_1 = require("../../game");
const game_effects_1 = require("../../game/store/effects/game-effects");
const attack_effects_1 = require("../../game/store/effects/attack-effects");
const game_phase_effects_1 = require("../../game/store/effects/game-phase-effects");
class Aggron extends game_1.PokemonCard {
    constructor() {
        super(...arguments);
        this.stage = card_types_1.Stage.STAGE_2;
        this.evolvesFrom = 'Lairon';
        this.regulationMark = 'H';
        this.cardType = card_types_1.CardType.METAL;
        this.weakness = [{ type: card_types_1.CardType.FIRE }];
        this.resistance = [{ type: card_types_1.CardType.FIRE, value: -30 }];
        this.hp = 180;
        this.retreat = [card_types_1.CardType.COLORLESS, card_types_1.CardType.COLORLESS, card_types_1.CardType.COLORLESS];
        this.attacks = [
            {
                name: 'Angry Slam',
                cost: [card_types_1.CardType.METAL],
                damage: 50,
                text: 'This attack does 50 damage for each of your Pokémon that has any damage counters on it.'
            },
            {
                name: 'Guard Claw',
                cost: [card_types_1.CardType.METAL, card_types_1.CardType.COLORLESS, card_types_1.CardType.COLORLESS],
                damage: 120,
                text: 'During your opponent\'s next turn, this Pokémon takes 50 less damage from attacks (after applying Weakness and Resistance).'
            }
        ];
        this.set = 'SV6';
        this.cardImage = 'assets/cardback.png';
        this.setNumber = '75';
        this.name = 'Aggron';
        this.fullName = 'Aggron SV6';
        this.GUARD_CLAW_MARKER = 'GUARD_CLAW_MARKER';
        this.CLEAR_GUARD_CLAW_MARKER = 'CLEAR_GUARD_CLAW_MARKER';
    }
    reduceEffect(store, state, effect) {
        if (effect instanceof game_effects_1.AttackEffect && effect.attack === this.attacks[0]) {
            const player = effect.player;
            const hasBenched = player.bench.some(b => b.cards.length > 0);
            if (!hasBenched) {
                throw new game_1.GameError(game_1.GameMessage.CANNOT_USE_ATTACK);
            }
            let benchPokemonWithDamage = 0;
            player.forEachPokemon(game_1.PlayerType.BOTTOM_PLAYER, (cardList, card, target) => {
                if (cardList.damage !== 0) {
                    benchPokemonWithDamage++;
                }
            });
            effect.damage = benchPokemonWithDamage * 50;
        }
        if (effect instanceof game_effects_1.AttackEffect && effect.attack === this.attacks[1]) {
            const player = effect.player;
            const opponent = game_1.StateUtils.getOpponent(state, player);
            player.active.marker.addMarker(this.GUARD_CLAW_MARKER, this);
            opponent.marker.addMarker(this.CLEAR_GUARD_CLAW_MARKER, this);
            if (effect instanceof attack_effects_1.PutDamageEffect
                && effect.target.marker.hasMarker(this.GUARD_CLAW_MARKER)) {
                effect.damage -= 50;
                return state;
            }
            if (effect instanceof game_phase_effects_1.EndTurnEffect
                && effect.player.marker.hasMarker(this.CLEAR_GUARD_CLAW_MARKER, this)) {
                effect.player.marker.removeMarker(this.CLEAR_GUARD_CLAW_MARKER, this);
                const opponent = game_1.StateUtils.getOpponent(state, effect.player);
                opponent.forEachPokemon(game_1.PlayerType.TOP_PLAYER, (cardList) => {
                    cardList.marker.removeMarker(this.GUARD_CLAW_MARKER, this);
                });
                return state;
            }
            return state;
        }
        return state;
    }
}
exports.Aggron = Aggron;
