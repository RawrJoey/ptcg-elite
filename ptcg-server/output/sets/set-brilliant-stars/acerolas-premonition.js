"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcerolasPremonition = void 0;
const game_message_1 = require("../../game/game-message");
const trainer_card_1 = require("../../game/store/card/trainer-card");
const card_types_1 = require("../../game/store/card/card-types");
const state_utils_1 = require("../../game/store/state-utils");
const play_card_effects_1 = require("../../game/store/effects/play-card-effects");
const show_cards_prompt_1 = require("../../game/store/prompts/show-cards-prompt");
class AcerolasPremonition extends trainer_card_1.TrainerCard {
    constructor() {
        super(...arguments);
        this.trainerType = card_types_1.TrainerType.SUPPORTER;
        this.set = 'BRS';
        this.regulationMark = 'F';
        this.cardImage = 'assets/cardback.png';
        this.setNumber = '129';
        this.name = 'Acerola\'s Premonition';
        this.fullName = 'Acerola\'s Premonition BRS';
        this.text = 'Your opponent reveals their hand, and you draw a card for each Trainer card you find there.';
    }
    reduceEffect(store, state, effect) {
        if (effect instanceof play_card_effects_1.TrainerEffect && effect.trainerCard === this) {
            const player = effect.player;
            const opponent = state_utils_1.StateUtils.getOpponent(state, player);
            const cardsInOpponentHand = opponent.hand.cards.filter(card => card instanceof trainer_card_1.TrainerCard);
            state = store.prompt(state, new show_cards_prompt_1.ShowCardsPrompt(opponent.id, game_message_1.GameMessage.CARDS_SHOWED_BY_THE_OPPONENT, opponent.hand.cards), () => {
                const cardsToMove = opponent.hand.cards.slice(0, cardsInOpponentHand.length * 1);
                player.deck.moveCardsTo(cardsToMove, player.hand);
            });
        }
        return state;
    }
}
exports.AcerolasPremonition = AcerolasPremonition;
