import { PokemonCard } from '../../game/store/card/pokemon-card';
import { Stage, CardType } from '../../game/store/card/card-types';
import { Attack } from '../../game/store/card/pokemon-types';
import { Effect } from '../../game/store/effects/effect';
import { State } from '../../game/store/state/state';
import { StoreLike } from '../../game/store/store-like';
export declare class Poliwhirl extends PokemonCard {
    name: string;
    set: string;
    fullName: string;
    cardType: CardType;
    stage: Stage;
    evolvesFrom: string;
    evolvesInto: string[];
    hp: number;
    weakness: {
        type: CardType;
    }[];
    retreat: CardType[];
    forgottenAttack: Attack | null;
    attacks: Attack[];
    reduceEffect(store: StoreLike, state: State, effect: Effect): State;
}
