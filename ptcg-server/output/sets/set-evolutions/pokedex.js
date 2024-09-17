"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pokedex = void 0;
const game_1 = require("../../game");
const card_types_1 = require("../../game/store/card/card-types");
const trainer_card_1 = require("../../game/store/card/trainer-card");
const play_card_effects_1 = require("../../game/store/effects/play-card-effects");
class Pokedex extends trainer_card_1.TrainerCard {
    constructor() {
        super(...arguments);
        this.trainerType = card_types_1.TrainerType.ITEM;
        this.set = 'EVO'; // Replace with the appropriate set abbreviation
        this.name = 'Pokedex';
        this.fullName = 'Pokedex EVO'; // Replace with the appropriate set abbreviation
        this.cardImage = 'assets/cardback.png'; // Replace with the appropriate card image path
        this.setNumber = '82'; // Replace with the appropriate set number
        this.text = 'Look at the top 5 cards of your deck and put them back on top of your deck in any order.';
    }
    reduceEffect(store, state, effect) {
        if (effect instanceof play_card_effects_1.TrainerEffect && effect.trainerCard === this) {
            const player = effect.player;
            const deckTop = new game_1.CardList();
            // Get up to 5 cards from the top of the deck
            player.deck.moveTo(deckTop, 5);
            // We will discard this card after prompt confirmation
            effect.preventDefault = true;
            return store.prompt(state, new game_1.OrderCardsPrompt(player.id, game_1.GameMessage.CHOOSE_CARDS_ORDER, deckTop, { allowCancel: false }), order => {
                if (order === null) {
                    return state;
                }
                deckTop.applyOrder(order);
                deckTop.moveToTopOfDestination(player.deck);
                player.supporter.moveCardTo(effect.trainerCard, player.discard);
            });
        }
        return state;
    }
}
exports.Pokedex = Pokedex;
