"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Slowking = void 0;
const pokemon_card_1 = require("../../game/store/card/pokemon-card");
const card_types_1 = require("../../game/store/card/card-types");
const game_1 = require("../../game");
const game_effects_1 = require("../../game/store/effects/game-effects");
const attack_effects_1 = require("../../game/store/effects/attack-effects");
class Slowking extends pokemon_card_1.PokemonCard {
    constructor() {
        super(...arguments);
        this.stage = card_types_1.Stage.STAGE_1;
        this.evolvesFrom = 'Slowpoke';
        this.cardType = card_types_1.CardType.PSYCHIC;
        this.hp = 120;
        this.weakness = [{ type: card_types_1.CardType.DARK }];
        this.resistance = [{ type: card_types_1.CardType.FIGHTING, value: -30 }];
        this.retreat = [card_types_1.CardType.COLORLESS, card_types_1.CardType.COLORLESS, card_types_1.CardType.COLORLESS];
        this.attacks = [
            {
                name: 'Seek Inspiration',
                cost: [card_types_1.CardType.PSYCHIC, card_types_1.CardType.COLORLESS],
                damage: 0,
                text: 'Discard the top card of your deck, and if that card is a Pokemon that doesn\'t have a Rule Box, ' +
                    'choose 1 of its attacks and use it as this attack. (Pokemon ex, Pokemon V, etc. have Rule Boxes.)'
            },
            { name: 'Super Psy Bolt', cost: [card_types_1.CardType.PSYCHIC, card_types_1.CardType.PSYCHIC, card_types_1.CardType.COLORLESS], damage: 120, text: '' }
        ];
        this.set = 'SCR';
        this.name = 'Slowking';
        this.fullName = 'Slowking SCR';
        this.setNumber = '58';
        this.regulationMark = 'H';
        this.cardImage = 'assets/cardback.png';
    }
    reduceEffect(store, state, effect) {
        if (effect instanceof game_effects_1.AttackEffect && effect.attack === this.attacks[0]) {
            const player = effect.player;
            const opponent = effect.opponent;
            if (player.deck.cards.length <= 0) {
                return state;
            } // Attack does nothing if deck is empty.
            const deckTop = new game_1.CardList();
            player.deck.moveTo(deckTop, 1);
            const topdeck = deckTop.cards[0]; // This is the card we're looking at.
            player.deck.moveCardTo(topdeck, player.discard);
            if (!(topdeck instanceof pokemon_card_1.PokemonCard) || (topdeck.tags.includes(card_types_1.CardTag.POKEMON_EX) || topdeck.tags.includes(card_types_1.CardTag.POKEMON_GX) ||
                topdeck.tags.includes(card_types_1.CardTag.POKEMON_LV_X) || topdeck.tags.includes(card_types_1.CardTag.POKEMON_V) ||
                topdeck.tags.includes(card_types_1.CardTag.POKEMON_ex) || topdeck.tags.includes(card_types_1.CardTag.PRISM_STAR) ||
                topdeck.tags.includes(card_types_1.CardTag.RADIANT) || topdeck.tags.includes(card_types_1.CardTag.POKEMON_VMAX) || topdeck.tags.includes(card_types_1.CardTag.POKEMON_VSTAR))) {
                return state;
            }
            return store.prompt(state, new game_1.ChooseAttackPrompt(player.id, game_1.GameMessage.CHOOSE_ATTACK_TO_COPY, [topdeck], { allowCancel: false }), attack => {
                if (attack !== null) {
                    store.log(state, game_1.GameLog.LOG_PLAYER_COPIES_ATTACK, {
                        name: player.name,
                        attack: attack.name
                    });
                    // Perform attack
                    const attackEffect = new game_effects_1.AttackEffect(player, opponent, attack);
                    store.reduceEffect(state, attackEffect);
                    if (attackEffect.damage > 0) {
                        const dealDamage = new attack_effects_1.DealDamageEffect(attackEffect, attackEffect.damage);
                        state = store.reduceEffect(state, dealDamage);
                    }
                }
            });
        }
        return state;
    }
}
exports.Slowking = Slowking;
