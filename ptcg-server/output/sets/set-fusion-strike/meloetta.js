"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Meloetta = void 0;
const pokemon_card_1 = require("../../game/store/card/pokemon-card");
const card_types_1 = require("../../game/store/card/card-types");
const game_effects_1 = require("../../game/store/effects/game-effects");
const check_effects_1 = require("../../game/store/effects/check-effects");
class Meloetta extends pokemon_card_1.PokemonCard {
    constructor() {
        super(...arguments);
        this.stage = card_types_1.Stage.BASIC;
        this.tags = [card_types_1.CardTag.FUSION_STRIKE];
        this.cardType = card_types_1.CardType.PSYCHIC;
        this.hp = 90;
        this.weakness = [{ type: card_types_1.CardType.DARK }];
        this.resistance = [{ type: card_types_1.CardType.FIGHTING, value: -30 }];
        this.retreat = [card_types_1.CardType.COLORLESS];
        this.attacks = [
            {
                name: 'Melodius Echo',
                cost: [card_types_1.CardType.COLORLESS],
                damage: 70,
                text: 'This attack does 70 damage for each Fusion Strike Energy ' +
                    'attached to all of your Pokémon.'
            }
        ];
        this.set = 'FST';
        this.name = 'Meloetta';
        this.fullName = 'Meloetta FST';
    }
    reduceEffect(store, state, effect) {
        if (effect instanceof game_effects_1.AttackEffect && effect.attack === this.attacks[0]) {
            const player = effect.player;
            const checkProvidedEnergyEffect = new check_effects_1.CheckProvidedEnergyEffect(player);
            store.reduceEffect(state, checkProvidedEnergyEffect);
            let energyCount = 0;
            checkProvidedEnergyEffect.energyMap.forEach(em => {
                energyCount += em.provides.filter(cardType => {
                    return card_types_1.EnergyType.SPECIAL && this.name == 'Fusion Strike Energy';
                }).length;
            });
            effect.damage == energyCount * 70;
        }
        return state;
    }
}
exports.Meloetta = Meloetta;
