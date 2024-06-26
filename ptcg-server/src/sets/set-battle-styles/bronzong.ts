import { PokemonCard } from '../../game/store/card/pokemon-card';
import { Stage, CardType, SuperType } from '../../game/store/card/card-types';
import {
  StoreLike, State, Card, PowerType, StateUtils,
  CardTarget, PlayerType, MoveEnergyPrompt, SlotType
} from '../../game';
import { GameMessage } from '../../game/game-message';
import { PowerEffect } from '../../game/store/effects/game-effects';
import { Effect } from '../../game/store/effects/effect';
import { CheckProvidedEnergyEffect } from '../../game/store/effects/check-effects';

function* useMetalTransfer(next: Function, store: StoreLike, state: State, effect: PowerEffect): IterableIterator<State> {
  const player = effect.player;

  const blockedMap: { source: CardTarget, blocked: number[] }[] = [];
  player.forEachPokemon(PlayerType.BOTTOM_PLAYER, (cardList, card, target) => {
    const checkProvidedEnergy = new CheckProvidedEnergyEffect(player, cardList);
    store.reduceEffect(state, checkProvidedEnergy);
    const blockedCards: Card[] = [];

    checkProvidedEnergy.energyMap.forEach(em => {
      if (!em.provides.includes(CardType.METAL) && !em.provides.includes(CardType.ANY)) {
        blockedCards.push(em.card);
      }
    });

    const blocked: number[] = [];
    blockedCards.forEach(bc => {
      const index = cardList.cards.indexOf(bc);
      if (index !== -1 && !blocked.includes(index)) {
        blocked.push(index);
      }
    });

    if (blocked.length !== 0) {
      blockedMap.push({ source: target, blocked });
    }
  });

  return store.prompt(state, new MoveEnergyPrompt(
    effect.player.id,
    GameMessage.MOVE_ENERGY_CARDS,
    PlayerType.BOTTOM_PLAYER,
    [SlotType.BENCH, SlotType.ACTIVE],
    { superType: SuperType.ENERGY },
    { allowCancel: true, blockedMap }
  ), transfers => {
    if (transfers === null) {
      return;
    }

    for (const transfer of transfers) {
      const source = StateUtils.getTarget(state, player, transfer.from);
      const target = StateUtils.getTarget(state, player, transfer.to);
      source.moveCardTo(transfer.card, target);
    }
  });
}


export class Bronzong extends PokemonCard {

  public stage: Stage = Stage.STAGE_1;

  public evolvesFrom = 'Bronzor';

  public regulationMark = 'E';

  public cardType: CardType = CardType.METAL;

  public hp: number = 110;

  public weakness = [{ type: CardType.FIRE }];

  public retreat = [CardType.COLORLESS, CardType.COLORLESS, CardType.COLORLESS];

  public powers = [{
    name: 'Metal Transfer',
    useWhenInPlay: true,
    powerType: PowerType.ABILITY,
    text: 'As often as you like during your turn, you may move a ' +
      'M Energy from 1 of your Pokémon to another of your ' +
      'Pokémon.'
  }];
  public attacks = [{
    name: 'Zen Headbutt',
    cost: [CardType.METAL, CardType.COLORLESS, CardType.COLORLESS],
    damage: 70,
    text: ''
  }];
  public set = 'BST';
  public cardImage: string = 'assets/cardback.png';

  public setNumber: string = '102';
  public name = 'Bronzong';
  public fullName: string = 'Bronzong BST';

  public reduceEffect(store: StoreLike, state: State, effect: Effect): State {

    if (effect instanceof PowerEffect && effect.power === this.powers[0]) {
      const generator = useMetalTransfer(() => generator.next(), store, state, effect);
      return generator.next().value;
    }

    return state;
  }

}
