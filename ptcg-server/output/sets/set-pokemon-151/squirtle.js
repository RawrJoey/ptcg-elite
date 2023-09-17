"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Squirtle = void 0;
const pokemon_card_1 = require("../../game/store/card/pokemon-card");
const card_types_1 = require("../../game/store/card/card-types");
const coin_flip_prompt_1 = require("../../game/store/prompts/coin-flip-prompt");
const game_message_1 = require("../../game/game-message");
const state_utils_1 = require("../../game/store/state-utils");
const play_card_action_1 = require("../../game/store/actions/play-card-action");
const game_phase_effects_1 = require("../../game/store/effects/game-phase-effects");
const attack_effects_1 = require("../../game/store/effects/attack-effects");
const game_effects_1 = require("../../game/store/effects/game-effects");
class Squirtle extends pokemon_card_1.PokemonCard {
    constructor() {
        super(...arguments);
        this.regulationMark = 'G';
        this.stage = card_types_1.Stage.BASIC;
        this.cardType = card_types_1.CardType.WATER;
        this.hp = 60;
        this.weakness = [{
                type: card_types_1.CardType.LIGHTNING,
            }];
        this.retreat = [card_types_1.CardType.COLORLESS];
        this.attacks = [{
                name: 'Withdraw',
                cost: [card_types_1.CardType.WATER],
                damage: 0,
                text: 'Flip a coin. If heads, prevent all damage done to Squirtle by ' +
                    'attacks during your opponent\'s next turn.'
            }, {
                name: 'Skull Bash',
                cost: [card_types_1.CardType.WATER, card_types_1.CardType.WATER],
                damage: 20,
                text: ''
            }];
        this.set = '151';
        this.name = 'Squirtle';
        this.fullName = 'Squirtle MEW 007';
        this.CLEAR_WITHDRAW_MARKER = 'CLEAR_WITHDRAW_MARKER';
        this.WITHDRAW_MARKER = 'WITHDRAW_MARKER';
    }
    reduceEffect(store, state, effect) {
        if (effect instanceof game_effects_1.AttackEffect && effect.attack === this.attacks[0]) {
            const player = effect.player;
            const opponent = state_utils_1.StateUtils.getOpponent(state, player);
            return store.prompt(state, new coin_flip_prompt_1.CoinFlipPrompt(player.id, game_message_1.GameMessage.COIN_FLIP), flipResult => {
                if (flipResult) {
                    player.active.marker.addMarker(this.WITHDRAW_MARKER, this);
                    opponent.marker.addMarker(this.CLEAR_WITHDRAW_MARKER, this);
                }
            });
        }
        if (effect instanceof attack_effects_1.PutDamageEffect
            && effect.target.marker.hasMarker(this.WITHDRAW_MARKER)) {
            effect.preventDefault = true;
            return state;
        }
        if (effect instanceof game_phase_effects_1.EndTurnEffect
            && effect.player.marker.hasMarker(this.CLEAR_WITHDRAW_MARKER, this)) {
            effect.player.marker.removeMarker(this.CLEAR_WITHDRAW_MARKER, this);
            const opponent = state_utils_1.StateUtils.getOpponent(state, effect.player);
            opponent.forEachPokemon(play_card_action_1.PlayerType.TOP_PLAYER, (cardList) => {
                cardList.marker.removeMarker(this.WITHDRAW_MARKER, this);
            });
        }
        return state;
    }
}
exports.Squirtle = Squirtle;
