export interface BeerAdvancedSearch {
    abv_gt?: number;
    abv_lt?: number;
    ibu_gt?: number;
    ibu_lt?: number;
    ebc_gt?: number;
    ebc_lt?: number;
    brewed_before?: string;
    brewed_after?: string;
}
