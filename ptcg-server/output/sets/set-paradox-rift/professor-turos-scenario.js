"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfessorTurosScenario = void 0;
const play_card_action_1 = require("../../game/store/actions/play-card-action");
const game_message_1 = require("../../game/game-message");
const trainer_card_1 = require("../../game/store/card/trainer-card");
const card_types_1 = require("../../game/store/card/card-types");
const play_card_effects_1 = require("../../game/store/effects/play-card-effects");
const choose_pokemon_prompt_1 = require("../../game/store/prompts/choose-pokemon-prompt");
class ProfessorTurosScenario extends trainer_card_1.TrainerCard {
    constructor() {
        super(...arguments);
        this.trainerType = card_types_1.TrainerType.SUPPORTER;
        this.regulationMark = 'G';
        this.set = 'PAR';
        this.set2 = 'futureflash';
        this.setNumber = '65';
        this.name = 'Professor Turo\'s Scenario';
        this.fullName = 'Professor Turo\'s Scenario PAR';
        this.text = 'Put 1 of your Pokémon into your hand. (Discard all attached cards.)';
    }
    reduceEffect(store, state, effect) {
        if (effect instanceof play_card_effects_1.TrainerEffect && effect.trainerCard === this) {
            const player = effect.player;
            return store.prompt(state, new choose_pokemon_prompt_1.ChoosePokemonPrompt(player.id, game_message_1.GameMessage.CHOOSE_POKEMON_TO_PICK_UP, play_card_action_1.PlayerType.BOTTOM_PLAYER, [play_card_action_1.SlotType.ACTIVE, play_card_action_1.SlotType.BENCH], { allowCancel: false }), result => {
                const cardList = result.length > 0 ? result[0] : null;
                if (cardList !== null) {
                    const pokemons = cardList.getPokemons();
                    cardList.moveCardsTo(pokemons, player.hand);
                    cardList.moveTo(player.discard);
                    cardList.clearEffects();
                }
            });
        }
        return state;
    }
}
exports.ProfessorTurosScenario = ProfessorTurosScenario;
