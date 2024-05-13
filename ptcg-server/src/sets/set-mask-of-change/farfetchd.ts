import {
  ChooseCardsPrompt,
  PowerType,
  ShuffleDeckPrompt,
  State,
  StateUtils,
  StoreLike,
  TrainerCard
} from '../../game';
import { GameMessage } from '../../game/game-message';
import { CardType, Stage, SuperType, TrainerType } from '../../game/store/card/card-types';
import { PokemonCard } from '../../game/store/card/pokemon-card';
import { Effect } from '../../game/store/effects/effect';
import { PowerEffect } from '../../game/store/effects/game-effects';
import { AttachPokemonToolEffect, PlayPokemonEffect } from '../../game/store/effects/play-card-effects';


export class Farfetchd extends PokemonCard {

  public stage: Stage = Stage.BASIC;

  public regulationMark = 'H';

  public cardType: CardType = CardType.COLORLESS;

  public hp: number = 70;

  public weakness = [{ type: CardType.LIGHTNING }];

  public resistance = [{ type: CardType.FIGHTING, value: -30 }];

  public retreat = [ CardType.COLORLESS];

  public powers = [{
    name: 'Sonic Duty',
    powerType: PowerType.ABILITY,
    text: 'You may use this Ability when you put this card from your hand onto your Bench during your turn. Search your deck for a Pokémon Tool card and attach it to this Pokémon. Then, shuffle your deck.'
  }];

  public attacks = [
    {
      name: 'Mach Cut',
      cost: [ CardType.COLORLESS ],
      damage: 30,
      text: 'Discard a Special Energy from your opponent\'s Active Pokémon.'
    }
  ];

  public set: string = 'SV6';

  public cardImage: string = 'assets/cardback.png';

  public setNumber: string = '83';

  public name: string = 'Farfetch\'d';

  public fullName: string = 'Farfetch\'d SV6';

  public reduceEffect(store: StoreLike, state: State, effect: Effect): State {

    if (effect instanceof PlayPokemonEffect && effect.pokemonCard === this) {
      const player = StateUtils.findOwner(state, effect.target);

      // Try to reduce PowerEffect, to check if something is blocking our ability
      try {
        const powerEffect = new PowerEffect(player, this.powers[0], this);
        store.reduceEffect(state, powerEffect);
      } catch {
        return state;
      }

      state = store.prompt(state, new ChooseCardsPrompt(
        player.id,
        GameMessage.CHOOSE_CARD_TO_HAND,
        player.deck,
        { superType: SuperType.TRAINER, trainerType: TrainerType.TOOL },
        { min: 0, max: 1, allowCancel: false }
      ), cards => {
        
        let benchSlot = 0;
        player.bench.forEach((cardList, index) => {
          if (cardList.getPokemonCard() === this) {
            benchSlot = index;
          }
        });
        
        if (cards[0] instanceof TrainerCard) {
          state = store.reduceEffect(state, new AttachPokemonToolEffect(player, cards[0] as TrainerCard, player.bench[benchSlot]));
        }

        state = store.prompt(state, new ShuffleDeckPrompt(player.id), order => {
          player.deck.applyOrder(order);
        });

        return state;
      });
    }
    return state;
  }
}