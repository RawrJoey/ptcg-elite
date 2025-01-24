"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Timburr = void 0;
const pokemon_card_1 = require("../../game/store/card/pokemon-card");
const card_types_1 = require("../../game/store/card/card-types");
const game_1 = require("../../game");
const game_effects_1 = require("../../game/store/effects/game-effects");
class Timburr extends pokemon_card_1.PokemonCard {
    constructor() {
        super(...arguments);
        this.stage = card_types_1.Stage.BASIC;
        this.cardType = card_types_1.CardType.FIGHTING;
        this.hp = 80;
        this.weakness = [{ type: card_types_1.CardType.PSYCHIC }];
        this.retreat = [card_types_1.CardType.COLORLESS, card_types_1.CardType.COLORLESS];
        this.attacks = [
            {
                name: 'Best Punch',
                cost: [card_types_1.CardType.FIGHTING],
                damage: 40,
                text: 'Flip a coin. If tails, this attack does nothing.'
            }
        ];
        this.set = 'TWM';
        this.setNumber = '103';
        this.cardImage = 'assets/cardback.png';
        this.regulationMark = 'H';
        this.name = 'Timburr';
        this.fullName = 'Timburr TWM';
    }
    reduceEffect(store, state, effect) {
        if (effect instanceof game_effects_1.AttackEffect && effect.attack === this.attacks[0]) {
            const player = effect.player;
            return store.prompt(state, [
                new game_1.CoinFlipPrompt(player.id, game_1.GameMessage.COIN_FLIP)
            ], result => {
                if (result === false) {
                    effect.damage = 0;
                }
            });
        }
        return state;
    }
}
exports.Timburr = Timburr;
