"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BodybuildingDumbbells = void 0;
const card_types_1 = require("../../game/store/card/card-types");
const trainer_card_1 = require("../../game/store/card/trainer-card");
const check_effects_1 = require("../../game/store/effects/check-effects");
const play_card_effects_1 = require("../../game/store/effects/play-card-effects");
const state_utils_1 = require("../../game/store/state-utils");
class BodybuildingDumbbells extends trainer_card_1.TrainerCard {
    constructor() {
        super(...arguments);
        this.trainerType = card_types_1.TrainerType.TOOL;
        this.set = 'BUS';
        this.cardImage = 'assets/cardback.png';
        this.setNumber = '113';
        this.name = 'Bodybuilding Dumbbells';
        this.fullName = 'Bodybuilding Dumbbells BUS';
        this.text = 'The Stage 1 Pokémon this card is attached to gets +40 HP.';
    }
    reduceEffect(store, state, effect) {
        if (effect instanceof check_effects_1.CheckHpEffect && effect.target.cards.includes(this)) {
            const sourceCard = effect.target.getPokemonCard();
            if ((sourceCard === null || sourceCard === void 0 ? void 0 : sourceCard.stage) !== card_types_1.Stage.STAGE_1) {
                return state;
            }
            const player = state_utils_1.StateUtils.findOwner(state, effect.target);
            try {
                const toolEffect = new play_card_effects_1.ToolEffect(player, this);
                store.reduceEffect(state, toolEffect);
            }
            catch (_a) {
                return state;
            }
            effect.hp += 40;
            return state;
        }
        return state;
    }
}
exports.BodybuildingDumbbells = BodybuildingDumbbells;
