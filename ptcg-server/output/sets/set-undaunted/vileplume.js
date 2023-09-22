"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Vileplume = void 0;
const pokemon_card_1 = require("../../game/store/card/pokemon-card");
const card_types_1 = require("../../game/store/card/card-types");
const game_effects_1 = require("../../game/store/effects/game-effects");
const attack_effects_1 = require("../../game/store/effects/attack-effects");
const pokemon_types_1 = require("../../game/store/card/pokemon-types");
const state_utils_1 = require("../../game/store/state-utils");
const play_card_action_1 = require("../../game/store/actions/play-card-action");
const game_error_1 = require("../../game/game-error");
const game_message_1 = require("../../game/game-message");
const coin_flip_prompt_1 = require("../../game/store/prompts/coin-flip-prompt");
const play_card_effects_1 = require("../../game/store/effects/play-card-effects");
class Vileplume extends pokemon_card_1.PokemonCard {
    constructor() {
        super(...arguments);
        this.stage = card_types_1.Stage.STAGE_2;
        this.evolvesFrom = 'Gloom';
        this.cardType = card_types_1.CardType.GRASS;
        this.hp = 120;
        this.weakness = [{ type: card_types_1.CardType.PSYCHIC }];
        this.retreat = [card_types_1.CardType.COLORLESS, card_types_1.CardType.COLORLESS];
        this.powers = [{
                name: 'Allergy Flower',
                powerType: pokemon_types_1.PowerType.POKEBODY,
                text: 'Each player can\'t play any Trainer cards from his or her hand.'
            }];
        this.attacks = [{
                name: 'Dazzling Pollen',
                cost: [card_types_1.CardType.GRASS, card_types_1.CardType.GRASS, card_types_1.CardType.COLORLESS],
                damage: 50,
                text: 'Flip a coin. If heads, this attack does 50 damage plus 20 more ' +
                    'damage. If tails, the Defending Pokemon is now Confused.'
            }];
        this.set = 'UD';
        this.name = 'Vileplume';
        this.fullName = 'Vileplume UND';
    }
    reduceEffect(store, state, effect) {
        if (effect instanceof game_effects_1.AttackEffect && effect.attack === this.attacks[0]) {
            const player = effect.player;
            return store.prompt(state, [
                new coin_flip_prompt_1.CoinFlipPrompt(player.id, game_message_1.GameMessage.COIN_FLIP)
            ], result => {
                if (result) {
                    effect.damage += 20;
                }
                else {
                    const specialConditionEffect = new attack_effects_1.AddSpecialConditionsEffect(effect, [card_types_1.SpecialCondition.CONFUSED]);
                    store.reduceEffect(state, specialConditionEffect);
                }
            });
        }
        // Block trainer cards
        if (effect instanceof play_card_effects_1.PlayItemEffect) {
            const player = effect.player;
            const opponent = state_utils_1.StateUtils.getOpponent(state, player);
            let isVileplumeInPlay = false;
            player.forEachPokemon(play_card_action_1.PlayerType.BOTTOM_PLAYER, (cardList, card) => {
                if (card === this) {
                    isVileplumeInPlay = true;
                }
            });
            opponent.forEachPokemon(play_card_action_1.PlayerType.TOP_PLAYER, (cardList, card) => {
                if (card === this) {
                    isVileplumeInPlay = true;
                }
            });
            if (!isVileplumeInPlay) {
                return state;
            }
            // Try to reduce PowerEffect, to check if something is blocking our ability
            try {
                const powerEffect = new game_effects_1.PowerEffect(player, this.powers[0], this);
                store.reduceEffect(state, powerEffect);
            }
            catch (_a) {
                return state;
            }
            throw new game_error_1.GameError(game_message_1.GameMessage.BLOCKED_BY_ABILITY);
        }
        return state;
    }
}
exports.Vileplume = Vileplume;
