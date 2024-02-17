"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DowsingMachine = void 0;
const trainer_card_1 = require("../../game/store/card/trainer-card");
const card_types_1 = require("../../game/store/card/card-types");
const play_card_effects_1 = require("../../game/store/effects/play-card-effects");
const game_error_1 = require("../../game/game-error");
const game_message_1 = require("../../game/game-message");
const choose_cards_prompt_1 = require("../../game/store/prompts/choose-cards-prompt");
const card_list_1 = require("../../game/store/state/card-list");
function* playCard(next, store, state, self, effect) {
    const player = effect.player;
    let cards = [];
    cards = player.hand.cards.filter(c => c !== self);
    if (cards.length < 2) {
        throw new game_error_1.GameError(game_message_1.GameMessage.CANNOT_PLAY_THIS_CARD);
    }
    let trainersInDiscard = 0;
    player.discard.cards.forEach(c => {
        if (c instanceof trainer_card_1.TrainerCard) {
            trainersInDiscard += 1;
        }
    });
    if (trainersInDiscard === 0) {
        throw new game_error_1.GameError(game_message_1.GameMessage.CANNOT_PLAY_THIS_CARD);
    }
    // We will discard this card after prompt confirmation
    effect.preventDefault = true;
    // prepare card list without Junk Arm
    const handTemp = new card_list_1.CardList();
    handTemp.cards = player.hand.cards.filter(c => c !== self);
    cards = [];
    yield store.prompt(state, new choose_cards_prompt_1.ChooseCardsPrompt(player.id, game_message_1.GameMessage.CHOOSE_CARD_TO_DISCARD, handTemp, {}, { min: 2, max: 2, allowCancel: true }), selected => {
        cards = selected || [];
        next();
    });
    // Operation canceled by the user
    if (cards.length === 0) {
        return state;
    }
    let recovered = [];
    yield store.prompt(state, new choose_cards_prompt_1.ChooseCardsPrompt(player.id, game_message_1.GameMessage.CHOOSE_CARD_TO_HAND, player.discard, { superType: card_types_1.SuperType.TRAINER }, { min: 1, max: 1, allowCancel: true }), selected => {
        recovered = selected || [];
        next();
    });
    // Operation cancelled by the user
    if (recovered.length === 0) {
        return state;
    }
    player.hand.moveCardTo(self, player.discard);
    player.hand.moveCardsTo(cards, player.discard);
    player.discard.moveCardsTo(recovered, player.hand);
    return state;
}
class DowsingMachine extends trainer_card_1.TrainerCard {
    constructor() {
        super(...arguments);
        this.trainerType = card_types_1.TrainerType.ITEM;
        this.tags = [card_types_1.CardTag.ACE_SPEC];
        this.set = 'PLS';
        this.name = 'Dowsing Machine';
        this.fullName = 'Dowsing Machine PLS';
        this.cardImage = 'assets/cardback.png';
        this.setNumber = '128';
        this.text = 'Discard 2 cards from your hand. (If you can\'t discard 2 cards, ' +
            'you can\'t play this card.) Put a Trainer card from your discard ' +
            'pile into your hand.';
    }
    reduceEffect(store, state, effect) {
        if (effect instanceof play_card_effects_1.TrainerEffect && effect.trainerCard === this) {
            const generator = playCard(() => generator.next(), store, state, this, effect);
            return generator.next().value;
        }
        return state;
    }
}
exports.DowsingMachine = DowsingMachine;
