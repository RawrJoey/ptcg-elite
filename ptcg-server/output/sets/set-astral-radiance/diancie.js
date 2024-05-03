"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Diancie = void 0;
const pokemon_card_1 = require("../../game/store/card/pokemon-card");
const card_types_1 = require("../../game/store/card/card-types");
const game_1 = require("../../game");
const play_card_effects_1 = require("../../game/store/effects/play-card-effects");
const game_effects_1 = require("../../game/store/effects/game-effects");
class Diancie extends pokemon_card_1.PokemonCard {
    constructor() {
        super(...arguments);
        this.stage = card_types_1.Stage.BASIC;
        this.cardType = card_types_1.CardType.PSYCHIC;
        this.hp = 90;
        this.powers = [{
                name: 'Princess\'s Curtain',
                powerType: game_1.PowerType.ABILITY,
                text: 'As long as this Pokémon is in the Active Spot, whenever your opponent plays a Supporter card from their hand, prevent all effects of that card done to your Benched Basic Pokémon.'
            }];
        this.attacks = [{
                name: 'Spike Draw',
                cost: [card_types_1.CardType.COLORLESS],
                damage: 20,
                text: 'Draw 2 cards.'
            }];
        this.set = 'ASR';
        this.regulationMark = 'F';
        this.cardImage = 'assets/cardback.png';
        this.setNumber = '68';
        this.name = 'Diancie';
        this.fullName = 'Diancie ASR';
    }
    reduceEffect(store, state, effect) {
        if (effect instanceof play_card_effects_1.PlaySupporterEffect && effect.target instanceof game_1.PokemonCardList && effect.target !== effect.player.bench[0]) {
            const opponentBench = effect.target;
            if (opponentBench.getPokemonCard() !== this) {
                return state;
            }
            // Try to reduce PowerEffect, to check if something is blocking our ability
            try {
                const powerEffect = new game_effects_1.PowerEffect(effect.player, this.powers[0], this);
                store.reduceEffect(state, powerEffect);
            }
            catch (_a) {
                effect.preventDefault = true;
            }
        }
        return state;
    }
}
exports.Diancie = Diancie;
