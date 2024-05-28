import { CardTag, CardType, Stage } from '../../game/store/card/card-types';
import { StoreLike } from '../../game/store/store-like';
import { State } from '../../game/store/state/state';
import { Effect } from '../../game/store/effects/effect';
import { PokemonCard, PowerType } from '../../game';
export declare class Blisseyex extends PokemonCard {
    stage: Stage;
    evolvesFrom: string;
    tags: CardTag[];
    regulationMark: string;
    cardType: CardType;
    cardTypez: CardType;
    weakness: {
        type: CardType;
    }[];
    hp: number;
    retreat: CardType[];
    powers: {
        name: string;
        useWhenInPlay: boolean;
        powerType: PowerType;
        text: string;
    }[];
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
    readonly BLISSFUL_SWAP_MARKER = "BLISSFUL_SWAP_MARKER";
    reduceEffect(store: StoreLike, state: State, effect: Effect): State;
}
