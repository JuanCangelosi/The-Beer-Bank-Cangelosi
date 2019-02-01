import { MashTemp, Fermentation } from '.';

export interface Method {
    mash_temp: MashTemp[];
    fermentation: Fermentation;
    twist?: any;
}
