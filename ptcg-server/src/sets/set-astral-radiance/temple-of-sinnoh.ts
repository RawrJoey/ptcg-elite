import { TrainerCard } from '../../game/store/card/trainer-card';
import {  CardType, TrainerType } from '../../game/store/card/card-types';
import { GameError, GameMessage, State, StateUtils, StoreLike } from '../../game';
import { Effect } from '../../game/store/effects/effect';
import { EnergyEffect } from '../../game/store/effects/play-card-effects';

export class TempleofSinnoh extends TrainerCard {

  public regulationMark = 'F';

  public cardImage: string = 'assets/cardback.png';

  public setNumber: string = '155';
  
  public trainerType = TrainerType.STADIUM;

  public set = 'ASR';

  public name = 'Temple of Sinnoh';

  public fullName = 'Temple of Sinnoh ASR';

  public text = 'All Special Energy attached to Pokémon (both yours and your opponent\'s) provide C Energy and have no other effect.';

  public reduceEffect(store: StoreLike, state: State, effect: Effect): State {

    if (effect instanceof EnergyEffect && StateUtils.getStadiumCard(state) === this) {
      effect.preventDefault = true;
      effect.card.provides = [CardType.COLORLESS];
      console.log('Jamming Tower blocks Tool Effect');
      throw new GameError(GameMessage.CANNOT_USE_STADIUM);
    }
    return state;
  }
}
