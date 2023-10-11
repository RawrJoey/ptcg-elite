"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Charmander = void 0;
const pokemon_card_1 = require("../../game/store/card/pokemon-card");
const card_types_1 = require("../../game/store/card/card-types");
const prefabs_1 = require("../../game/store/effect-factories/prefabs");
class Charmander extends pokemon_card_1.PokemonCard {
    constructor() {
        super(...arguments);
        this.regulationMark = 'G';
        this.stage = card_types_1.Stage.BASIC;
        this.cardType = card_types_1.CardType.FIRE;
        this.hp = 70;
        this.weakness = [{ type: card_types_1.CardType.WATER }];
        this.retreat = [card_types_1.CardType.COLORLESS];
        this.attacks = [
            {
                name: 'Blazing Destruction',
                cost: [card_types_1.CardType.FIRE],
                damage: 0,
                text: 'Discard a Stadium in play.',
                effect: (store, state, effect) => {
                    prefabs_1.DISCARD_STADIUM_IN_PLAY(state);
                }
            },
            {
                name: 'Steady Firebreathing',
                cost: [card_types_1.CardType.FIRE, card_types_1.CardType.FIRE],
                damage: 30,
                text: '',
                effect: undefined
            }
        ];
        this.set = '151';
        this.set2 = '151';
        this.setNumber = '4';
        this.name = 'Charmander';
        this.fullName = 'Charmander MEW';
    }
}
exports.Charmander = Charmander;
