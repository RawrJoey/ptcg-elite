"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Eri = void 0;
const trainer_card_1 = require("../../game/store/card/trainer-card");
const card_types_1 = require("../../game/store/card/card-types");
const play_card_effects_1 = require("../../game/store/effects/play-card-effects");
const game_1 = require("../../game");
class Eri extends trainer_card_1.TrainerCard {
    constructor() {
        super(...arguments);
        this.regulationMark = 'H';
        this.trainerType = card_types_1.TrainerType.SUPPORTER;
        this.set = 'TEF';
        this.cardImage = 'assets/cardback.png';
        this.setNumber = '146';
        this.name = 'Eri';
        this.fullName = 'Eri TEF';
        this.text = 'Your opponent reveals their hand. Discard up to 2 Item cards you find there.';
    }
    reduceEffect(store, state, effect) {
        if (effect instanceof play_card_effects_1.TrainerEffect && effect.trainerCard === this) {
            const player = effect.player;
            const opponent = game_1.StateUtils.getOpponent(state, player);
            const supporterTurn = player.supporterTurn;
            if (supporterTurn > 0) {
                throw new game_1.GameError(game_1.GameMessage.SUPPORTER_ALREADY_PLAYED);
            }
            player.hand.moveCardTo(effect.trainerCard, player.supporter);
            // We will discard this card after prompt confirmation
            effect.preventDefault = true;
            return store.prompt(state, new game_1.ChooseCardsPrompt(player, game_1.GameMessage.CHOOSE_CARD_TO_DISCARD, opponent.hand, { superType: card_types_1.SuperType.TRAINER, trainerType: card_types_1.TrainerType.ITEM }, { allowCancel: false, min: 0, max: 2 }), cards => {
                if (cards === null || cards.length === 0) {
                    player.supporter.moveCardTo(this, player.discard);
                    return;
                }
                player.supporter.moveCardTo(this, player.discard);
                cards.forEach(card => {
                    opponent.hand.moveCardTo(card, opponent.discard);
                });
            });
        }
        return state;
    }
}
exports.Eri = Eri;
