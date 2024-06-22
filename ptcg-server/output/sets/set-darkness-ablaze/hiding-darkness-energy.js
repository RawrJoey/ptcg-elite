"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HidingDarknessEnergy = void 0;
const card_types_1 = require("../../game/store/card/card-types");
const energy_card_1 = require("../../game/store/card/energy-card");
const check_effects_1 = require("../../game/store/effects/check-effects");
const play_card_effects_1 = require("../../game/store/effects/play-card-effects");
class HidingDarknessEnergy extends energy_card_1.EnergyCard {
    constructor() {
        super(...arguments);
        this.provides = [card_types_1.CardType.COLORLESS];
        this.energyType = card_types_1.EnergyType.SPECIAL;
        this.set = 'DAA';
        this.name = 'Hiding Darkness Energy';
        this.fullName = 'Hiding Darkness Energy DAA';
        this.cardImage = 'assets/cardback.png';
        this.setNumber = '175';
        this.text = 'As long as this card is attached to a Pokémon, it provides [D] Energy.' +
            '' +
            'The [D] Pokémon this card is attached to has no Retreat Cost.';
    }
    reduceEffect(store, state, effect) {
        if (effect instanceof check_effects_1.CheckProvidedEnergyEffect && effect.source.cards.includes(this)) {
            const player = effect.player;
            try {
                const energyEffect = new play_card_effects_1.EnergyEffect(player, this);
                store.reduceEffect(state, energyEffect);
            }
            catch (_a) {
                return state;
            }
            effect.energyMap.push({ card: this, provides: [card_types_1.CardType.DARK] });
            return state;
        }
        if (effect instanceof check_effects_1.CheckRetreatCostEffect && effect.player.active.cards.includes(this)) {
            const player = effect.player;
            try {
                const toolEffect = new play_card_effects_1.EnergyEffect(player, this);
                store.reduceEffect(state, toolEffect);
            }
            catch (_b) {
                return state;
            }
            effect.cost = [];
        }
        return state;
    }
}
exports.HidingDarknessEnergy = HidingDarknessEnergy;
