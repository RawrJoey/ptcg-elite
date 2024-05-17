"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rowlett = void 0;
const pokemon_card_1 = require("../../game/store/card/pokemon-card");
const card_types_1 = require("../../game/store/card/card-types");
const game_effects_1 = require("../../game/store/effects/game-effects");
class Rowlett extends pokemon_card_1.PokemonCard {
    constructor() {
        super(...arguments);
        this.regulationMark = 'H';
        this.stage = card_types_1.Stage.BASIC;
        this.cardType = card_types_1.CardType.GRASS;
        this.hp = 70;
        this.weakness = [{ type: card_types_1.CardType.FIRE }];
        this.retreat = [card_types_1.CardType.COLORLESS];
        this.attacks = [
            {
                name: 'Collect',
                cost: [card_types_1.CardType.COLORLESS],
                damage: 0,
                text: 'Draw a card.'
            },
            {
                name: 'Leafage',
                cost: [card_types_1.CardType.GRASS],
                damage: 10,
                text: ''
            },
        ];
        this.set = 'SV7';
        this.cardImage = 'assets/cardback.png';
        this.setNumber = '3';
        this.name = 'Rowlett';
        this.fullName = 'Rowlett SV7';
    }
    reduceEffect(store, state, effect) {
        if (effect instanceof game_effects_1.AttackEffect && effect.attack === this.attacks[0]) {
            const player = effect.player;
            player.deck.moveTo(player.hand, 1);
            return state;
        }
        return state;
    }
}
exports.Rowlett = Rowlett;
