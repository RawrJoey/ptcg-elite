"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CryptomaniacsDeciphering = void 0;
const trainer_card_1 = require("../../game/store/card/trainer-card");
const card_types_1 = require("../../game/store/card/card-types");
const play_card_effects_1 = require("../../game/store/effects/play-card-effects");
const game_error_1 = require("../../game/game-error");
const game_message_1 = require("../../game/game-message");
const choose_cards_prompt_1 = require("../../game/store/prompts/choose-cards-prompt");
const card_list_1 = require("../../game/store/state/card-list");
const shuffle_prompt_1 = require("../../game/store/prompts/shuffle-prompt");
const game_1 = require("../../game");
function* playCard(next, store, state, self, effect) {
    const player = effect.player;
    let cards = [];
    const supporterTurn = player.supporterTurn;
    if (supporterTurn > 0) {
        throw new game_error_1.GameError(game_message_1.GameMessage.SUPPORTER_ALREADY_PLAYED);
    }
    player.hand.moveCardTo(effect.trainerCard, player.supporter);
    // We will discard this card after prompt confirmation
    effect.preventDefault = true;
    if (player.deck.cards.length === 0) {
        throw new game_error_1.GameError(game_message_1.GameMessage.CANNOT_PLAY_THIS_CARD);
    }
    const deckTop = new card_list_1.CardList();
    yield store.prompt(state, new choose_cards_prompt_1.ChooseCardsPrompt(player.id, game_message_1.GameMessage.CHOOSE_CARD_TO_HAND, player.deck, {}, { min: 2, max: 2, allowCancel: false }), selected => {
        cards = selected || [];
        next();
    });
    player.deck.moveCardsTo(cards, deckTop);
    return store.prompt(state, new shuffle_prompt_1.ShuffleDeckPrompt(player.id), order => {
        player.deck.applyOrder(order);
        return store.prompt(state, new game_1.OrderCardsPrompt(player.id, game_message_1.GameMessage.CHOOSE_CARDS_ORDER, deckTop, { allowCancel: false }), order => {
            if (order === null) {
                return state;
            }
            deckTop.applyOrder(order);
            deckTop.moveTo(player.deck);
            player.supporter.moveCardTo(effect.trainerCard, player.discard);
            player.supporterTurn = 1;
        });
    });
}
class CryptomaniacsDeciphering extends trainer_card_1.TrainerCard {
    constructor() {
        super(...arguments);
        this.regulationMark = 'H';
        this.trainerType = card_types_1.TrainerType.SUPPORTER;
        this.tags = [card_types_1.CardTag.FUTURE];
        this.set = 'TEF';
        this.cardImage = 'assets/cardback.png';
        this.setNumber = '145';
        this.name = 'Ciphermaniac\'s Deciphering';
        this.fullName = 'Ciphermaniac\'s Deciphering TEF';
        this.text = 'Search your deck for 2 cards, shuffle your deck, then put those cards on top of it in any order.';
    }
    reduceEffect(store, state, effect) {
        if (effect instanceof play_card_effects_1.TrainerEffect && effect.trainerCard === this) {
            const generator = playCard(() => generator.next(), store, state, this, effect);
            return generator.next().value;
        }
        return state;
    }
}
exports.CryptomaniacsDeciphering = CryptomaniacsDeciphering;
