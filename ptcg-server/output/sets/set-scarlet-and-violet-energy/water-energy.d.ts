import { CardType } from '../../game/store/card/card-types';
import { EnergyCard } from '../../game/store/card/energy-card';
export declare class WaterEnergy extends EnergyCard {
    provides: CardType[];
    set: string;
    set2: string;
    setNumber: string;
    name: string;
    fullName: string;
}
