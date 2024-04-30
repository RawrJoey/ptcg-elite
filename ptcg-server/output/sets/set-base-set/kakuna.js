"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Kakuna = void 0;
const pokemon_card_1 = require("../../game/store/card/pokemon-card");
const card_types_1 = require("../../game/store/card/card-types");
const coin_flip_prompt_1 = require("../../game/store/prompts/coin-flip-prompt");
const attack_effects_1 = require("../../game/store/effects/attack-effects");
const game_effects_1 = require("../../game/store/effects/game-effects");
const game_1 = require("../../game");
const game_phase_effects_1 = require("../../game/store/effects/game-phase-effects");
class Kakuna extends pokemon_card_1.PokemonCard {
    constructor() {
        super(...arguments);
        this.name = 'Kakuna';
        this.set = 'BS';
        this.fullName = 'Kakuna BS';
        this.stage = card_types_1.Stage.STAGE_1;
        this.evolvesFrom = 'Weedle';
        this.evolvesInto = 'Beedrill';
        this.cardType = card_types_1.CardType.GRASS;
        this.hp = 80;
        this.weakness = [{ type: card_types_1.CardType.FIRE }];
        this.retreat = [card_types_1.CardType.COLORLESS, card_types_1.CardType.COLORLESS];
        this.STIFFEN_MARKER = 'STIFFEN_MARKER';
        this.CLEAR_STIFFEN_MARKER = 'CLEAR_STIFFEN_MARKER';
        this.attacks = [
            {
                name: 'Stiffen',
                cost: [card_types_1.CardType.COLORLESS, card_types_1.CardType.COLORLESS],
                text: 'Flip a coin. If heads, prevent all damage done to Kakuna during your opponent’s next turn. (Any other effects of attacks still happen.)',
                damage: 0
            },
            {
                name: 'Poisonpowder',
                cost: [card_types_1.CardType.GRASS, card_types_1.CardType.GRASS],
                damage: 20,
                text: 'Flip a coin. If heads, the Defending Pokémon is now Poisoned.'
            }
        ];
    }
    reduceEffect(store, state, effect) {
        if (effect instanceof game_effects_1.AttackEffect && effect.attack === this.attacks[0]) {
            return store.prompt(state, new coin_flip_prompt_1.CoinFlipPrompt(effect.player.id, game_1.GameMessage.COIN_FLIP), (heads) => {
                if (heads) {
                    const player = effect.player;
                    player.marker.addMarker(this.STIFFEN_MARKER, this);
                }
            });
        }
        if (effect instanceof attack_effects_1.PutDamageEffect &&
            effect.target.marker.hasMarker(this.STIFFEN_MARKER)) {
            effect.preventDefault = true;
            return state;
        }
        if (effect instanceof game_phase_effects_1.EndTurnEffect && effect.player.marker.hasMarker(this.CLEAR_STIFFEN_MARKER, this)) {
            effect.player.marker.removeMarker(this.CLEAR_STIFFEN_MARKER, this);
            const opponent = game_1.StateUtils.getOpponent(state, effect.player);
            opponent.forEachPokemon(game_1.PlayerType.TOP_PLAYER, (cardList) => {
                cardList.marker.removeMarker(this.STIFFEN_MARKER, this);
            });
        }
        if (effect instanceof game_effects_1.AttackEffect && effect.attack === this.attacks[1]) {
            return store.prompt(state, new coin_flip_prompt_1.CoinFlipPrompt(effect.player.id, game_1.GameMessage.COIN_FLIP), (heads) => {
                if (heads) {
                    const condition = new attack_effects_1.AddSpecialConditionsEffect(effect, [card_types_1.SpecialCondition.POISONED]);
                    store.reduceEffect(state, condition);
                }
            });
        }
        return state;
    }
}
exports.Kakuna = Kakuna;
