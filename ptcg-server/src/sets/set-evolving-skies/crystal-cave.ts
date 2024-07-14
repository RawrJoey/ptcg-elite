import { GameError, GameMessage, PokemonCardList, StateUtils } from '../..';
import { PlayerType } from '../../game/store/actions/play-card-action';
import { CardType, TrainerType } from '../../game/store/card/card-types';
import { TrainerCard } from '../../game/store/card/trainer-card';
import { Effect } from '../../game/store/effects/effect';
import { HealEffect, UseStadiumEffect } from '../../game/store/effects/game-effects';
import { State } from '../../game/store/state/state';
import { StoreLike } from '../../game/store/store-like';

export class CrystalCave extends TrainerCard {

  public regulationMark = 'E';

  public cardImage: string = 'assets/cardback.png';
  
  public setNumber: string = '144';
    
  public  trainerType = TrainerType.STADIUM;
  
  public set = 'EVS';
  
  public name = 'Crystal Cave';
  
  public fullName = 'Crystal Cave EVS';
    
  public  text = 'Once during each player\'s turn, that player may heal 30 damage from each of their [M] Pokémon and [N] Pokémon.';
        
  public reduceEffect(store: StoreLike, state: State, effect: Effect): State {
    if (effect instanceof UseStadiumEffect && StateUtils.getStadiumCard(state) === this) {
      const player = effect.player;

      const targets: PokemonCardList[] = [];
      player.forEachPokemon(PlayerType.BOTTOM_PLAYER, (cardList, card, target) => {
        if ([CardType.METAL, CardType.DRAGON].includes(card.cardType) && cardList.damage > 0) {
          targets.push(cardList);
        }
      });

      if (targets.length === 0) {
        throw new GameError(GameMessage.CANNOT_USE_STADIUM);
      }

      targets.forEach(target => {
        // Heal Pokemon
        const healEffect = new HealEffect(player, target, 30);
        store.reduceEffect(state, healEffect);
      });
    }

    return state;
  }
}
