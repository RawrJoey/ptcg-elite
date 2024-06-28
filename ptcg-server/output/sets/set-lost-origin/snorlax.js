"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Snorlax = void 0;
const game_1 = require("../../game");
const card_types_1 = require("../../game/store/card/card-types");
const pokemon_card_1 = require("../../game/store/card/pokemon-card");
const pokemon_types_1 = require("../../game/store/card/pokemon-types");
const attack_effects_1 = require("../../game/store/effects/attack-effects");
const game_effects_1 = require("../../game/store/effects/game-effects");
const game_phase_effects_1 = require("../../game/store/effects/game-phase-effects");
const state_utils_1 = require("../../game/store/state-utils");
class Snorlax extends pokemon_card_1.PokemonCard {
    constructor() {
        super(...arguments);
        this.stage = card_types_1.Stage.BASIC;
        this.cardType = card_types_1.CardType.COLORLESS;
        this.regulationMark = 'F';
        this.hp = 150;
        this.weakness = [{ type: card_types_1.CardType.FIGHTING }];
        this.retreat = [card_types_1.CardType.COLORLESS, card_types_1.CardType.COLORLESS, card_types_1.CardType.COLORLESS, card_types_1.CardType.COLORLESS];
        this.powers = [{
                name: 'Unfazed Fat',
                powerType: pokemon_types_1.PowerType.ABILITY,
                text: 'Prevent all effects of attacks from your opponent\'s Pokémon done to this Pokémon. (Damage is not an effect.)'
            }];
        this.attacks = [{
                name: 'Thumping Snore',
                cost: [card_types_1.CardType.COLORLESS, card_types_1.CardType.COLORLESS, card_types_1.CardType.COLORLESS],
                damage: 180,
                text: 'This Pokémon is now Asleep. During Pokémon Checkup, flip 2 coins instead of 1. If either of them is tails, this Pokémon is still Asleep.'
            }];
        this.set = 'LOR';
        this.cardImage = 'assets/cardback.png';
        this.setNumber = '143';
        this.name = 'Snorlax';
        this.fullName = 'Snorlax LOR';
    }
    reduceEffect(store, state, effect) {
        if (effect instanceof game_phase_effects_1.BetweenTurnsEffect && effect.player.active.cards.includes(this)) {
            // we will handle sleep here
            effect.preventDefault = true;
            const player = effect.player;
            store.prompt(state, [
                new game_1.CoinFlipPrompt(player.id, game_1.GameMessage.COIN_FLIP),
                new game_1.CoinFlipPrompt(player.id, game_1.GameMessage.COIN_FLIP)
            ], results => {
                if (results.every(r => r)) {
                    effect.player.active.removeSpecialCondition(card_types_1.SpecialCondition.ASLEEP);
                }
            });
            return state;
        }
        if (effect instanceof game_effects_1.AttackEffect && effect.attack === this.attacks[0]) {
            const specialConditionEffect = new attack_effects_1.AddSpecialConditionsEffect(effect, [card_types_1.SpecialCondition.ASLEEP]);
            specialConditionEffect.target = effect.player.active;
            store.reduceEffect(state, specialConditionEffect);
        }
        if (effect instanceof attack_effects_1.AbstractAttackEffect && effect.target.cards.includes(this)) {
            const pokemonCard = effect.target.getPokemonCard();
            const sourceCard = effect.source.getPokemonCard();
            // pokemon is evolved
            if (pokemonCard !== this) {
                return state;
            }
            if (sourceCard) {
                // eslint-disable-next-line indent
                // Allow damage
                if (effect instanceof attack_effects_1.PutDamageEffect) {
                    return state;
                }
                if (effect instanceof attack_effects_1.DealDamageEffect) {
                    return state;
                }
                // Try to reduce PowerEffect, to check if something is blocking our ability
                try {
                    const player = state_utils_1.StateUtils.findOwner(state, effect.target);
                    const powerEffect = new game_effects_1.PowerEffect(player, this.powers[0], this);
                    store.reduceEffect(state, powerEffect);
                }
                catch (_a) {
                    return state;
                }
                effect.preventDefault = true;
            }
            return state;
        }
        return state;
    }
}
exports.Snorlax = Snorlax;
