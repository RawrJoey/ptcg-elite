import { PokemonCard } from '../../game/store/card/pokemon-card';
import { Stage, CardType } from '../../game/store/card/card-types';
import { Attack, Power, Weakness } from '../../game/store/card/pokemon-types';
import { State } from '../../game/store/state/state';
import { StoreLike } from '../../game';
import { Effect } from '../../game/store/effects/effect';
export declare class Machamp extends PokemonCard {
    set: string;
    fullName: string;
    name: string;
    cardImage: string;
    stage: Stage;
    evolvesFrom: string;
    setNumber: string;
    hp: number;
    cardType: CardType;
    weakness: Weakness[];
    retreat: CardType[];
    powers: Power[];
    attacks: Attack[];
    reduceEffect(store: StoreLike, state: State, effect: Effect): State;
}
