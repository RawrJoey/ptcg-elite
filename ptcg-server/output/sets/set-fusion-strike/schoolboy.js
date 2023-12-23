"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Schoolboy = void 0;
const game_error_1 = require("../../game/game-error");
const game_message_1 = require("../../game/game-message");
const play_card_effects_1 = require("../../game/store/effects/play-card-effects");
const trainer_card_1 = require("../../game/store/card/trainer-card");
const card_types_1 = require("../../game/store/card/card-types");
const __1 = require("../..");
class Schoolboy extends trainer_card_1.TrainerCard {
    constructor() {
        super(...arguments);
        this.trainerType = card_types_1.TrainerType.SUPPORTER;
        this.regulationMark = 'E';
        this.set = 'FST';
        this.set2 = 'fusionstrike';
        this.setNumber = '238';
        this.name = 'Schoolboy';
        this.fullName = 'Schoolboy FST';
        this.text = 'Draw 2 cards. If your opponent has exactly 2, 4, or 6 Prize cards remaining, draw 2 more cards.';
    }
    reduceEffect(store, state, effect) {
        if (effect instanceof play_card_effects_1.TrainerEffect && effect.trainerCard === this) {
            const player = effect.player;
            const opponent = __1.StateUtils.getOpponent(state, player);
            if (player.deck.cards.length === 0) {
                throw new game_error_1.GameError(game_message_1.GameMessage.CANNOT_PLAY_THIS_CARD);
            }
            player.deck.moveTo(player.hand, 2);
            if (opponent.getPrizeLeft() === 1 || opponent.getPrizeLeft() === 3 || opponent.getPrizeLeft() === 5) {
                player.deck.moveTo(player.hand, 2);
            }
            return state;
        }
        return state;
    }
}
exports.Schoolboy = Schoolboy;
