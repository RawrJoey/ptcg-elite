"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Farfetchd = void 0;
const pokemon_card_1 = require("../../game/store/card/pokemon-card");
const game_1 = require("../../game");
const card_types_1 = require("../../game/store/card/card-types");
const play_card_effects_1 = require("../../game/store/effects/play-card-effects");
const game_message_1 = require("../../game/game-message");
const game_effects_1 = require("../../game/store/effects/game-effects");
class Farfetchd extends pokemon_card_1.PokemonCard {
    constructor() {
        super(...arguments);
        this.stage = card_types_1.Stage.BASIC;
        this.regulationMark = 'H';
        this.cardType = card_types_1.CardType.COLORLESS;
        this.hp = 70;
        this.weakness = [{ type: card_types_1.CardType.LIGHTNING }];
        this.resistance = [{ type: card_types_1.CardType.FIGHTING, value: -30 }];
        this.retreat = [card_types_1.CardType.COLORLESS];
        this.powers = [{
                name: 'Sonic Duty',
                powerType: game_1.PowerType.ABILITY,
                text: 'You may use this Ability when you put this card from your hand onto your Bench during your turn. Search your deck for a Pokémon Tool card and attach it to this Pokémon. Then, shuffle your deck.'
            }];
        this.attacks = [
            {
                name: 'Mach Cut',
                cost: [card_types_1.CardType.COLORLESS],
                damage: 30,
                text: 'Discard a Special Energy from your opponent\'s Active Pokémon.'
            }
        ];
        this.set = 'SV6';
        this.cardImage = 'assets/cardback.png';
        this.setNumber = '83';
        this.name = 'Farfetch\'d';
        this.fullName = 'Farfetch\'d SV6';
    }
    reduceEffect(store, state, effect) {
        if (effect instanceof play_card_effects_1.PlayPokemonEffect && effect.pokemonCard === this) {
            const player = game_1.StateUtils.findOwner(state, effect.target);
            // Try to reduce PowerEffect, to check if something is blocking our ability
            try {
                const powerEffect = new game_effects_1.PowerEffect(player, this.powers[0], this);
                store.reduceEffect(state, powerEffect);
            }
            catch (_a) {
                return state;
            }
            state = store.prompt(state, new game_1.ChooseCardsPrompt(player.id, game_message_1.GameMessage.CHOOSE_CARD_TO_HAND, player.deck, { superType: card_types_1.SuperType.TRAINER, trainerType: card_types_1.TrainerType.TOOL }, { min: 0, max: 1, allowCancel: false }), cards => {
                if (cards[0] instanceof game_1.TrainerCard) {
                    state = store.reduceEffect(state, new play_card_effects_1.AttachPokemonToolEffect(player, cards[0], player.active));
                }
                state = store.prompt(state, new game_1.ShuffleDeckPrompt(player.id), order => {
                    player.deck.applyOrder(order);
                });
                return state;
            });
        }
        return state;
    }
}
exports.Farfetchd = Farfetchd;
