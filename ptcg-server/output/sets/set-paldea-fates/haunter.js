"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Haunter = void 0;
const pokemon_card_1 = require("../../game/store/card/pokemon-card");
const card_types_1 = require("../../game/store/card/card-types");
const game_effects_1 = require("../../game/store/effects/game-effects");
const attack_effects_1 = require("../../game/store/effects/attack-effects");
class Haunter extends pokemon_card_1.PokemonCard {
    constructor() {
        super(...arguments);
        this.regulationMark = 'H';
        this.stage = card_types_1.Stage.STAGE_1;
        this.evolvesFrom = 'Gastly';
        this.cardType = card_types_1.CardType.DARK;
        this.hp = 80;
        this.weakness = [{ type: card_types_1.CardType.FIGHTING }];
        this.retreat = [card_types_1.CardType.COLORLESS];
        this.attacks = [
            {
                name: 'Dark Slumber',
                cost: [card_types_1.CardType.DARK, card_types_1.CardType.COLORLESS],
                damage: 40,
                text: 'Your opponent\'s Active Pokémon is now Asleep.'
            }
        ];
        this.set = 'SV4';
        this.cardImage = 'assets/cardback.png';
        this.setNumber = '34';
        this.name = 'Haunter';
        this.fullName = 'Haunter SV4';
    }
    reduceEffect(store, state, effect) {
        if (effect instanceof game_effects_1.AttackEffect && effect.attack === this.attacks[0]) {
            const specialCondition = new attack_effects_1.AddSpecialConditionsEffect(effect, [card_types_1.SpecialCondition.ASLEEP]);
            store.reduceEffect(state, specialCondition);
        }
        return state;
    }
}
exports.Haunter = Haunter;
