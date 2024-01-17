"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PathToThePeak = void 0;
const state_utils_1 = require("../../game/store/state-utils");
const trainer_card_1 = require("../../game/store/card/trainer-card");
const card_types_1 = require("../../game/store/card/card-types");
const game_effects_1 = require("../../game/store/effects/game-effects");
const game_1 = require("../../game");
const check_effects_1 = require("../../game/store/effects/check-effects");
class PathToThePeak extends trainer_card_1.TrainerCard {
    constructor() {
        super(...arguments);
        this.trainerType = card_types_1.TrainerType.STADIUM;
        this.set = 'CRE';
        this.cardImage = 'assets/cardback.png';
        this.setNumber = '148';
        this.regulationMark = 'E';
        this.name = 'Path to the Peak';
        this.fullName = 'Path to the Peak CRE 148';
        this.text = 'Pokémon with a Rule Box in play (both yours and your opponent\'s) have no Abilities. (Pokémon V, Pokémon-GX, etc. have Rule Boxes.)';
    }
    reduceEffect(store, state, effect) {
        if (effect instanceof game_effects_1.PowerEffect && state_utils_1.StateUtils.getStadiumCard(state) === this) {
            const pokemonCard = effect.card;
            if (pokemonCard.tags.includes(card_types_1.CardTag.POKEMON_V) ||
                pokemonCard.tags.includes(card_types_1.CardTag.POKEMON_VMAX) ||
                pokemonCard.tags.includes(card_types_1.CardTag.POKEMON_VSTAR) ||
                pokemonCard.tags.includes(card_types_1.CardTag.POKEMON_ex)) {
                if (pokemonCard.powers.length > 0) {
                    pokemonCard.powers.length = 0;
                    pokemonCard.powers = [];
                    const checkTable = new check_effects_1.CheckTableStateEffect();
                    store.reduceEffect(state, checkTable);
                }
                if (effect instanceof game_effects_1.UseStadiumEffect && state_utils_1.StateUtils.getStadiumCard(state) === this) {
                    throw new game_1.GameError(game_1.GameMessage.CANNOT_USE_STADIUM);
                }
                return state;
            }
            return state;
        }
        return state;
    }
}
exports.PathToThePeak = PathToThePeak;
