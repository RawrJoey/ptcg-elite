"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dedenne = void 0;
const pokemon_card_1 = require("../../game/store/card/pokemon-card");
const card_types_1 = require("../../game/store/card/card-types");
const game_effects_1 = require("../../game/store/effects/game-effects");
class Dedenne extends pokemon_card_1.PokemonCard {
    constructor() {
        super(...arguments);
        this.stage = card_types_1.Stage.BASIC;
        this.cardType = P;
        this.hp = 70;
        this.weakness = [{ type: M }];
        this.retreat = [C];
        this.attacks = [
            {
                name: 'Mad Party',
                cost: [P, C, C],
                damage: 20,
                damageCalculation: 'x',
                text: 'This attack does 20 damage for each Pokémon in your discard pile that has the Mad Party attack.'
            }
        ];
        this.set = 'DAA';
        this.name = 'Dedenne';
        this.fullName = 'Dedenne DAA';
        this.cardImage = 'assets/cardback.png';
        this.setNumber = '78';
        this.regulationMark = 'D';
    }
    reduceEffect(store, state, effect) {
        if (effect instanceof game_effects_1.AttackEffect && effect.attack === this.attacks[0]) {
            const player = effect.player;
            let pokemonCount = 0;
            player.discard.cards.forEach(c => {
                if (c instanceof pokemon_card_1.PokemonCard && c.attacks.some(a => a.name === 'Mad Party'))
                    pokemonCount += 1;
            });
            effect.damage = pokemonCount * 20;
        }
        return state;
    }
}
exports.Dedenne = Dedenne;
