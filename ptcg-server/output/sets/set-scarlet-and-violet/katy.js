"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Katy = void 0;
const play_card_effects_1 = require("../../game/store/effects/play-card-effects");
const trainer_card_1 = require("../../game/store/card/trainer-card");
const card_types_1 = require("../../game/store/card/card-types");
const shuffle_prompt_1 = require("../../game/store/prompts/shuffle-prompt");
const game_phase_effects_1 = require("../../game/store/effects/game-phase-effects");
function* playCard(next, store, state, self, effect) {
    const player = effect.player;
    const cards = player.hand.cards.filter(c => c !== self);
    if (cards.length > 0) {
        player.hand.moveCardsTo(cards, player.deck);
        yield store.prompt(state, new shuffle_prompt_1.ShuffleDeckPrompt(player.id), order => {
            player.deck.applyOrder(order);
            next();
        });
    }
    player.deck.moveTo(player.hand, 8);
    const endTurnEffect = new game_phase_effects_1.EndTurnEffect(player);
    store.reduceEffect(state, endTurnEffect);
    return state;
}
class Katy extends trainer_card_1.TrainerCard {
    constructor() {
        super(...arguments);
        this.trainerType = card_types_1.TrainerType.SUPPORTER;
        this.regulationMark = 'F';
        this.set = 'SVI';
        this.cardImage = 'assets/cardback.png';
        this.setNumber = '177';
        this.name = 'Katy';
        this.fullName = 'Katy SVI';
        this.text = 'Shuffle your hand into your deck. Then, draw 8 cards. Your turn ends.';
    }
    reduceEffect(store, state, effect) {
        if (effect instanceof play_card_effects_1.TrainerEffect && effect.trainerCard === this) {
            const generator = playCard(() => generator.next(), store, state, this, effect);
            return generator.next().value;
        }
        return state;
    }
}
exports.Katy = Katy;
