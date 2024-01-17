import { CardType } from '../../game/store/card/card-types';
import { EnergyCard } from '../../game/store/card/energy-card';
export declare class MetalEnergy extends EnergyCard {
    provides: CardType[];
    set: string;
    cardImage: string;
    setNumber: string;
    name: string;
    fullName: string;
}
