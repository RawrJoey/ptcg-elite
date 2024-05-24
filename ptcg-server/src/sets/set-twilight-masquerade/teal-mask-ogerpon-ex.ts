import { PokemonCard } from '../../game/store/card/pokemon-card';
import { Stage, CardType, CardTag, SuperType, EnergyType, SpecialCondition } from '../../game/store/card/card-types';
import { PowerType, StoreLike, State, GameError, GameMessage, StateUtils, ChooseCardsPrompt, EnergyCard, PlayerType } from '../../game';
import { Effect } from '../../game/store/effects/effect';
import { AttackEffect, PowerEffect } from '../../game/store/effects/game-effects';
import { EndTurnEffect } from '../../game/store/effects/game-phase-effects';
import { PlayPokemonEffect } from '../../game/store/effects/play-card-effects';
import { PutDamageEffect } from '../../game/store/effects/attack-effects';
import { CheckProvidedEnergyEffect } from '../../game/store/effects/check-effects';

export class TealMaskOgerponex extends PokemonCard {

  public tags = [ CardTag.POKEMON_ex ];

  public regulationMark = 'H';

  public stage: Stage = Stage.BASIC;

  public cardType: CardType = CardType.GRASS;

  public hp: number = 210;

  public weakness = [{ type: CardType.FIRE }];

  public retreat = [ CardType.COLORLESS ];

  public powers = [{
    name: 'Teal Dance',
    powerType: PowerType.ABILITY,
    useWhenInPlay: true,
    text: 'Once during your turn, you may attach a Basic [G] Energy card from your hand to this Pokémon. If you attached any Energy to a Pokémon in this way, draw a card.'
  }];

  public attacks = [
    {
      name: 'Myriad Leaf Shower',
      cost: [CardType.GRASS, CardType.GRASS, CardType.GRASS],
      damage: 30,
      text: 'This attack does 30 more damage for each Energy attached to both Active Pokémon.'
    }
  ];

  public set: string = 'TWM';

  public cardImage: string = 'assets/cardback.png';

  public setNumber: string = '25';

  public name: string = 'Teal Mask Ogerpon ex';

  public fullName: string = 'Teal Mask Ogerpon ex TWM';

  public readonly TEAL_DANCE_MARKER = 'TEAL_DANCE_MARKER';

  public reduceEffect(store: StoreLike, state: State, effect: Effect): State {

    if (effect instanceof PlayPokemonEffect && effect.pokemonCard === this) {
      const player = effect.player;
      player.marker.removeMarker(this.TEAL_DANCE_MARKER, this);
    }
    
    if (effect instanceof PowerEffect && effect.power === this.powers[0]) {
      const player = effect.player;
    
      if (player.marker.hasMarker(this.TEAL_DANCE_MARKER, this)) {
        throw new GameError(GameMessage.POWER_ALREADY_USED);
      }
    
      const hasEnergyInHand = player.hand.cards.some(c => {
        return c instanceof EnergyCard
              && c.energyType === EnergyType.BASIC
              && c.provides.includes(CardType.GRASS);
      });
      if (!hasEnergyInHand) {
        throw new GameError(GameMessage.CANNOT_USE_POWER);
      }
    
      const cardList = StateUtils.findCardList(state, this);
      if (cardList === undefined) {
        return state;
      }
          
    
      return store.prompt(state, new ChooseCardsPrompt(
        player.id,
        GameMessage.CHOOSE_CARD_TO_ATTACH,
        player.hand,
        { superType: SuperType.ENERGY, energyType: EnergyType.BASIC, name: 'Grass Energy' },
        { min: 0, max: 1, allowCancel: false }
      ), cards => {
        cards = cards || [];
        if (cards.length > 0) {
          player.marker.addMarker(this.TEAL_DANCE_MARKER, this);

          player.forEachPokemon(PlayerType.BOTTOM_PLAYER, cardList => {
            if (cardList.getPokemonCard() === this) {
              cardList.addSpecialCondition(SpecialCondition.ABILITY_USED);
            }
          });

          player.hand.moveCardsTo(cards, cardList);
          player.deck.moveTo(player.hand, 1);
        }
      });
    }
    
    if (effect instanceof EndTurnEffect) {
      effect.player.marker.removeMarker(this.TEAL_DANCE_MARKER, this);
    }

    if (effect instanceof AttackEffect && effect.attack === this.attacks[0]) {
      const player = effect.player;
      const opponent = StateUtils.getOpponent(state, player);
          
      const playerProvidedEnergy = new CheckProvidedEnergyEffect(player);
      store.reduceEffect(state, playerProvidedEnergy);
      const playerEnergyCount = playerProvidedEnergy.energyMap
        .reduce((left, p) => left + p.provides.length, 0);
          
      const opponentProvidedEnergy = new CheckProvidedEnergyEffect(opponent);
      store.reduceEffect(state, opponentProvidedEnergy);
      const opponentEnergyCount = opponentProvidedEnergy.energyMap
        .reduce((left, p) => left + p.provides.length, 0);
          
      effect.damage += (playerEnergyCount + opponentEnergyCount) * 30;
    }
    
    if (effect instanceof PutDamageEffect) {
      const player = effect.player;
      const opponent = StateUtils.getOpponent(state, player);
      
      // Target is not Active
      if (effect.target === player.active || effect.target === opponent.active) {
        return state;
      }
      
      // Try to reduce PowerEffect, to check if something is blocking our ability
      try {
        const powerEffect = new PowerEffect(player, this.powers[1], this);
        store.reduceEffect(state, powerEffect);
      } catch {
        return state;
      }
      
      // Target is this Espathra
      if (effect.target.cards.includes(this) && effect.target.getPokemonCard() === this) {
        // Try to reduce PowerEffect, to check if something is blocking our ability
        try {
          const powerEffect = new PowerEffect(player, this.powers[1], this);
          store.reduceEffect(state, powerEffect);
        } catch {
          return state;
        }
      
        effect.preventDefault = true;
      }
      return state;
    }
    return state;
  }
}
    