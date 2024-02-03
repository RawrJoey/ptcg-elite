import { TrainerCard } from '../../game/store/card/trainer-card';
import { CardTag, TrainerType } from '../../game/store/card/card-types';
import { StoreLike } from '../../game/store/store-like';
import { State } from '../../game/store/state/state';
import { Effect } from '../../game/store/effects/effect';
export declare class ProfessorSadasVitality extends TrainerCard {
    trainerType: TrainerType;
    tags: CardTag[];
    regulationMark: string;
    set: string;
    cardImage: string;
    setNumber: string;
    name: string;
    fullName: string;
    text: string;
    private readonly ANCIENT_SUPPORTER_MARKER;
    reduceEffect(store: StoreLike, state: State, effect: Effect): State;
}
