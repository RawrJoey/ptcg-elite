"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Grant = void 0;
const trainer_card_1 = require("../../game/store/card/trainer-card");
const card_types_1 = require("../../game/store/card/card-types");
const play_card_effects_1 = require("../../game/store/effects/play-card-effects");
const attack_effects_1 = require("../../game/store/effects/attack-effects");
const game_phase_effects_1 = require("../../game/store/effects/game-phase-effects");
const game_1 = require("../../game");
const game_effects_1 = require("../../game/store/effects/game-effects");
const check_effects_1 = require("../../game/store/effects/check-effects");
class Grant extends trainer_card_1.TrainerCard {
    constructor() {
        super(...arguments);
        this.trainerType = card_types_1.TrainerType.SUPPORTER;
        this.regulationMark = 'F';
        this.set = 'ASR';
        this.cardImage = 'assets/cardback.png';
        this.setNumber = '144';
        this.name = 'Grant';
        this.fullName = 'Grant ASR';
        this.text = 'During this turn, your [F] Pokémon\'s attacks do 30 more damage to your opponent\'s Active Pokémon (before applying Weakness and Resistance).';
        this.powers = [{
                name: 'Grant',
                useFromDiscard: true,
                powerType: game_1.PowerType.ABILITY,
                text: 'During your turn, if this Grant is in your discard pile, you may discard 2 cards, except any Grant, from your hand. If you do, put this Grant into your hand. (This effect doesn\'t use up your Supporter card for the turn.)'
            }];
        this.GRANT_MARKER = 'GRANT_MARKER';
    }
    reduceEffect(store, state, effect) {
        if (effect instanceof check_effects_1.CheckPokemonPowersEffect &&
            !effect.powers.find(p => p.name === this.powers[0].name)) {
            effect.powers.push(this.powers[0]);
        }
        if (effect instanceof play_card_effects_1.TrainerEffect && effect.trainerCard === this) {
            const player = effect.player;
            const supporterTurn = player.supporterTurn;
            if (supporterTurn > 0) {
                throw new game_1.GameError(game_1.GameMessage.SUPPORTER_ALREADY_PLAYED);
            }
            player.hand.moveCardTo(effect.trainerCard, player.supporter);
            // We will discard this card after prompt confirmation
            effect.preventDefault = true;
            player.marker.addMarker(this.GRANT_MARKER, this);
            player.supporter.moveCardTo(effect.trainerCard, player.discard);
        }
        if (effect instanceof attack_effects_1.DealDamageEffect) {
            const player = effect.player;
            if (player.marker.hasMarker(this.GRANT_MARKER, this) && effect.damage > 0) {
                effect.damage += 30;
            }
        }
        if (effect instanceof game_phase_effects_1.EndTurnEffect) {
            const player = effect.player;
            player.marker.removeMarker(this.GRANT_MARKER, this);
            return state;
        }
        if (effect instanceof game_effects_1.PowerEffect && effect.power === this.powers[0]) {
            const player = effect.player;
            // Check if card is in the discard
            if (!player.discard.cards.includes(this)) {
                throw new game_1.GameError(game_1.GameMessage.CANNOT_USE_POWER);
            }
            player.discard.moveCardTo(this, player.hand);
        }
        return state;
    }
}
exports.Grant = Grant;
