"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrimeCatcher = void 0;
const trainer_card_1 = require("../../game/store/card/trainer-card");
const card_types_1 = require("../../game/store/card/card-types");
const play_card_effects_1 = require("../../game/store/effects/play-card-effects");
const game_message_1 = require("../../game/game-message");
const choose_pokemon_prompt_1 = require("../../game/store/prompts/choose-pokemon-prompt");
const play_card_action_1 = require("../../game/store/actions/play-card-action");
const state_utils_1 = require("../../game/store/state-utils");
const game_1 = require("../../game");
function* playCard(next, store, state, effect) {
    const player = effect.player;
    const opponent = state_utils_1.StateUtils.getOpponent(state, player);
    // Don't allow to play both Prime Catchers when opponen has an empty bench
    const benchCount = opponent.bench.reduce((sum, b) => {
        return sum + (b.cards.length > 0 ? 1 : 0);
    }, 0);
    //let playTwoCards = false;
    if (benchCount > 0) {
        // playTwoCards = true;
        const hasBench = player.bench.some(b => b.cards.length > 0);
        if (hasBench === false) {
            throw new game_1.GameError(game_message_1.GameMessage.CANNOT_PLAY_THIS_CARD);
        }
        return store.prompt(state, new choose_pokemon_prompt_1.ChoosePokemonPrompt(player.id, game_message_1.GameMessage.CHOOSE_POKEMON_TO_SWITCH, play_card_action_1.PlayerType.TOP_PLAYER, [play_card_action_1.SlotType.BENCH], { allowCancel: false }), targets => {
            if (!targets || targets.length === 0) {
                return;
            }
            opponent.active.clearEffects();
            opponent.switchPokemon(targets[0]);
            next();
            // Do not discard the card yet
            effect.preventDefault = true;
            let target = [];
            return store.prompt(state, new choose_pokemon_prompt_1.ChoosePokemonPrompt(player.id, game_message_1.GameMessage.CHOOSE_POKEMON_TO_SWITCH, play_card_action_1.PlayerType.BOTTOM_PLAYER, [play_card_action_1.SlotType.BENCH], { allowCancel: false }), results => {
                target = results || [];
                next();
                if (target.length === 0) {
                    return state;
                }
                // Discard trainer only when user selected a Pokemon
                player.active.clearEffects();
                player.switchPokemon(target[0]);
                player.supporter.moveCardTo(effect.trainerCard, player.discard);
                return state;
            });
        });
    }
}
class PrimeCatcher extends trainer_card_1.TrainerCard {
    constructor() {
        super(...arguments);
        this.trainerType = card_types_1.TrainerType.ITEM;
        this.tags = [card_types_1.CardTag.ACE_SPEC];
        this.regulationMark = 'H';
        this.cardImage = 'assets/cardback.png';
        this.setNumber = '157';
        this.set = 'TEF';
        this.name = 'Prime Catcher';
        this.fullName = 'Prime Catcher TEF';
        this.text = 'Switch in 1 of your opponent\'s Benched Pokémon to the Active Spot. If you do, switch your Active Pokémon with 1 of your Benched Pokémon.';
    }
    reduceEffect(store, state, effect) {
        if (effect instanceof play_card_effects_1.TrainerEffect && effect.trainerCard === this) {
            const generator = playCard(() => generator.next(), store, state, effect);
            return generator.next().value;
        }
        return state;
    }
}
exports.PrimeCatcher = PrimeCatcher;
