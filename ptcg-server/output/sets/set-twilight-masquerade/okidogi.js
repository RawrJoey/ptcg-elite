"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Okidogi = void 0;
const game_1 = require("../../game");
const card_types_1 = require("../../game/store/card/card-types");
const pokemon_card_1 = require("../../game/store/card/pokemon-card");
const attack_effects_1 = require("../../game/store/effects/attack-effects");
const check_effects_1 = require("../../game/store/effects/check-effects");
const game_effects_1 = require("../../game/store/effects/game-effects");
class Okidogi extends pokemon_card_1.PokemonCard {
    constructor() {
        super(...arguments);
        this.stage = card_types_1.Stage.BASIC;
        this.regulationMark = 'H';
        this.cardType = card_types_1.CardType.FIGHTING;
        this.hp = 130;
        this.weakness = [{ type: card_types_1.CardType.PSYCHIC }];
        this.resistance = [];
        this.retreat = [card_types_1.CardType.COLORLESS, card_types_1.CardType.COLORLESS];
        this.powers = [
            {
                name: 'Adrena-Power',
                useWhenInPlay: false,
                powerType: game_1.PowerType.ABILITY,
                text: 'If this Pokémon has any [D] Energy attached, it gets +100 HP, and the attacks it uses do 100 more damage to your opponent\'s Active Pokémon (before applying Weakness and Resistance).'
            }
        ];
        this.attacks = [
            {
                name: 'Good Punch',
                cost: [card_types_1.CardType.FIGHTING, card_types_1.CardType.FIGHTING],
                damage: 70,
                text: ''
            }
        ];
        this.set = 'TWM';
        this.cardImage = 'assets/cardback.png';
        this.setNumber = '111';
        this.name = 'Okidogi';
        this.fullName = 'Okidogi TWM';
    }
    reduceEffect(store, state, effect) {
        if (effect instanceof attack_effects_1.DealDamageEffect && effect.source.cards.includes(this)) {
            const player = effect.player;
            if (effect.damage === 0 || game_1.StateUtils.getOpponent(state, player).active !== effect.target) {
                return state;
            }
            try {
                const stub = new game_effects_1.PowerEffect(player, {
                    name: 'test',
                    powerType: game_1.PowerType.ABILITY,
                    text: ''
                }, this);
                store.reduceEffect(state, stub);
            }
            catch (_a) {
                return state;
            }
            let hasDarkAttached = false;
            player.forEachPokemon(game_1.PlayerType.BOTTOM_PLAYER, cardList => {
                if (cardList.getPokemonCard() === this) {
                    const checkEnergy = new check_effects_1.CheckProvidedEnergyEffect(player, cardList);
                    store.reduceEffect(state, checkEnergy);
                    checkEnergy.energyMap.forEach(em => {
                        const energyCard = em.card;
                        if (energyCard instanceof game_1.EnergyCard && energyCard.provides.includes(card_types_1.CardType.DARK) || energyCard instanceof game_1.EnergyCard && energyCard.provides.includes(card_types_1.CardType.ANY) || (energyCard instanceof game_1.EnergyCard && energyCard.blendedEnergies.includes(card_types_1.CardType.DARK))) {
                            hasDarkAttached = true;
                        }
                    });
                    if (!hasDarkAttached) {
                        return state;
                    }
                    if (hasDarkAttached) {
                        effect.damage += 100;
                        return state;
                    }
                }
            });
        }
        if (effect instanceof check_effects_1.CheckHpEffect && effect.target.cards.includes(this)) {
            const player = effect.player;
            try {
                const stub = new game_effects_1.PowerEffect(player, {
                    name: 'test',
                    powerType: game_1.PowerType.ABILITY,
                    text: ''
                }, this);
                store.reduceEffect(state, stub);
            }
            catch (_b) {
                return state;
            }
            let hasDarkAttached = false;
            player.forEachPokemon(game_1.PlayerType.BOTTOM_PLAYER, cardList => {
                if (cardList.getPokemonCard() === this) {
                    const checkEnergy = new check_effects_1.CheckProvidedEnergyEffect(player, cardList);
                    store.reduceEffect(state, checkEnergy);
                    checkEnergy.energyMap.forEach(em => {
                        const energyCard = em.card;
                        if (energyCard instanceof game_1.EnergyCard && energyCard.provides.includes(card_types_1.CardType.DARK) || energyCard instanceof game_1.EnergyCard && energyCard.provides.includes(card_types_1.CardType.ANY) || (energyCard instanceof game_1.EnergyCard && energyCard.blendedEnergies.includes(card_types_1.CardType.DARK))) {
                            hasDarkAttached = true;
                        }
                    });
                    if (!hasDarkAttached) {
                        return state;
                    }
                    if (hasDarkAttached) {
                        effect.hp += 100;
                        console.log('okidogi hp increased');
                        return state;
                    }
                }
            });
        }
        return state;
    }
}
exports.Okidogi = Okidogi;
