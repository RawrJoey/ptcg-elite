import { PokemonCard } from '../../game/store/card/pokemon-card';
import { Stage, CardType, SpecialCondition, EnergyType, SuperType } from '../../game/store/card/card-types';
import { Attack, PowerType } from '../../game/store/card/pokemon-types';
import { StoreLike, State, CoinFlipPrompt, GameMessage, Card, ChooseCardsPrompt, EnergyCard, GameError } from '../../game';
import { AddSpecialConditionsEffect } from '../../game/store/effects/attack-effects';
import { Effect } from '../../game/store/effects/effect';
import { AttackEffect, PowerEffect } from '../../game/store/effects/game-effects';

function* useSpaceBeacon(next: Function, store: StoreLike, state: State,
  effect: PowerEffect): IterableIterator<State> {
  const player = effect.player;
  let cards: Card[] = [];
    
  if (cards.length < 1) {
    throw new GameError(GameMessage.CANNOT_PLAY_THIS_CARD);
  }
  
  let basicEnergies = 0;
  player.discard.cards.forEach(c => {
    if (c instanceof EnergyCard && c.energyType === EnergyType.BASIC) {
      basicEnergies += 1;
    }
  });
  
  if (basicEnergies === 0) {
    throw new GameError(GameMessage.CANNOT_PLAY_THIS_CARD);
  }
  
  yield store.prompt(state, new ChooseCardsPrompt(
    player.id,
    GameMessage.CHOOSE_CARD_TO_DISCARD,
    player.hand,
    { },
    { min: 1, max: 1, allowCancel: false }
  ), selected => {
    cards = selected || [];
    next();
  });
  
  // Operation canceled by the user
  if (cards.length === 0) {
    return state;
  }
  
  
  let recovered: Card[] = [];
  yield store.prompt(state, new ChooseCardsPrompt(
    player.id,
    GameMessage.CHOOSE_CARD_TO_HAND,
    player.discard,
    { superType: SuperType.ENERGY, energyType: EnergyType.BASIC },
    { min: 1, max: 2, allowCancel: false }
  ), selected => {
    recovered = selected || [];
    next();
  });
  
  // Operation canceled by the user
  if (recovered.length === 0) {
    return state;
  }
  
  player.hand.moveCardsTo(cards, player.discard);
  player.discard.moveCardsTo(recovered, player.hand);

  return state;
}

export class Starmie extends PokemonCard {

  public name = 'Starmie';
  
  public set = 'EVO';
  
  public fullName = 'Starmie EVO';
  
  public setNumber = '31';
  
  public cardType = CardType.WATER;

  public stage = Stage.STAGE_1;

  public hp = 90;

  public weakness = [{ type: CardType.GRASS }];

  public retreat = [CardType.COLORLESS];

  public powers = [{
    name: 'Space Beacon',
    powerType: PowerType.ABILITY,
    useWhenInPlay: true,
    text: 'Once during your turn (before your attack), you may discard a card from your hand. If you do, put 2 basic Energy cards from your discard pile into your hand. (You can\'t choose a card you discarded with the effect of this Ability.)'

  }];

  public attacks: Attack[] = [
    {
      name: 'Star Freeze',
      cost: [CardType.WATER, CardType.COLORLESS],
      damage: 30,
      text: 'Flip a coin. If heads, your opponent\'s Active Pokémon is now Paralyzed.'
    }
  ];
  
  public reduceEffect(store: StoreLike, state: State, effect: Effect): State {

    if (effect instanceof PowerEffect && effect.power === this.powers[0]) {
      const generator = useSpaceBeacon(() => generator.next(), store, state, effect);
      return generator.next().value;
    }


    if (effect instanceof AttackEffect && effect.attack === this.attacks[0]) {
      const player = effect.player;

      return store.prompt(state, [
        new CoinFlipPrompt(player.id, GameMessage.COIN_FLIP)
      ], result => {
        if (result === true) {
          const specialConditionEffect = new AddSpecialConditionsEffect(effect, [SpecialCondition.PARALYZED]);
          store.reduceEffect(state, specialConditionEffect);
        }
      });
    }
    return state;
  }
}