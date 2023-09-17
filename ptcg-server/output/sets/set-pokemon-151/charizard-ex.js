"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Charizardex = void 0;
/* eslint-disable indent */
const pokemon_card_1 = require("../../game/store/card/pokemon-card");
const card_types_1 = require("../../game/store/card/card-types");
const prefabs_1 = require("../../game/store/effect-factories/prefabs");
class Charizardex extends pokemon_card_1.PokemonCard {
    constructor() {
        super(...arguments);
        this.regulationMark = 'G';
        this.tags = [card_types_1.CardTag.POKEMON_ex];
        this.stage = card_types_1.Stage.STAGE_2;
        this.evolvesFrom = 'Charmeleon';
        this.cardType = card_types_1.CardType.FIRE;
        this.hp = 330;
        this.weakness = [{ type: card_types_1.CardType.WATER }];
        this.retreat = [card_types_1.CardType.COLORLESS, card_types_1.CardType.COLORLESS];
        this.attacks = [
            {
                name: 'Brave Wing',
                cost: [card_types_1.CardType.FIRE],
                damage: 60,
                text: 'If this Pokémon has any damage counters on it, this attack ' +
                    'does 100 more damage.'
            },
            {
                name: 'Explosive Vortex',
                cost: [card_types_1.CardType.FIRE, card_types_1.CardType.FIRE, card_types_1.CardType.FIRE, card_types_1.CardType.FIRE],
                damage: 330,
                text: 'Discard 3 Energy from this Pokémon. '
            },
        ];
        this.set = '151';
        this.name = 'Charizard ex';
        this.fullName = 'Charizard ex';
    }
    reduceEffect(store, state, effect) {
        if (prefabs_1.WAS_ATTACK_USED(effect, 0, this)) {
            if (prefabs_1.THIS_POKEMON_HAS_DAMAGE_COUNTERS(effect, this)) {
                effect.damage += 100;
            }
            if (prefabs_1.WAS_ATTACK_USED(effect, 1, this)) {
                prefabs_1.DISCARD_ENERGY_FROM_THIS_POKEMON(state, effect, store, card_types_1.CardType.COLORLESS, 3);
            }
            return state;
        }
        return state;
    }
}
exports.Charizardex = Charizardex;
