"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecycleEnergy = void 0;
const card_types_1 = require("../../game/store/card/card-types");
const energy_card_1 = require("../../game/store/card/energy-card");
const attack_effects_1 = require("../../game/store/effects/attack-effects");
const play_card_effects_1 = require("../../game/store/effects/play-card-effects");
class RecycleEnergy extends energy_card_1.EnergyCard {
    constructor() {
        super(...arguments);
        this.provides = [card_types_1.CardType.COLORLESS];
        this.energyType = card_types_1.EnergyType.SPECIAL;
        this.set = 'UNM';
        this.cardImage = 'assets/cardback.png';
        this.setNumber = '212';
        this.name = 'Recycle Energy';
        this.fullName = 'Recycle Energy UNM';
        this.text = 'This card provides [C] Energy.' +
            '' +
            'If this card is discarded from play, put it into your hand instead of the discard pile.';
        this.RECYCLE_ENERGY_MARKER = 'RECYCLE_ENERGY_MARKER';
    }
    reduceEffect(store, state, effect) {
        if (effect instanceof attack_effects_1.DiscardCardsEffect && effect.target.cards.includes(this)) {
            const player = effect.player;
            effect.target.moveCardTo(this, player.hand);
        }
        if (effect instanceof play_card_effects_1.AttachEnergyEffect && effect.energyCard === this) {
            const player = effect.player;
            player.marker.addMarker(this.RECYCLE_ENERGY_MARKER, this);
        }
        state.players.forEach(player => {
            // Check if the card is in the player's discard pile
            const recycleEnergyInDiscard = player.discard.cards.some(card => card === this);
            if (recycleEnergyInDiscard && player.marker.hasMarker(this.RECYCLE_ENERGY_MARKER, this)) {
                // Move the card from the discard pile to the player's hand
                player.discard.moveCardTo(this, player.hand);
                player.marker.removeMarker(this.RECYCLE_ENERGY_MARKER, this);
            }
        });
        return state;
    }
}
exports.RecycleEnergy = RecycleEnergy;
