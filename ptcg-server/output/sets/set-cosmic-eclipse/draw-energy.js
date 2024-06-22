"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DrawEnergy = void 0;
const card_types_1 = require("../../game/store/card/card-types");
const energy_card_1 = require("../../game/store/card/energy-card");
const play_card_effects_1 = require("../../game/store/effects/play-card-effects");
class DrawEnergy extends energy_card_1.EnergyCard {
    constructor() {
        super(...arguments);
        this.provides = [card_types_1.CardType.COLORLESS];
        this.energyType = card_types_1.EnergyType.SPECIAL;
        this.set = 'CEC';
        this.cardImage = 'assets/cardback.png';
        this.setNumber = '209';
        this.name = 'Draw Energy';
        this.fullName = 'Draw Energy CEC';
        this.text = 'This card provides [C] Energy.' +
            '' +
            'When you attach this card from your hand to a Pokémon, draw a card.';
    }
    reduceEffect(store, state, effect) {
        var _a, _b;
        if (effect instanceof play_card_effects_1.AttachEnergyEffect && ((_b = (_a = effect.target) === null || _a === void 0 ? void 0 : _a.cards) === null || _b === void 0 ? void 0 : _b.includes(this))) {
            const player = effect.player;
            if (player.deck.cards.length === 0) {
                return state;
            }
            try {
                const energyEffect = new play_card_effects_1.EnergyEffect(player, this);
                store.reduceEffect(state, energyEffect);
            }
            catch (_c) {
                return state;
            }
            player.deck.moveTo(player.hand, 1);
        }
        return state;
    }
}
exports.DrawEnergy = DrawEnergy;
