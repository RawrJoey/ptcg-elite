"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MetalEnergySpecial = void 0;
const card_types_1 = require("../../game/store/card/card-types");
const energy_card_1 = require("../../game/store/card/energy-card");
const attack_effects_1 = require("../../game/store/effects/attack-effects");
const check_effects_1 = require("../../game/store/effects/check-effects");
const play_card_effects_1 = require("../../game/store/effects/play-card-effects");
class MetalEnergySpecial extends energy_card_1.EnergyCard {
    constructor() {
        super(...arguments);
        this.provides = [card_types_1.CardType.METAL];
        this.energyType = card_types_1.EnergyType.SPECIAL;
        this.set = 'UD';
        this.name = 'Metal Energy';
        this.fullName = 'Metal Energy UD';
        this.cardImage = 'assets/cardback.png';
        this.setNumber = '80';
        this.text = 'Damage done by attacks to the Pokemon that Metal Energy is ' +
            'attached to is reduced by 10 (after applying Weakness and Resistance). ' +
            'Ignore this effect if the Pokemon that Metal Energy is attached to ' +
            'isn\'t M. Metal Energy provides M Energy. (Doesn\'t count as a basic ' +
            'Energy card.)';
    }
    reduceEffect(store, state, effect) {
        if (effect instanceof attack_effects_1.PutDamageEffect) {
            const player = effect.player;
            try {
                const energyEffect = new play_card_effects_1.EnergyEffect(player, this);
                store.reduceEffect(state, energyEffect);
            }
            catch (_a) {
                return state;
            }
            if (effect.target.cards.includes(this)) {
                const checkPokemonType = new check_effects_1.CheckPokemonTypeEffect(effect.target);
                store.reduceEffect(state, checkPokemonType);
                if (checkPokemonType.cardTypes.includes(card_types_1.CardType.METAL)) {
                    effect.damage -= 10;
                }
            }
        }
        return state;
    }
}
exports.MetalEnergySpecial = MetalEnergySpecial;
