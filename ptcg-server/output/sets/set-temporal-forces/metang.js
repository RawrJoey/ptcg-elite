"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Metang = void 0;
const pokemon_card_1 = require("../../game/store/card/pokemon-card");
const card_types_1 = require("../../game/store/card/card-types");
const game_1 = require("../../game");
const game_effects_1 = require("../../game/store/effects/game-effects");
class Metang extends pokemon_card_1.PokemonCard {
    constructor() {
        super(...arguments);
        this.stage = card_types_1.Stage.STAGE_1;
        this.evolvesFrom = 'Beldum';
        this.cardType = card_types_1.CardType.METAL;
        this.hp = 100;
        this.weakness = [{ type: card_types_1.CardType.FIRE }];
        this.resistance = [{ type: card_types_1.CardType.GRASS, value: -30 }];
        this.retreat = [card_types_1.CardType.COLORLESS, card_types_1.CardType.COLORLESS];
        this.abilities = [{
                name: 'Metal Maker',
                useWhenInPlay: true,
                powerType: game_1.PowerType.ABILITY,
                text: 'Once during your turn, you may look at the top 4 cards of your deck and attach any number of Basic Metal Energy you find there to your Pokémon in any way you like. Shuffle the other cards and put them at the bottom of your deck.'
            }];
        this.attacks = [{
                name: 'Beam',
                cost: [card_types_1.CardType.METAL, card_types_1.CardType.COLORLESS, card_types_1.CardType.COLORLESS],
                damage: 60,
                text: ''
            }];
        this.regulationMark = 'H';
        this.set = 'SV5';
        this.cardImage = 'assets/cardback.png';
        this.setNumber = '47';
        this.name = 'Metang';
        this.fullName = 'Metang SV5';
        this.MAGNET_MARKER = 'MAGNET_MARKER';
    }
    reduceEffect(store, state, effect) {
        if (effect instanceof game_effects_1.PowerEffect && effect.power === this.powers[0]) {
            const player = effect.player;
            const temp = new game_1.CardList();
            // Create deckBottom and move hand into it
            const deckBottom = new game_1.CardList();
            // Check if any cards drawn are basic energy
            const energyCardsDrawn = temp.cards.filter(card => {
                return card instanceof game_1.EnergyCard && card.energyType === card_types_1.EnergyType.BASIC && card.name === 'Basic Metal Energy';
            });
            // If no energy cards were drawn, move all cards to deck & shuffle
            if (energyCardsDrawn.length == 0) {
                temp.cards.slice(0, 4).forEach(card => {
                    store.prompt(state, new game_1.ShuffleDeckPrompt(player.id), order => {
                        player.hand.applyOrder(order);
                        temp.moveCardTo(card, deckBottom);
                    });
                });
            }
            else {
                // Prompt to attach energy if any were drawn
                return store.prompt(state, new game_1.AttachEnergyPrompt(player.id, game_1.GameMessage.ATTACH_ENERGY_CARDS, temp, // Only show drawn energies
                game_1.PlayerType.BOTTOM_PLAYER, [game_1.SlotType.BENCH, game_1.SlotType.ACTIVE], { superType: card_types_1.SuperType.ENERGY, energyType: card_types_1.EnergyType.BASIC, name: 'Basic Metal Energy' }, { min: 0, max: energyCardsDrawn.length }), transfers => {
                    // Attach energy based on prompt selection
                    if (transfers) {
                        for (const transfer of transfers) {
                            const target = game_1.StateUtils.getTarget(state, player, transfer.to);
                            temp.moveCardTo(transfer.card, target); // Move card to target
                        }
                        temp.cards.forEach(card => {
                            store.prompt(state, new game_1.ShuffleDeckPrompt(player.id), order => {
                                player.hand.applyOrder(order);
                                temp.moveCardTo(card, deckBottom);
                            });
                        });
                        return state;
                    }
                    return state;
                });
            }
            return state;
        }
        return state;
    }
}
exports.Metang = Metang;
