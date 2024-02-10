"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EspeonVMAX = void 0;
const pokemon_card_1 = require("../../game/store/card/pokemon-card");
const card_types_1 = require("../../game/store/card/card-types");
const game_1 = require("../../game");
const game_effects_1 = require("../../game/store/effects/game-effects");
const check_effects_1 = require("../../game/store/effects/check-effects");
const attack_effects_1 = require("../../game/store/effects/attack-effects");
class EspeonVMAX extends pokemon_card_1.PokemonCard {
    constructor() {
        super(...arguments);
        this.tags = [card_types_1.CardTag.POKEMON_VMAX];
        this.stage = card_types_1.Stage.VMAX;
        this.evolvesFrom = 'Espeon V';
        this.cardType = card_types_1.CardType.PSYCHIC;
        this.hp = 310;
        this.weakness = [{ type: card_types_1.CardType.DARK }];
        this.resistance = [{ type: card_types_1.CardType.FIGHTING, value: -30 }];
        this.retreat = [card_types_1.CardType.COLORLESS, card_types_1.CardType.COLORLESS];
        this.powers = [{
                name: 'Solar Revelation',
                powerType: game_1.PowerType.ABILITY,
                text: 'Prevent all effects of attacks from your opponent\'s Pokémon done to all of your Pokémon that have Energy attached. (Existing effects are not removed. Damage is not an effect.)'
            }];
        this.attacks = [
            {
                name: 'Max Mindstorm',
                cost: [card_types_1.CardType.PSYCHIC, card_types_1.CardType.COLORLESS, card_types_1.CardType.COLORLESS],
                damage: 60,
                text: 'This attack does 60 damage for each Energy attached to all of your opponent\'s Pokémon.'
            }
        ];
        this.set = 'EVS';
        this.cardImage = 'assets/cardback.png';
        this.setNumber = '65';
        this.name = 'Espeon VMAX';
        this.fullName = 'Espeon VMAX EVS';
    }
    reduceEffect(store, state, effect) {
        if (effect instanceof game_effects_1.AttackEffect && effect.attack === this.attacks[0]) {
            const player = effect.player;
            const opponent = game_1.StateUtils.getOpponent(state, player);
            let energies = 0;
            opponent.forEachPokemon(game_1.PlayerType.TOP_PLAYER, (cardList, card) => {
                const checkProvidedEnergyEffect = new check_effects_1.CheckProvidedEnergyEffect(player, cardList);
                store.reduceEffect(state, checkProvidedEnergyEffect);
                checkProvidedEnergyEffect.energyMap.forEach(energy => {
                    energies += energy.provides.length;
                });
            });
            effect.damage = energies * 60;
        }
        if (effect instanceof check_effects_1.CheckTableStateEffect) {
            state.players.forEach(player => {
                if (player.active.specialConditions.length === 0) {
                    return;
                }
                let hasEspeonVMAXInPlay = false;
                player.forEachPokemon(game_1.PlayerType.BOTTOM_PLAYER, (cardList, card) => {
                    if (card === this) {
                        hasEspeonVMAXInPlay = true;
                    }
                });
                if (!hasEspeonVMAXInPlay) {
                    return state;
                }
                const checkProvidedEnergyEffect = new check_effects_1.CheckProvidedEnergyEffect(player);
                store.reduceEffect(state, checkProvidedEnergyEffect);
                const energyMap = checkProvidedEnergyEffect.energyMap;
                const hasEnergy = game_1.StateUtils.checkEnoughEnergy(energyMap, [card_types_1.CardType.COLORLESS || card_types_1.CardType.DARK || card_types_1.CardType.DRAGON || card_types_1.CardType.FAIRY || card_types_1.CardType.GRASS || card_types_1.CardType.METAL || card_types_1.CardType.PSYCHIC || card_types_1.CardType.WATER || card_types_1.CardType.LIGHTNING || card_types_1.CardType.FIRE]);
                if (hasEnergy) {
                    // Try to reduce PowerEffect, to check if something is blocking our ability
                    try {
                        const powerEffect = new game_effects_1.PowerEffect(player, this.powers[0], this);
                        store.reduceEffect(state, powerEffect);
                    }
                    catch (_a) {
                        return state;
                    }
                    if (effect instanceof attack_effects_1.AbstractAttackEffect && effect.target.cards.includes(this)) {
                        // Allow damage
                        if (effect instanceof attack_effects_1.PutDamageEffect) {
                            return state;
                        }
                        // Try to reduce PowerEffect, to check if something is blocking our ability
                        try {
                            const player = game_1.StateUtils.findOwner(state, effect.target);
                            const powerEffect = new game_effects_1.PowerEffect(player, this.powers[0], this);
                            store.reduceEffect(state, powerEffect);
                        }
                        catch (_b) {
                            return state;
                        }
                        effect.preventDefault = true;
                    }
                }
                return state;
            });
            return state;
        }
        return state;
    }
}
exports.EspeonVMAX = EspeonVMAX;
