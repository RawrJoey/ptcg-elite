"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VengefulPunch = void 0;
const trainer_card_1 = require("../../game/store/card/trainer-card");
const card_types_1 = require("../../game/store/card/card-types");
const state_1 = require("../../game/store/state/state");
const game_1 = require("../../game");
const attack_effects_1 = require("../../game/store/effects/attack-effects");
const play_card_effects_1 = require("../../game/store/effects/play-card-effects");
class VengefulPunch extends trainer_card_1.TrainerCard {
    constructor() {
        super(...arguments);
        this.regulationMark = 'G';
        this.trainerType = card_types_1.TrainerType.TOOL;
        this.set = 'OBF';
        this.cardImage = 'assets/cardback.png';
        this.setNumber = '197';
        this.name = 'Vengeful Punch';
        this.fullName = 'Vengeful Punch OBF';
        this.text = 'If the Pokémon this card is attached to is Knocked Out by damage from an attack from your opponent\'s Pokémon, put 4 damage counters on the Attacking Pokémon.';
    }
    reduceEffect(store, state, effect) {
        if (effect instanceof attack_effects_1.AfterDamageEffect && effect.target.tool === this) {
            const player = effect.player;
            const targetPlayer = game_1.StateUtils.findOwner(state, effect.target);
            try {
                const toolEffect = new play_card_effects_1.ToolEffect(player, this);
                store.reduceEffect(state, toolEffect);
            }
            catch (_a) {
                return state;
            }
            if (effect.damage <= 0 || player === targetPlayer || targetPlayer.active !== effect.target) {
                return state;
            }
            const activePokemon = player.active;
            const maxHp = activePokemon.hp;
            if (state.phase === state_1.GamePhase.ATTACK) {
                if (player.active.damage >= maxHp) {
                    effect.source.damage += 40;
                }
            }
        }
        return state;
    }
}
exports.VengefulPunch = VengefulPunch;
