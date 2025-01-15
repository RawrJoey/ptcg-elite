"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnitEnergyFDY = void 0;
const card_types_1 = require("../../game/store/card/card-types");
const energy_card_1 = require("../../game/store/card/energy-card");
const check_effects_1 = require("../../game/store/effects/check-effects");
class UnitEnergyFDY extends energy_card_1.EnergyCard {
    constructor() {
        super(...arguments);
        this.provides = [card_types_1.CardType.COLORLESS];
        this.energyType = card_types_1.EnergyType.SPECIAL;
        this.set = 'FLI';
        this.cardImage = 'assets/cardback.png';
        this.setNumber = '118';
        this.name = 'Unit Energy FDY';
        this.fullName = 'Unit Energy FDY FLI';
        this.text = 'This card provides [C] Energy.' +
            '' +
            'While this card is attached to a Pokémon, it provides [F], [D], and [Y] Energy but provides only 1 Energy at a time.';
        this.blendedEnergies = [card_types_1.CardType.FIGHTING, card_types_1.CardType.DARK, card_types_1.CardType.FAIRY];
    }
    reduceEffect(store, state, effect) {
        if (effect instanceof check_effects_1.CheckProvidedEnergyEffect && effect.source.cards.includes(this)) {
            const pokemon = effect.source;
            const pokemonCard = pokemon.getPokemonCard();
            const attackCosts = pokemonCard === null || pokemonCard === void 0 ? void 0 : pokemonCard.attacks.map(attack => attack.cost);
            const costs = (attackCosts === null || attackCosts === void 0 ? void 0 : attackCosts.flat().filter(t => t !== card_types_1.CardType.COLORLESS)) || [];
            const alreadyProvided = effect.energyMap.flatMap(e => e.provides);
            const neededType = costs.find(cost => this.blendedEnergies.includes(cost) &&
                !alreadyProvided.includes(cost));
            effect.energyMap.push({
                card: this,
                provides: neededType ? [neededType] : [card_types_1.CardType.COLORLESS]
            });
        }
        return state;
    }
}
exports.UnitEnergyFDY = UnitEnergyFDY;
