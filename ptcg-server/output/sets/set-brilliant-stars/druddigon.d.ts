import { PokemonCard } from '../../game/store/card/pokemon-card';
import { Stage, CardType } from '../../game/store/card/card-types';
import { StoreLike, State } from '../../game';
import { Effect } from '../../game/store/effects/effect';
export declare class Druddigon extends PokemonCard {
    stage: Stage;
    cardType: CardType;
    hp: number;
    retreat: CardType[];
    attacks: {
        name: string;
        cost: CardType[];
        damage: number;
        text: string;
    }[];
    set: string;
    set2: string;
    setNumber: string;
    name: string;
    fullName: string;
    readonly REVENGE_MARKER = "REVENGE_MARKER";
    reduceEffect(store: StoreLike, state: State, effect: Effect): State;
}
