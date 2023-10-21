import { TrainerCard } from '../../game/store/card/trainer-card';
import { TrainerType } from '../../game/store/card/card-types';
import { StoreLike, State, StateUtils, GameError, GameMessage, CardTarget, ChoosePokemonPrompt, PlayerType, PokemonCardList, SlotType } from '../../game';
import { Effect } from '../../game/store/effects/effect';
import { HealEffect } from '../../game/store/effects/game-effects';
import { TrainerEffect } from '../../game/store/effects/play-card-effects';

function* playCard(next: Function, store: StoreLike, state: State, effect: TrainerEffect): IterableIterator<State> {
  const player = effect.player;
  const opponent = StateUtils.getOpponent(state, player);
      
  if (player.getPrizeLeft() <= opponent.getPrizeLeft()) {
    throw new GameError(GameMessage.CANNOT_PLAY_THIS_CARD);
  }
  const blocked: CardTarget[] = [];
  let hasPokemonWithDamage: boolean = false;
  player.forEachPokemon(PlayerType.BOTTOM_PLAYER, (cardList, card, target) => {
    if (cardList.damage === 0) {
      blocked.push(target);
    } else {
      hasPokemonWithDamage = true;
    }
  });
      
  if (hasPokemonWithDamage === false) {
    throw new GameError(GameMessage.CANNOT_PLAY_THIS_CARD);
  }
      
  // Do not discard the card yet
  effect.preventDefault = true;
      
  let targets: PokemonCardList[] = [];
  yield store.prompt(state, new ChoosePokemonPrompt(
    player.id,
    GameMessage.CHOOSE_POKEMON_TO_HEAL,
    PlayerType.BOTTOM_PLAYER,
    [ SlotType.ACTIVE, SlotType.BENCH ],
    { allowCancel: true, blocked }
  ), results => {
    targets = results || [];
    next();
  });
      
  if (targets.length === 0) {
    return state;
  }
      
  // Discard trainer only when user selected a Pokemon
  player.hand.moveCardTo(effect.trainerCard, player.discard);
      
  targets.forEach(target => {
    // Heal Pokemon
    const healEffect = new HealEffect(player, target, 60);
    store.reduceEffect(state, healEffect);
  });
}


export class FightingAuLait extends TrainerCard {

  public trainerType: TrainerType = TrainerType.ITEM;

  public regulationMark = 'G';

  public set: string = 'PAL';

  public set2: string = 'paldeaevolved';

  public setNumber: string = '181';

  public name: string = 'Fighting Au Lait';

  public fullName: string = 'Fighting Au Lait PAL';

  public text: string =
    'You can use this card only if you have more Prize cards remaining than your opponent.' +
    '' +
    'Heal 60 damage from 1 of your Pokémon.';

  public reduceEffect(store: StoreLike, state: State, effect: Effect): State {
    if (effect instanceof TrainerEffect && effect.trainerCard === this) {
      const generator = playCard(() => generator.next(), store, state, effect);
      return generator.next().value;
    }
    return state;
  }
    
}
