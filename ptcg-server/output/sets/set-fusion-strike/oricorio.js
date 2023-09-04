"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Oricorio = void 0;
const pokemon_card_1 = require("../../game/store/card/pokemon-card");
const card_types_1 = require("../../game/store/card/card-types");
const state_1 = require("../../game/store/state/state");
const game_effects_1 = require("../../game/store/effects/game-effects");
const attack_effects_1 = require("../../game/store/effects/attack-effects");
const pokemon_types_1 = require("../../game/store/card/pokemon-types");
const state_utils_1 = require("../../game/store/state-utils");
class Oricorio extends pokemon_card_1.PokemonCard {
    constructor() {
        super(...arguments);
        this.tags = [card_types_1.CardTag.FUSION_STRIKE];
        this.stage = card_types_1.Stage.BASIC;
        this.cardType = card_types_1.CardType.FIRE;
        this.hp = 90;
        this.weakness = [{ type: card_types_1.CardType.WATER }];
        this.retreat = [card_types_1.CardType.COLORLESS];
        this.powers = [{
                name: 'Bouffer',
                powerType: pokemon_types_1.PowerType.ABILITY,
                text: 'Any damage done to this Pokemon by attacks is reduced by 20 ' +
                    '(after applying Weakness and Resistance).'
            }];
        this.attacks = [{
                name: 'Gold Breaker',
                cost: [card_types_1.CardType.FIRE, card_types_1.CardType.COLORLESS],
                damage: 0,
                text: 'Put 5 damage counters on your opponent\'s Pokémon in ' +
                    'any way you like.'
            }];
        this.set = 'FST';
        this.name = 'Oricorio';
        this.fullName = 'Oricorio FST';
    }
    reduceEffect(store, state, effect) {
        if (effect instanceof game_effects_1.AttackEffect && effect.attack === this.attacks[0]) {
            const player = effect.player;
            const opponent = state_utils_1.StateUtils.getOpponent(state, player);
            const defending = opponent.active.getPokemonCard();
            if (defending && defending.tags.includes(card_types_1.CardTag.POKEMON_EX)) {
                effect.damage += 60;
            }
        }
        // Reduce damage by 20
        if (effect instanceof attack_effects_1.PutDamageEffect && effect.target.cards.includes(this)) {
            const pokemonCard = effect.target.getPokemonCard();
            // It's not this pokemon card
            if (pokemonCard !== this) {
                return state;
            }
            // It's not an attack
            if (state.phase !== state_1.GamePhase.ATTACK) {
                return state;
            }
            const player = state_utils_1.StateUtils.findOwner(state, effect.target);
            // Try to reduce PowerEffect, to check if something is blocking our ability
            try {
                const powerEffect = new game_effects_1.PowerEffect(player, this.powers[0], this);
                store.reduceEffect(state, powerEffect);
            }
            catch (_a) {
                return state;
            }
            if (effect.target.cards.some(c => c.tags.includes(card_types_1.CardTag.FUSION_STRIKE))) {
                effect.damage = Math.max(0, effect.damage - 20);
            }
            return state;
        }
        return state;
    }
}
exports.Oricorio = Oricorio;
