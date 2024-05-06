import { PokemonCard } from '../../game/store/card/pokemon-card';
import { Stage, CardType } from '../../game/store/card/card-types';
import { Attack } from '../../game/store/card/pokemon-types';
export declare class Diglett extends PokemonCard {
    name: string;
    set: string;
    setNumber: string;
    fullName: string;
    cardType: CardType;
    stage: Stage;
    evolvesInto: string[];
    hp: number;
    weakness: {
        type: CardType;
    }[];
    resistance: {
        type: CardType;
        value: number;
    }[];
    retreat: never[];
    attacks: Attack[];
}
