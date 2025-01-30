import { PokemonCard } from '../../game/store/card/pokemon-card';
import { Stage, CardType, EnergyType, SuperType } from '../../game/store/card/card-types';
import {
  PowerType, StoreLike, State, StateUtils,
  GameError, GameMessage, EnergyCard, PlayerType, SlotType
} from '../../game';
import { Effect } from '../../game/store/effects/effect';
import { PowerEffect } from '../../game/store/effects/game-effects';
import { AttachEnergyPrompt } from '../../game/store/prompts/attach-energy-prompt';
import { AttachEnergyEffect } from '../../game/store/effects/play-card-effects';

export class Hydreigon extends PokemonCard {
  public stage: Stage = Stage.STAGE_2;
  public evolvesFrom = 'Zweilous';
  public cardType: CardType = D;
  public hp: number = 160;
  public weakness = [{ type: G }];
  public retreat = [C, C, C];

  public powers = [{
    name: 'Dark Squall',
    useWhenInPlay: true,
    powerType: PowerType.ABILITY,
    text: 'As often as you like during your turn, you may attach a [D] Energy card from your hand to 1 of your Pokémon.'
  }];

  public attacks = [
    {
      name: 'Pitch-Black Fangs',
      cost: [D, D, C],
      damage: 130,
      text: ''
    }
  ];

  public set: string = 'DAA';
  public regulationMark = 'D';
  public cardImage: string = 'assets/cardback.png';
  public setNumber: string = '110';
  public name: string = 'Hydreigon';
  public fullName: string = 'Hydreigon DAA';

  public reduceEffect(store: StoreLike, state: State, effect: Effect): State {

    if (effect instanceof PowerEffect && effect.power === this.powers[0]) {
      const player = effect.player;

      const hasEnergyInHand = player.hand.cards.some(c => {
        return c instanceof EnergyCard
          && c.energyType === EnergyType.BASIC
          && c.provides.includes(CardType.DARK);
      });
      if (!hasEnergyInHand) {
        throw new GameError(GameMessage.CANNOT_USE_POWER);
      }

      return store.prompt(state, new AttachEnergyPrompt(
        player.id,
        GameMessage.ATTACH_ENERGY_CARDS,
        player.hand,
        PlayerType.BOTTOM_PLAYER,
        [SlotType.BENCH, SlotType.ACTIVE],
        { superType: SuperType.ENERGY, energyType: EnergyType.BASIC, name: 'Darkness Energy' },
        { allowCancel: false }
      ), transfers => {
        transfers = transfers || [];
        for (const transfer of transfers) {
          const target = StateUtils.getTarget(state, player, transfer.to);
          const energyCard = transfer.card as EnergyCard;
          const attachEnergyEffect = new AttachEnergyEffect(player, energyCard, target);
          store.reduceEffect(state, attachEnergyEffect);
        }
      });
    }

    return state;
  }

}
