import { CardTag, CardType, EnergyType } from '../../game/store/card/card-types';
import { EnergyCard } from '../../game/store/card/energy-card';
import { StoreLike } from '../../game/store/store-like';
import { State } from '../../game/store/state/state';
import { Effect } from '../../game/store/effects/effect';
import { DealDamageEffect } from '../../game/store/effects/attack-effects';
import { CheckProvidedEnergyEffect, CheckTableStateEffect } from '../../game/store/effects/check-effects';
import { StateUtils } from '../../game/store/state-utils';
import { GameError, GameMessage, PlayerType } from '../../game';
import { AttachEnergyEffect } from '../../game/store/effects/play-card-effects';

export class SingleStrikeEnergy extends EnergyCard {

  public cardTag: CardTag[] = [CardTag.SINGLE_STRIKE];

  public regulationMark = 'E';

  public provides: CardType[] = [ CardType.COLORLESS ];

  public energyType = EnergyType.SPECIAL;

  public set: string = 'BST';

  public name = 'Single Strike Energy';

  public fullName = 'Single Strike Energy BST';

  public text = 'This card can only be attached to a Single Strike Pokémon.' +
    'If this card is attached to anything other than a Single ' +
    'Strike Pokémon, discard this card. ' +
    '' +
    'As long as this card is attached to a Pokémon, it provides ' +
    'F and D Energy but provides only 1 Energy at a time, and the ' +
    'attacks of the Pokémon this card is attached to do 20 more ' +
    'damage to your opponent\'s Active Pokémon (before applying ' +
    'Weakness and Resistance).';

  public reduceEffect(store: StoreLike, state: State, effect: Effect): State {

    // Cannot attach to other than Single Strike Pokemon
    if (effect instanceof AttachEnergyEffect && effect.energyCard === this) {
      const pokemon = effect.target;
      if (!pokemon.getPokemonCard()?.tags.includes(CardTag.SINGLE_STRIKE)) {
        throw new GameError(GameMessage.CANNOT_PLAY_THIS_CARD);
      }
      return state;
    }
    
    // Provide energy when attached to Single Strike Pokemon
    if (effect instanceof CheckProvidedEnergyEffect && effect.source.cards.includes(this)) {
      const pokemon = effect.source;
      if (pokemon.getPokemonCard()?.tags.includes(CardTag.SINGLE_STRIKE)) {
        effect.energyMap.push({ card: this, provides: [ CardType.FIGHTING || CardType.DARK ] });
      }
      return state;
    }
    
    // Discard card when not attached to Single Strike Pokemon
    if (effect instanceof CheckTableStateEffect) {
      state.players.forEach(player => {
        player.forEachPokemon(PlayerType.BOTTOM_PLAYER, cardList => {
          if (!cardList.cards.includes(this)) {
            return;
          }
          const pokemon = cardList;
          if (!pokemon.getPokemonCard()?.tags.includes(CardTag.SINGLE_STRIKE)) {
            cardList.moveCardTo(this, player.discard);
          }
        });
      });
      return state;
    }
    
    if (effect instanceof DealDamageEffect && effect.source.cards.includes(this)) {
      const player = effect.player;
      const opponent = StateUtils.getOpponent(state, player);
      if (effect.target !== opponent.active) {
        return state;
      }
      effect.damage += 20;
    }
    
    return state;
  }
    
}
    