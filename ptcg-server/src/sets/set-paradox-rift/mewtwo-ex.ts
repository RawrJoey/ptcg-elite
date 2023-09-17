import { PokemonCard } from '../../game/store/card/pokemon-card';
import { Stage, CardType, CardTag, EnergyType, SuperType } from '../../game/store/card/card-types';
import { StoreLike, State, PlayerType, ChooseCardsPrompt, GameMessage, StateUtils } from '../../game';
import { AttackEffect } from '../../game/store/effects/game-effects';
import { Effect } from '../../game/store/effects/effect';
import { CheckProvidedEnergyEffect } from '../../game/store/effects/check-effects';

export class Mewtwoex extends PokemonCard {

  public stage: Stage = Stage.BASIC;

  public tags = [ CardTag.POKEMON_ex ];

  public cardType: CardType = CardType.LIGHTNING;

  public hp: number = 230;

  public weakness = [{ type: CardType.FIGHTING }];

  public retreat = [ CardType.COLORLESS, CardType.COLORLESS ];

  public attacks = [
    {
      name: 'Trans Charge',
      cost: [ CardType.PSYCHIC ],
      damage: 0,
      text: 'Attach up to 2 Basic P Energy from your discard pile to your Pokemon in any way you like.'
    },
    {
      name: 'Photon Kinesis',
      cost: [ CardType.PSYCHIC, CardType.PSYCHIC ],
      damage: 10,
      text: 'This attack does 30 more damage for each P Energy attached to all of your Pokémon.'
    },
  ];

  public set: string = 'PAR';

  public name: string = 'Mewtwo ex';

  public fullName: string = 'Mewtwo ex PAR';

  public reduceEffect(store: StoreLike, state: State, effect: Effect): State {

    
    if (effect instanceof AttackEffect && effect.attack === this.attacks[0]) {
      const player = effect.player;

      const cardList = StateUtils.findCardList(state, this);
      if (cardList === undefined) {
        return state;
      }
  
      return store.prompt(state, new ChooseCardsPrompt(
        player.id,
        GameMessage.CHOOSE_CARD_TO_ATTACH,
        player.discard,
        { superType: SuperType.ENERGY, energyType: EnergyType.BASIC, name: 'Psychic Energy' },
        { min: 0, max: 2, allowCancel: true }
      ), cards => {
        cards = cards || [];
        if (cards.length > 0) {
          player.discard.moveCardsTo(cards, cardList);
        }
        return state;
      });
    }


    if (effect instanceof AttackEffect && effect.attack === this.attacks[1]) {
      const player = effect.player;

      let energies = 0;
      player.forEachPokemon(PlayerType.BOTTOM_PLAYER, (cardList, card) => {
        const checkProvidedEnergyEffect = new CheckProvidedEnergyEffect(player, cardList);
        store.reduceEffect(state, checkProvidedEnergyEffect);
        checkProvidedEnergyEffect.energyMap.forEach(energy => {
          energies += energy.provides.length;
        });
      });

      effect.damage = 10 + energies * 30;
    }

    return state;
  }

}
