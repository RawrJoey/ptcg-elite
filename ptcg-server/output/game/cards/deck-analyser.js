"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeckAnalyser = void 0;
const card_manager_1 = require("./card-manager");
const energy_card_1 = require("../store/card/energy-card");
const card_types_1 = require("../store/card/card-types");
const pokemon_card_1 = require("../store/card/pokemon-card");
class DeckAnalyser {
    constructor(cardNames = []) {
        this.cardNames = cardNames;
        const cardManager = card_manager_1.CardManager.getInstance();
        this.cards = [];
        cardNames.forEach(name => {
            const card = cardManager.getCardByName(name);
            if (card !== undefined) {
                this.cards.push(card);
            }
        });
    }
    isValid() {
        const countMap = {};
        let hasBasicPokemon = false;
        let hasAceSpec = false;
        let hasRadiant = false;
        if (this.cards.length !== 60) {
            return false;
        }
        for (let i = 0; i < this.cards.length; i++) {
            const card = this.cards[i];
            // Check if deck has a basic Pokemon card
            if (card instanceof pokemon_card_1.PokemonCard && card.stage === card_types_1.Stage.BASIC) {
                hasBasicPokemon = true;
            }
            // Count cards, except basic energies
            if (!(card instanceof energy_card_1.EnergyCard) || card.energyType !== card_types_1.EnergyType.BASIC) {
                countMap[card.name] = (countMap[card.name] || 0) + 1;
                if (countMap[card.name] > 4) {
                    return false;
                }
            }
            if (card.tags.includes(card_types_1.CardTag.ACE_SPEC)) {
                if (hasAceSpec) {
                    return false;
                }
                hasAceSpec = true;
            }
            if (card.tags.includes(card_types_1.CardTag.RADIANT)) {
                if (hasRadiant) {
                    return false;
                }
                hasRadiant = true;
            }
        }
        return hasBasicPokemon;
    }
    getDeckType() {
        const cardTypes = [];
        for (let i = 0; i < this.cards.length; i++) {
            const card = this.cards[i];
            let cardTypez = card_types_1.CardType.NONE;
            if (card instanceof pokemon_card_1.PokemonCard) {
                cardTypez = card.cardTypez;
                if (cardTypez !== card_types_1.CardType.NONE && cardTypes.indexOf(cardTypez) === -1) {
                    cardTypes.push(cardTypez);
                }
            }
        }
        return cardTypes;
    }
}
exports.DeckAnalyser = DeckAnalyser;
