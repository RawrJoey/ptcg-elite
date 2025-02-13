"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tyme = void 0;
const game_error_1 = require("../../game/game-error");
const game_message_1 = require("../../game/game-message");
const trainer_card_1 = require("../../game/store/card/trainer-card");
const card_types_1 = require("../../game/store/card/card-types");
const state_utils_1 = require("../../game/store/state-utils");
const play_card_effects_1 = require("../../game/store/effects/play-card-effects");
const game_1 = require("../../game");
function* playCard(next, store, state, self, effect) {
    const player = effect.player;
    const opponent = state_utils_1.StateUtils.getOpponent(state, player);
    let isPokemonInHand = false;
    player.hand.cards.forEach(card => {
        if (card instanceof game_1.PokemonCard) {
            isPokemonInHand = true;
        }
    });
    if (!isPokemonInHand) {
        throw new game_error_1.GameError(game_message_1.GameMessage.CANNOT_PLAY_THIS_CARD);
    }
    player.hand.moveCardTo(effect.trainerCard, player.supporter);
    // We will discard this card after prompt confirmation
    effect.preventDefault = true;
    if (player.supporterTurn > 0) {
        throw new game_error_1.GameError(game_message_1.GameMessage.SUPPORTER_ALREADY_PLAYED);
    }
    const options = [
        { value: 10, message: '10' },
        { value: 20, message: '20' },
        { value: 30, message: '30' },
        { value: 40, message: '40' },
        { value: 50, message: '50' },
        { value: 60, message: '60' },
        { value: 70, message: '70' },
        { value: 80, message: '80' },
        { value: 90, message: '90' },
        { value: 100, message: '100' },
        { value: 110, message: '110' },
        { value: 120, message: '120' },
        { value: 130, message: '130' },
        { value: 140, message: '140' },
        { value: 150, message: '150' },
        { value: 160, message: '160' },
        { value: 170, message: '170' },
        { value: 180, message: '180' },
        { value: 190, message: '190' },
        { value: 200, message: '200' },
        { value: 210, message: '210' },
        { value: 220, message: '220' },
        { value: 230, message: '230' },
        { value: 240, message: '240' },
        { value: 250, message: '250' },
        { value: 260, message: '260' },
        { value: 270, message: '270' },
        { value: 280, message: '280' },
        { value: 290, message: '290' },
        { value: 300, message: '300' },
        { value: 310, message: '310' },
        { value: 320, message: '320' },
        { value: 330, message: '330' },
        { value: 340, message: '340' },
        { value: 350, message: '350' },
        { value: 360, message: '360' },
        { value: 370, message: '370' },
        { value: 380, message: '380' },
        { value: 390, message: '390' },
        { value: 400, message: '400' },
        { value: 410, message: '410' },
        { value: 420, message: '420' },
        { value: 430, message: '430' },
        { value: 440, message: '440' },
        { value: 450, message: '450' },
        { value: 460, message: '460' },
        { value: 470, message: '470' },
        { value: 480, message: '480' },
        { value: 490, message: '490' },
        { value: 500, message: '500' }
    ];
    const selectedPokemon = new game_1.CardList();
    let pokemonName = '';
    let pokemonHP = 0;
    return store.prompt(state, new game_1.ChooseCardsPrompt(player, game_message_1.GameMessage.CHOOSE_CARD_TO_HAND, player.hand, { superType: card_types_1.SuperType.POKEMON }, { min: 1, max: 1, allowCancel: false }), selected => {
        selected.forEach(card => {
            if (card instanceof game_1.PokemonCard) {
                pokemonName = card.name;
                pokemonHP = card.hp;
                player.hand.moveCardTo(card, selectedPokemon);
            }
        });
        // dang if only i knew how to log something entirely unique
        store.log(state, game_message_1.GameLog.LOG_PLAYER_RETURNS_CARD_TO_HAND, { name: player.name, card: pokemonName });
        return store.prompt(state, new game_1.SelectPrompt(opponent.id, game_message_1.GameMessage.CHOOSE_OPTION, options.map(c => c.message), { allowCancel: false }), choice => {
            const option = options[choice];
            store.prompt(state, new game_1.ShowCardsPrompt(opponent.id, game_message_1.GameMessage.CARDS_SHOWED_BY_THE_OPPONENT, selectedPokemon.cards), () => {
                if (option.value === pokemonHP) {
                    opponent.deck.moveTo(opponent.hand, 4);
                    selectedPokemon.moveTo(player.hand);
                }
                else {
                    player.deck.moveTo(player.hand, 4);
                    selectedPokemon.moveTo(player.hand);
                }
            });
            player.supporter.moveTo(player.discard);
        });
    });
}
class Tyme extends trainer_card_1.TrainerCard {
    constructor() {
        super(...arguments);
        this.trainerType = card_types_1.TrainerType.SUPPORTER;
        this.set = 'SSP';
        this.cardImage = 'assets/cardback.png';
        this.setNumber = '190';
        this.regulationMark = 'H';
        this.name = 'Tyme';
        this.fullName = 'Tyme SSP';
        this.text = 'Tell your opponent the name of a Pokémon in your hand and put that Pokémon face down in front of you. Your opponent guesses that Pokémon\'s HP, and then you reveal it. If your opponent guessed right, they draw 4 cards. If they guessed wrong, you draw 4 cards. Then, return the Pokémon to your hand.';
    }
    reduceEffect(store, state, effect) {
        if (effect instanceof play_card_effects_1.TrainerEffect && effect.trainerCard === this) {
            const generator = playCard(() => generator.next(), store, state, this, effect);
            return generator.next().value;
        }
        return state;
    }
}
exports.Tyme = Tyme;
