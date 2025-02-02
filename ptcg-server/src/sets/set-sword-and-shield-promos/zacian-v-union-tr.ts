import { PokemonCard } from '../../game/store/card/pokemon-card';
import { Stage, CardType, CardTag } from '../../game/store/card/card-types';
import { GameError, GameMessage, PokemonCardList, Power, PowerType, State, StoreLike } from '../../game';
import { Effect, PowerEffect } from '../../game/store/effects/game-effects';
import {ZacianVUNIONTopLeft} from './zacian-v-union-tl';
import {ZacianVUNIONBottomLeft} from './zacian-v-union-bl';
import {ZacianVUNIONBottomRight} from './zacian-v-union-br';

export class ZacianVUNIONTopRight extends PokemonCard {
  public stage: Stage = Stage.VUNION;
  public tags = [ CardTag.POKEMON_VUNION ];
  public cardType: CardType = M;
  public hp: number = 320;
  public weakness = [{ type: F }];
  public resistance = [{ type: G, value: -30 }];
  public retreat = [ C, C ];

  public powers: Power[] = [
    {
      name: 'Zacian V-UNION Assembly',
      text: 'Once per game during your turn, combine 4 different Zacian V-UNION from your discard pile and put them onto your bench.',
      useFromDiscard: true,
      exemptFromAbilityLock: true,
      powerType: PowerType.ABILITY
    }
  ];

  public attacks = [
    {
      name: 'Dance of the Crowned Sword',
      cost: [ M, M, C ],
      damage: 150,
      text: 'During your opponent\'s next turn, the Defending Pokémon\'s attacks do 150 less damage (before applying Weakness and Resistance).'
    }
  ];

  public set: string = 'SP';
  public regulationMark = 'E';
  public cardImage: string = 'assets/cardback.png';
  public setNumber: string = '164';
  public name: string = 'Zacian V-UNION';
  public fullName: string = 'Zacian V-UNION (Top Right) SP';

  public reduceEffect(store: StoreLike, state: State, effect: Effect): State {
    // assemblin the v-union
    if (effect instanceof PowerEffect && effect.power === this.powers[0]){
      const player = effect.player;
      const slots: PokemonCardList[] = player.bench.filter(b => b.cards.length === 0);

      if (player.assembledZacian){
        throw new GameError(GameMessage.CANNOT_PLAY_THIS_CARD);
      }
      if (slots.length === 0){
        throw new GameError(GameMessage.CANNOT_USE_POWER);
      }

      let topLeftPiece = false;
      let topRightPiece = false;
      let bottomLeftPiece = false;
      let bottomRightPiece = false;
      player.discard.cards.forEach(card => {
        if (card instanceof ZacianVUNIONTopLeft){ topLeftPiece = true; }
        if (card instanceof ZacianVUNIONTopRight){ topRightPiece = true; }
        if (card instanceof ZacianVUNIONBottomLeft){ bottomLeftPiece = true; }
        if (card instanceof ZacianVUNIONBottomRight){ bottomRightPiece = true; }
      });

      if (topLeftPiece && topRightPiece && bottomLeftPiece && bottomRightPiece){
        if (slots.length > 0) {
          player.discard.cards.forEach(card => { if (card instanceof ZacianVUNIONTopRight){ player.discard.moveCardTo(card, slots[0]); }});
          player.discard.cards.forEach(card => { if (card instanceof ZacianVUNIONBottomLeft){ player.discard.moveCardTo(card, slots[0]); }});
          player.discard.cards.forEach(card => { if (card instanceof ZacianVUNIONBottomRight){ player.discard.moveCardTo(card, slots[0]); }});
          // gotta make sure the actual mon ends up on top
          player.discard.cards.forEach(card => { if (card instanceof ZacianVUNIONTopLeft){ player.discard.moveCardTo(card, slots[0]); }});
          player.assembledZacian = true;
          slots[0].pokemonPlayedTurn = state.turn;
        }
      } else {
        throw new GameError(GameMessage.CANNOT_USE_POWER);
      }
    }

    return state;
  }
}
