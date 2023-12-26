import { PokemonCard } from '../../game/store/card/pokemon-card';
import { Stage, CardType, CardTag } from '../../game/store/card/card-types';
import { StoreLike } from '../../game/store/store-like';
import { State } from '../../game/store/state/state';
import { Effect } from '../../game/store/effects/effect';
export declare class LucarioVSTAR extends PokemonCard {
    stage: Stage;
    tags: CardTag[];
    evolvesFrom: string;
    cardType: CardType;
    regulationMark: string;
    hp: number;
    weakness: {
        type: CardType;
    }[];
    retreat: CardType[];
    attacks: {
        name: string;
        cost: CardType[];
        damage: number;
        text: string;
    }[];
    set: string;
    cardImage: string;
    setNumber: string;
    name: string;
    fullName: string;
    readonly VSTAR_MARKER = "VSTAR_MARKER";
    reduceEffect(store: StoreLike, state: State, effect: Effect): State;
}
