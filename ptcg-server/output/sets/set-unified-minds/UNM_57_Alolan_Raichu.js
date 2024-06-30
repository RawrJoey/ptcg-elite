"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlolanRaichu = void 0;
const pokemon_card_1 = require("../../game/store/card/pokemon-card");
const card_types_1 = require("../../game/store/card/card-types");
const game_1 = require("../../game");
const game_effects_1 = require("../../game/store/effects/game-effects");
const attack_effects_1 = require("../../game/store/effects/attack-effects");
class AlolanRaichu extends pokemon_card_1.PokemonCard {
    constructor() {
        super(...arguments);
        this.stage = card_types_1.Stage.STAGE_1;
        this.evolvesFrom = 'Pikachu';
        this.cardType = card_types_1.CardType.LIGHTNING;
        this.hp = 110;
        this.weakness = [{ type: card_types_1.CardType.FIGHTING }];
        this.resistance = [{ type: card_types_1.CardType.METAL, value: -20 }];
        this.retreat = [card_types_1.CardType.COLORLESS];
        this.attacks = [{
                name: 'Electro Rain',
                cost: [card_types_1.CardType.LIGHTNING],
                damage: 0,
                text: 'Discard any amount of [L] Energy from this Pokémon. Then, for each Energy you discarded in this way, choose 1 of your opponent\'s Pokémon and do 30 damage to it. (You can choose the same Pokémon more than once.) This damage isn\'t affected by Weakness or Resistance. '
            },
            {
                name: 'Electric Ball',
                cost: [card_types_1.CardType.LIGHTNING, card_types_1.CardType.COLORLESS, card_types_1.CardType.COLORLESS],
                damage: 90,
                text: ''
            }];
        this.set = 'UNM';
        this.setNumber = '57';
        this.cardImage = 'assets/cardback.png';
        this.name = 'Alolan Raichu';
        this.fullName = 'Alolan Raichu UNM';
    }
    reduceEffect(store, state, effect) {
        if (effect instanceof game_effects_1.AttackEffect && effect.attack === this.attacks[0]) {
            const player = effect.player;
            return store.prompt(state, new game_1.ChooseCardsPrompt(player.id, game_1.GameMessage.CHOOSE_ENERGIES_TO_DISCARD, player.active, // Card source is target Pokemon
            { superType: card_types_1.SuperType.ENERGY, provides: [card_types_1.CardType.LIGHTNING] }, { allowCancel: false }), selected => {
                const cards = selected || [];
                if (cards.length > 0) {
                    const discardEnergy = new attack_effects_1.DiscardCardsEffect(effect, cards);
                    discardEnergy.target = player.active;
                    store.reduceEffect(state, discardEnergy);
                    // For every energy discarded, target a brodie and do 30 to it. Same target can be selected multiple times
                    discardEnergy.cards.forEach(card => {
                        return store.prompt(state, new game_1.ChoosePokemonPrompt(player.id, game_1.GameMessage.CHOOSE_POKEMON_TO_DAMAGE, game_1.PlayerType.TOP_PLAYER, [game_1.SlotType.ACTIVE, game_1.SlotType.BENCH], { min: 1, max: 1, allowCancel: false }), selected => {
                            const targets = selected || [];
                            targets.forEach(target => {
                                //damaging target
                                const damageEffect = new attack_effects_1.PutDamageEffect(effect, 30);
                                damageEffect.target = target;
                                store.reduceEffect(state, damageEffect);
                            });
                        });
                    });
                }
                return state;
            });
        }
        return state;
    }
}
exports.AlolanRaichu = AlolanRaichu;
