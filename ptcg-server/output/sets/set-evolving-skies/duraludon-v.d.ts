import { PokemonCard } from '../../game/store/card/pokemon-card';
import { Stage, CardType, CardTag } from '../../game/store/card/card-types';
import { StoreLike } from '../../game/store/store-like';
import { State } from '../../game/store/state/state';
import { Effect } from '../../game/store/effects/effect';
export declare class DuraludonV extends PokemonCard {
    stage: Stage;
    regulationMark: string;
    tags: CardTag[];
    cardType: CardType;
    hp: number;
    weakness: never[];
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
    readonly BREAKING_SWIPE_MARKER = "BREAKING_SWIPE_MARKER";
    reduceEffect(store: StoreLike, state: State, effect: Effect): State;
}
