import { Effect } from '../../game/store/effects/effect';
import { TrainerCard } from '../../game/store/card/trainer-card';
import { TrainerType } from '../../game/store/card/card-types';
import { StoreLike } from '../../game/store/store-like';
import { State } from '../../game/store/state/state';
export declare class KarensConviction extends TrainerCard {
    trainerType: TrainerType;
    set: string;
    set2: string;
    setNumber: string;
    regulationMark: string;
    name: string;
    fullName: string;
    text: string;
    private readonly KARENS_CONVICTION_MARKER;
    reduceEffect(store: StoreLike, state: State, effect: Effect): State;
}
