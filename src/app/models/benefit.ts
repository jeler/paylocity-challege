export interface Benefit {
    baseCost: number;
    discount: number;
    // calculation: could be the same as baseCost if no deps
    totalCost: number;
}