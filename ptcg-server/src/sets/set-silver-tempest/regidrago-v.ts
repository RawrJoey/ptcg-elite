import { PokemonCard } from '../../game/store/card/pokemon-card';
import { Stage, CardType, EnergyType, SuperType, CardTag } from '../../game/store/card/card-types';
import { StoreLike, State, PlayerType, GameMessage, AttachEnergyPrompt, EnergyCard, SlotType, StateUtils, CardList, ChoosePokemonPrompt } from '../../game';
import { AttackEffect } from '../../game/store/effects/game-effects';
import { Effect } from '../../game/store/effects/effect';
import { PutDamageEffect } from '../../game/store/effects/attack-effects';

export class RegidragoV extends PokemonCard {

  public stage: Stage = Stage.BASIC;

  public tags = [CardTag.POKEMON_V];

  public cardType: CardType = CardType.DRAGON;

  public hp: number = 220;

  public retreat = [CardType.COLORLESS, CardType.COLORLESS, CardType.COLORLESS];

  public attacks = [
    {
      name: 'Celestial Roar',
      cost: [CardType.COLORLESS],
      damage: 0,
      text: 'Discard the top 3 cards of your deck. If any of those cards are Energy cards, attach them to this Pokémon.'
    },
    {
      name: 'Dragon Laser',
      cost: [CardType.GRASS, CardType.GRASS, CardType.FIRE],
      damage: 130,
      text: 'This attack also does 30 damage to 1 of your opponent\'s Benched Pokémon. (Don\'t apply Weakness and Resistance for Benched Pokémon.)'
    }
  ];

  public set: string = 'SIT';

  public cardImage: string = 'assets/cardback.png';

  public setNumber: string = '135';

  public regulationMark = 'F';

  public name: string = 'Regidrago V';

  public fullName: string = 'Regidrago V SIT';


  public reduceEffect(store: StoreLike, state: State, effect: Effect): State {

    if (effect instanceof AttackEffect && effect.attack === this.attacks[0]) {

      const player = effect.player;
      const temp = new CardList();


      player.deck.moveTo(temp, 3);

      // Check if any cards drawn are basic energy
      const energyCardsDrawn = temp.cards.filter(card => {
        return card instanceof EnergyCard && card.energyType === EnergyType.BASIC;
      });

      // If no energy cards were drawn, move all cards to hand
      if (energyCardsDrawn.length == 0) {
        temp.cards.slice(0, 3).forEach(card => {
          temp.moveCardTo(card, player.discard);
        });
      } else {

        // Prompt to attach energy if any were drawn
        return store.prompt(state, new AttachEnergyPrompt(
          player.id,
          GameMessage.ATTACH_ENERGY_CARDS,
          temp, // Only show drawn energies
          PlayerType.BOTTOM_PLAYER,
          [SlotType.ACTIVE],
          { superType: SuperType.ENERGY, energyType: EnergyType.BASIC },
          { min: energyCardsDrawn.length, max: energyCardsDrawn.length, allowCancel: false }
        ), transfers => {

          // Attach energy based on prompt selection
          if (transfers) {
            for (const transfer of transfers) {
              const target = StateUtils.getTarget(state, player, transfer.to);
              temp.moveCardTo(transfer.card, target); // Move card to target
            }
            temp.cards.forEach(card => {
              temp.moveCardTo(card, player.discard); // Move card to discard

            });
          }
        });
      }

      if (effect instanceof AttackEffect && effect.attack === this.attacks[1]) {
        const player = effect.player;
        const opponent = StateUtils.getOpponent(state, player);

        const hasBenched = opponent.bench.some(b => b.cards.length > 0);
        if (!hasBenched) {
          return state;
        }

        state = store.prompt(state, new ChoosePokemonPrompt(
          player.id,
          GameMessage.CHOOSE_POKEMON_TO_DAMAGE,
          PlayerType.TOP_PLAYER,
          [SlotType.BENCH],
          { allowCancel: false }
        ), targets => {
          if (!targets || targets.length === 0) {
            return;
          }
          const damageEffect = new PutDamageEffect(effect, 30);
          damageEffect.target = targets[0];
          store.reduceEffect(state, damageEffect);
        });

        return state;
      }
      return state;
    }
    return state;
  }
}