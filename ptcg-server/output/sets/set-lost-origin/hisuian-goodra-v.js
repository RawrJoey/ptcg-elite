"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HisuianGoodraV = void 0;
const card_types_1 = require("../../game/store/card/card-types");
const game_message_1 = require("../../game/game-message");
const game_1 = require("../../game");
const game_effects_1 = require("../../game/store/effects/game-effects");
const attack_effects_1 = require("../../game/store/effects/attack-effects");
const game_phase_effects_1 = require("../../game/store/effects/game-phase-effects");
class HisuianGoodraV extends game_1.PokemonCard {
    constructor() {
        super(...arguments);
        this.stage = card_types_1.Stage.BASIC;
        this.tags = [card_types_1.CardTag.POKEMON_V];
        this.regulationMark = 'F';
        this.cardType = card_types_1.CardType.DRAGON;
        this.hp = 220;
        this.retreat = [card_types_1.CardType.COLORLESS, card_types_1.CardType.COLORLESS, card_types_1.CardType.COLORLESS];
        this.attacks = [
            {
                name: 'Slip-\'n\'-Trip',
                cost: [card_types_1.CardType.WATER, card_types_1.CardType.METAL],
                damage: 60,
                text: 'Your opponent switches their Active Pokémon with 1 of their Benched Pokémon.'
            },
            {
                name: 'Rolling Shell',
                cost: [card_types_1.CardType.WATER, card_types_1.CardType.METAL, card_types_1.CardType.COLORLESS],
                damage: 140,
                text: 'During your opponent\'s next turn, this Pokémon takes 30 less damage from attacks (after applying Weakness and Resistance).'
            }
        ];
        this.set = 'LOR';
        this.cardImage = 'assets/cardback.png';
        this.setNumber = '135';
        this.name = 'Hisuian Goodra V';
        this.fullName = 'Hisuian Goodra V LOR';
        this.ROLLING_SHELL_MARKER = 'ROLLING_SHELL_MARKER';
        this.CLEAR_ROLLING_SHELL_MARKER = 'CLEAR_ROLLING_SHELL_MARKER';
    }
    reduceEffect(store, state, effect) {
        if (effect instanceof game_effects_1.AttackEffect && effect.attack === this.attacks[0]) {
            const player = effect.player;
            const opponent = game_1.StateUtils.getOpponent(state, player);
            const opponentHasBenched = opponent.bench.some(b => b.cards.length > 0);
            if (!opponentHasBenched) {
                return state;
            }
            return store.prompt(state, new game_1.ChoosePokemonPrompt(opponent.id, game_message_1.GameMessage.CHOOSE_NEW_ACTIVE_POKEMON, game_1.PlayerType.BOTTOM_PLAYER, [game_1.SlotType.BENCH], { allowCancel: false }), selected => {
                if (!selected || selected.length === 0) {
                    return state;
                }
                const target = selected[0];
                opponent.switchPokemon(target);
            });
        }
        if (effect instanceof game_effects_1.AttackEffect && effect.attack === this.attacks[1]) {
            const player = effect.player;
            const opponent = game_1.StateUtils.getOpponent(state, player);
            player.active.marker.addMarker(this.ROLLING_SHELL_MARKER, this);
            opponent.marker.addMarker(this.CLEAR_ROLLING_SHELL_MARKER, this);
            if (effect instanceof attack_effects_1.PutDamageEffect
                && effect.target.marker.hasMarker(this.ROLLING_SHELL_MARKER)) {
                effect.damage -= 30;
                return state;
            }
            if (effect instanceof game_phase_effects_1.EndTurnEffect
                && effect.player.marker.hasMarker(this.CLEAR_ROLLING_SHELL_MARKER, this)) {
                effect.player.marker.removeMarker(this.CLEAR_ROLLING_SHELL_MARKER, this);
                const opponent = game_1.StateUtils.getOpponent(state, effect.player);
                opponent.forEachPokemon(game_1.PlayerType.TOP_PLAYER, (cardList) => {
                    cardList.marker.removeMarker(this.ROLLING_SHELL_MARKER, this);
                });
            }
            return state;
        }
        return state;
    }
}
exports.HisuianGoodraV = HisuianGoodraV;
