"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MetalSaucer = void 0;
const game_error_1 = require("../../game/game-error");
const game_message_1 = require("../../game/game-message");
const play_card_action_1 = require("../../game/store/actions/play-card-action");
const card_types_1 = require("../../game/store/card/card-types");
const energy_card_1 = require("../../game/store/card/energy-card");
const trainer_card_1 = require("../../game/store/card/trainer-card");
const check_effects_1 = require("../../game/store/effects/check-effects");
const play_card_effects_1 = require("../../game/store/effects/play-card-effects");
const attach_energy_prompt_1 = require("../../game/store/prompts/attach-energy-prompt");
const state_utils_1 = require("../../game/store/state-utils");
class MetalSaucer extends trainer_card_1.TrainerCard {
    constructor() {
        super(...arguments);
        this.trainerType = card_types_1.TrainerType.ITEM;
        this.regulationMark = 'D';
        this.set = 'SSH';
        this.name = 'Metal Saucer';
        this.fullName = 'Metal Saucer SSH';
        this.cardImage = 'assets/cardback.png';
        this.setNumber = '170';
        this.text = 'Attach a [M] Energy card from your discard pile to 1 of your Benched [M] Pokémon.';
    }
    reduceEffect(store, state, effect) {
        if (effect instanceof play_card_effects_1.TrainerEffect && effect.trainerCard === this) {
            const player = effect.player;
            const hasEnergyInDiscard = player.discard.cards.some(c => {
                return c instanceof energy_card_1.EnergyCard
                    && c.energyType === card_types_1.EnergyType.BASIC
                    && c.provides.includes(card_types_1.CardType.METAL);
            });
            if (!hasEnergyInDiscard) {
                throw new game_error_1.GameError(game_message_1.GameMessage.CANNOT_PLAY_THIS_CARD);
            }
            let hasMetalPokemonOnBench = false;
            const blockedTo = [];
            player.bench.forEach((bench, index) => {
                if (bench.cards.length === 0) {
                    return;
                }
                const checkPokemonTypeEffect = new check_effects_1.CheckPokemonTypeEffect(bench);
                store.reduceEffect(state, checkPokemonTypeEffect);
                if (checkPokemonTypeEffect.cardTypes.includes(card_types_1.CardType.METAL)) {
                    hasMetalPokemonOnBench = true;
                }
                else {
                    const target = {
                        player: play_card_action_1.PlayerType.BOTTOM_PLAYER,
                        slot: play_card_action_1.SlotType.BENCH,
                        index
                    };
                    blockedTo.push(target);
                }
            });
            if (!hasMetalPokemonOnBench) {
                throw new game_error_1.GameError(game_message_1.GameMessage.CANNOT_PLAY_THIS_CARD);
            }
            // We will discard this card after prompt confirmation
            effect.preventDefault = true;
            state = store.prompt(state, new attach_energy_prompt_1.AttachEnergyPrompt(player.id, game_message_1.GameMessage.ATTACH_ENERGY_TO_BENCH, player.discard, play_card_action_1.PlayerType.BOTTOM_PLAYER, [play_card_action_1.SlotType.BENCH], { superType: card_types_1.SuperType.ENERGY, energyType: card_types_1.EnergyType.BASIC, name: 'Metal Energy' }, { allowCancel: true, min: 1, max: 1, blockedTo }), transfers => {
                transfers = transfers || [];
                if (transfers.length === 0) {
                    return;
                }
                for (const transfer of transfers) {
                    const target = state_utils_1.StateUtils.getTarget(state, player, transfer.to);
                    player.discard.moveCardTo(transfer.card, target);
                }
                player.hand.moveCardTo(this, player.discard);
            });
        }
        return state;
    }
}
exports.MetalSaucer = MetalSaucer;
