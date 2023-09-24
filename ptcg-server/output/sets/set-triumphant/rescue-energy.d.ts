import { CardType, EnergyType } from '../../game/store/card/card-types';
import { EnergyCard } from '../../game/store/card/energy-card';
import { StoreLike } from '../../game/store/store-like';
import { State } from '../../game/store/state/state';
import { Effect } from '../../game/store/effects/effect';
export declare class RescueEnergy extends EnergyCard {
    provides: CardType[];
    energyType: EnergyType;
    set: string;
    name: string;
    fullName: string;
    readonly RESCUE_ENERGY_MAREKER = "RESCUE_ENERGY_MAREKER";
    text: string;
    reduceEffect(store: StoreLike, state: State, effect: Effect): State;
}
