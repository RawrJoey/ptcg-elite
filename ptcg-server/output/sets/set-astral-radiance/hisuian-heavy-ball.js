"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HisuianHeavyBall = void 0;
const game_1 = require("../../game");
const play_card_effects_1 = require("../../game/store/effects/play-card-effects");
class HisuianHeavyBall extends game_1.TrainerCard {
    constructor() {
        super(...arguments);
        this.trainerType = game_1.TrainerType.ITEM;
        this.regulationMark = 'F';
        this.set = 'ASR';
        this.name = 'Hisuian Heavy Ball';
        this.cardImage = 'assets/cardback.png';
        this.setNumber = '146';
        this.fullName = 'Hisuian Heavy Ball ASR';
        this.text = 'Look at your face-down Prize cards. You may reveal a Basic Pokémon you find there, put it into your hand, and put this Hisuian Heavy Ball in its place as a face-down Prize card. (If you don\'t reveal a Basic Pokémon, put this card in the discard pile.) Then, shuffle your face-down Prize cards.';
    }
    reduceEffect(store, state, effect) {
        if (effect instanceof play_card_effects_1.TrainerEffect && effect.trainerCard === this) {
            const player = effect.player;
            const prizes = player.prizes.filter(p => p.isSecret);
            if (prizes.length === 0) {
                throw new game_1.GameError(game_1.GameMessage.CANNOT_PLAY_THIS_CARD);
            }
            const cards = [];
            prizes.forEach(p => { p.cards.forEach(c => cards.push(c)); });
            const blocked = [];
            player.prizes.forEach((c, index) => {
                if (!c.isSecret) {
                    blocked.push(index);
                }
            });
            // Make prizes no more secret, before displaying prompt
            prizes.forEach(p => { p.isSecret = false; });
            // We will discard this card after prompt confirmation
            effect.preventDefault = true;
            player.hand.moveCardTo(effect.trainerCard, player.supporter);
            player.prizes.map(p => p.cards[0]).forEach((c, index) => {
                if (!(c instanceof game_1.PokemonCard && c.stage === game_1.Stage.BASIC)) {
                    blocked.push(index);
                }
            });
            state = store.prompt(state, new game_1.ChoosePrizePrompt(player.id, game_1.GameMessage.CHOOSE_POKEMON, { count: 1, blocked: blocked, allowCancel: true }), chosenPrize => {
                if (chosenPrize === null || chosenPrize.length === 0) {
                    prizes.forEach(p => { p.isSecret = true; });
                    player.supporter.moveCardTo(effect.trainerCard, player.discard);
                    player.prizes = this.shuffleFaceDownPrizeCards(player.prizes);
                    return state;
                }
                const opponent = game_1.StateUtils.getOpponent(state, player);
                store.prompt(state, new game_1.ShowCardsPrompt(opponent.id, game_1.GameMessage.CARDS_SHOWED_BY_THE_OPPONENT, chosenPrize[0].cards), () => {
                    const prizePokemon = chosenPrize[0];
                    const hand = player.hand;
                    const heavyBall = effect.trainerCard;
                    store.log(state, game_1.GameLog.LOG_HISUIAN_HEAVY_BALL, { name: player.name, card: chosenPrize[0].cards[0].name });
                    prizePokemon.moveTo(hand);
                    const chosenPrizeIndex = player.prizes.indexOf(chosenPrize[0]);
                    player.supporter.moveCardTo(heavyBall, player.prizes[chosenPrizeIndex]);
                    prizes.forEach(p => { p.isSecret = true; });
                    player.prizes = this.shuffleFaceDownPrizeCards(player.prizes);
                });
            });
            return state;
        }
        return state;
    }
    shuffleFaceDownPrizeCards(array) {
        const faceDownPrizeCards = array.filter(p => p.isSecret && p.cards.length > 0);
        for (let i = faceDownPrizeCards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            const temp = faceDownPrizeCards[i];
            faceDownPrizeCards[i] = faceDownPrizeCards[j];
            faceDownPrizeCards[j] = temp;
        }
        const prizePositions = [];
        for (let i = 0; i < array.length; i++) {
            if (array[i].cards.length === 0 || !array[i].isSecret) {
                prizePositions.push(array[i]);
                continue;
            }
            prizePositions.push(faceDownPrizeCards.splice(0, 1)[0]);
        }
        return prizePositions;
    }
}
exports.HisuianHeavyBall = HisuianHeavyBall;
