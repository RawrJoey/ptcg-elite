import { AttachEnergyPrompt, GameError, GameMessage, PlayerType, SlotType, StateUtils } from '../../game';
import { CardTag, EnergyType, SuperType, TrainerType } from '../../game/store/card/card-types';
import { TrainerCard } from '../../game/store/card/trainer-card';
import { Effect } from '../../game/store/effects/effect';
import { TrainerEffect } from '../../game/store/effects/play-card-effects';
import { State } from '../../game/store/state/state';
import { StoreLike } from '../../game/store/store-like';

export class BeastRing extends TrainerCard {

  public trainerType: TrainerType = TrainerType.ITEM;

  public tags = [ ];

  public set: string = 'FLI';

  public cardImage: string = 'assets/cardback.png';

  public setNumber: string = '102';

  public name: string = 'Beast Ring';

  public fullName: string = 'Beast Ring FLI';
  
  public text: string =
    'You can play this card only if your opponent has exactly 3 or 4 Prize cards remaining.' + 
    '' + 
    'Search your deck for up to 2 basic Energy cards and attach them to 1 of your Ultra Beasts. Then, shuffle your deck.';

  public reduceEffect(store: StoreLike, state: State, effect: Effect): State {

    if (effect instanceof TrainerEffect && effect.trainerCard === this) {
      const player = effect.player;
      const opponent = StateUtils.getOpponent(state, player);
      
      if (opponent.getPrizeLeft() !== 3 && opponent.getPrizeLeft() !== 4) {
        throw new GameError(GameMessage.CANNOT_PLAY_THIS_CARD);
      }
      
      let ultraBeastCount = 0;
      const blocked: number[] = [];
      player.forEachPokemon(PlayerType.BOTTOM_PLAYER, (cardList, card, target) => {
        if (card.tags.includes(CardTag.ULTRA_BEAST)) {
          ultraBeastCount += 1;
        } else {
          blocked.push(target.index);
        }
      });
      
      if (ultraBeastCount === 0) {
        throw new GameError(GameMessage.CANNOT_PLAY_THIS_CARD);
      }
      
      store.prompt(state, new AttachEnergyPrompt(
        player.id,
        GameMessage.ATTACH_ENERGY_CARDS,
        player.deck,
        PlayerType.BOTTOM_PLAYER,
        [SlotType.ACTIVE],
        { superType: SuperType.ENERGY, energyType: EnergyType.BASIC },
        { min: 0, max: 2, allowCancel: false, sameTarget: true, blocked }
      ), transfers => {
        transfers = transfers || [];
        for (const transfer of transfers) {
          const target = StateUtils.getTarget(state, player, transfer.to);
          player.deck.moveCardTo(transfer.card, target);
        }

        return state;
      });
    }

    return state;
  }
}
