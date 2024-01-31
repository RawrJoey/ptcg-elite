import { Effect } from '../effects/effect';
import { Marker } from '../state/card-marker';
import { State } from '../state/state';
import { StoreLike } from '../store-like';
import { Card } from './card';
import { SuperType, Stage, PokemonType, CardType, CardTag, Format } from './card-types';
import { Attack, Weakness, Resistance, Power } from './pokemon-types';
import { TrainerCard } from './trainer-card';
export declare abstract class PokemonCard extends Card {
    superType: SuperType;
    cardType: CardType;
    cardTag: CardTag[];
    pokemonType: PokemonType;
    evolvesFrom: string;
    stage: Stage;
    retreat: CardType[];
    hp: number;
    weakness: Weakness[];
    resistance: Resistance[];
    powers: Power[];
    attacks: Attack[];
    format: Format;
    marker: Marker;
    movedToActiveThisTurn: boolean;
    tools: TrainerCard[];
    reduceEffect(store: StoreLike, state: State, effect: Effect): State;
}
