"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Kyurem = void 0;
const pokemon_card_1 = require("../../game/store/card/pokemon-card");
const card_types_1 = require("../../game/store/card/card-types");
const game_effects_1 = require("../../game/store/effects/game-effects");
const game_1 = require("../../game");
const check_effects_1 = require("../../game/store/effects/check-effects");
const attack_effects_1 = require("../../game/store/effects/attack-effects");
class Kyurem extends pokemon_card_1.PokemonCard {
    constructor() {
        super(...arguments);
        this.stage = card_types_1.Stage.BASIC;
        this.regulationMark = 'H';
        this.cardType = card_types_1.CardType.DRAGON;
        this.hp = 130;
        this.retreat = [card_types_1.CardType.COLORLESS, card_types_1.CardType.COLORLESS];
        this.powers = [{
                name: 'Anti-Plasma',
                powerType: game_1.PowerType.ABILITY,
                text: 'If your opponent has any card with Colress in its name in their discard pile, this Pokémon\'s Tri Frost attack can be used for 1 Colorless Energy.'
            }];
        this.attacks = [{
                name: 'Tri-Frost',
                cost: [card_types_1.CardType.WATER, card_types_1.CardType.WATER, card_types_1.CardType.METAL, card_types_1.CardType.METAL, card_types_1.CardType.COLORLESS],
                damage: 0,
                text: 'Discard all Energy from this Pokémon. This attack does 110 damage to 3 of your opponent\'s Pokémon.'
            }];
        this.set = 'SV6a';
        this.cardImage = 'assets/cardback.png';
        this.setNumber = '47';
        this.name = 'Kyurem';
        this.fullName = 'Kyurem SV6a';
    }
    reduceEffect(store, state, effect) {
        if (effect instanceof game_effects_1.UseAttackEffect && effect.attack === this.attacks[0]) {
            const player = effect.player;
            const opponent = game_1.StateUtils.getOpponent(state, player);
            new check_effects_1.CheckPokemonAttacksEffect(player);
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
            let isColressInOpponentsDiscard = false;
            opponent.discard.cards.find(card => {
                if (card.name === 'Colress' || card.name === 'Colress\'s Experiment' || card.name === 'Colress\'s Obsession') {
                    isColressInOpponentsDiscard = true;
                }
            });
            if (isColressInOpponentsDiscard) {
                this.attacks[0].cost = [card_types_1.CardType.COLORLESS];
            }
        }
        if (effect instanceof game_effects_1.AttackEffect && effect.attack === this.attacks[0]) {
            const player = effect.player;
            const opponent = game_1.StateUtils.getOpponent(state, player);
            const checkProvidedEnergy = new check_effects_1.CheckProvidedEnergyEffect(player);
            state = store.reduceEffect(state, checkProvidedEnergy);
            const cards = checkProvidedEnergy.energyMap.map(e => e.card);
            const discardEnergy = new attack_effects_1.DiscardCardsEffect(effect, cards);
            discardEnergy.target = player.active;
            store.reduceEffect(state, discardEnergy);
            return store.prompt(state, new game_1.ChoosePokemonPrompt(player.id, game_1.GameMessage.CHOOSE_POKEMON_TO_DAMAGE, game_1.PlayerType.TOP_PLAYER, [game_1.SlotType.ACTIVE, game_1.SlotType.BENCH], { min: 1, max: 3, allowCancel: false }), selected => {
                const targets = selected || [];
                if (targets.includes(opponent.active)) {
                    targets.forEach(target => {
                        const damageEffect = new attack_effects_1.PutDamageEffect(effect, 110);
                        damageEffect.target = target;
                        store.reduceEffect(state, damageEffect);
                    });
                }
            });
        }
        return state;
    }
}
exports.Kyurem = Kyurem;
