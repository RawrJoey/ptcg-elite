import { TrainerCard } from '../../game/store/card/trainer-card';
import { TrainerType } from '../../game/store/card/card-types';
import { UseStadiumEffect } from '../../game/store/effects/game-effects';
import { StoreLike } from '../../game/store/store-like';
import { State } from '../../game/store/state/state';
export declare class ChampionsFestival extends TrainerCard {
    trainerType: TrainerType;
    set: string;
    name: string;
    fullName: string;
    text: string;
    useStadium(store: StoreLike, state: State, effect: UseStadiumEffect): State;
}
