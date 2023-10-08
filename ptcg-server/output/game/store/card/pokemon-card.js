"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PokemonCard = void 0;
const game_effects_1 = require("../effects/game-effects");
const card_1 = require("./card");
const card_types_1 = require("./card-types");
class PokemonCard extends card_1.Card {
    constructor() {
        super(...arguments);
        this.superType = card_types_1.SuperType.POKEMON;
        this.cardType = card_types_1.CardType.NONE;
        this.cardTag = [];
        this.pokemonType = card_types_1.PokemonType.NORMAL;
        this.evolvesFrom = '';
        this.stage = card_types_1.Stage.BASIC;
        this.retreat = [];
        this.hp = 0;
        this.weakness = [];
        this.resistance = [];
        this.powers = [];
        this.attacks = [];
        this.format = card_types_1.Format.NONE;
        this.movedToActiveThisTurn = false;
    }
    reduceEffect(store, state, effect) {
        if (effect instanceof game_effects_1.AttackEffect) {
            for (let i = 0; i < this.attacks.length; i++) {
                if (effect.attack === this.attacks[i] && effect.attack.effect !== undefined) {
                    effect.attack.effect(store, state, effect);
                }
            }
        }
        else if (effect instanceof game_effects_1.PowerEffect) {
            for (let i = 0; i < this.powers.length; i++) {
                if (effect.power === this.powers[i] && effect.power.effect !== undefined) {
                    effect.power.effect(store, state, effect);
                }
            }
        }
        return state;
    }
}
exports.PokemonCard = PokemonCard;
