"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Lucario = void 0;
const game_1 = require("../../game");
const card_types_1 = require("../../game/store/card/card-types");
const pokemon_card_1 = require("../../game/store/card/pokemon-card");
const attack_effects_1 = require("../../game/store/effects/attack-effects");
const game_effects_1 = require("../../game/store/effects/game-effects");
const game_phase_effects_1 = require("../../game/store/effects/game-phase-effects");
class Lucario extends pokemon_card_1.PokemonCard {
    constructor() {
        super(...arguments);
        this.stage = card_types_1.Stage.STAGE_1;
        this.cardType = card_types_1.CardType.FIGHTING;
        this.hp = 130;
        this.retreat = [card_types_1.CardType.COLORLESS, card_types_1.CardType.COLORLESS];
        this.attacks = [
            {
                name: 'Avenging Knuckle',
                cost: [card_types_1.CardType.FIRE, card_types_1.CardType.WATER],
                damage: 30,
                damageCalculation: '+',
                text: 'If any of your [F] Pokémon were Knocked Out by damage from an attack during your opponent\'s last turn, this attack does 120 more damage.'
            },
            {
                name: 'Accelerating Stab',
                cost: [card_types_1.CardType.FIGHTING, card_types_1.CardType.FIGHTING, card_types_1.CardType.COLORLESS],
                damage: 120,
                text: 'During your next turn, this Pokémon can\'t use Accelerating Stab.'
            }
        ];
        this.set = 'SVI';
        this.regulationMark = 'G';
        this.cardImage = 'assets/cardback.png';
        this.setNumber = '113';
        this.evolvesFrom = 'Riolu';
        this.name = 'Lucario';
        this.fullName = 'Lucario SVI';
        this.REVENGE_MARKER = 'REVENGE_MARKER';
        this.ATTACK_USED_MARKER = 'ATTACK_USED_MARKER';
        this.damageDealt = false;
    }
    reduceEffect(store, state, effect) {
        if (effect instanceof game_effects_1.AttackEffect && effect.attack === this.attacks[0]) {
            const player = effect.player;
            if (player.marker.hasMarker(this.REVENGE_MARKER) && this.damageDealt) {
                effect.damage += 120;
            }
            return state;
        }
        if (effect instanceof game_effects_1.AttackEffect && effect.attack === this.attacks[0]) {
            const player = effect.player;
            if (player.attackMarker.hasMarker(this.ATTACK_USED_MARKER, this)) {
                throw new game_1.GameError(game_1.GameMessage.BLOCKED_BY_EFFECT);
            }
            effect.player.attackMarker.addMarker(this.ATTACK_USED_MARKER, this);
        }
        if ((effect instanceof attack_effects_1.DealDamageEffect || effect instanceof attack_effects_1.PutDamageEffect) &&
            effect.target.tool === this) {
            const player = game_1.StateUtils.getOpponent(state, effect.player);
            if (player.active.tool === this) {
                this.damageDealt = true;
            }
        }
        if (effect instanceof game_phase_effects_1.EndTurnEffect) {
            const cardList = game_1.StateUtils.findCardList(state, this);
            const owner = game_1.StateUtils.findOwner(state, cardList);
            if (owner === effect.player) {
                this.damageDealt = false;
            }
            effect.player.marker.removeMarker(this.REVENGE_MARKER);
            effect.player.marker.removeMarker(this.ATTACK_USED_MARKER);
        }
        return state;
    }
}
exports.Lucario = Lucario;
