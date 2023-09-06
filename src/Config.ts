export interface Energietraeger{
    name : string,
    factor : number
    results : Result[]
}

export enum Result {
    ForrestToTakeCO2,
    ForrestToGrowWood,
    CompareForrestSizes,
    AmountOfWood,
    AmountOfOil,
    AmountOfGas,
    AmountOfStrom,
}
export const Energietraegers : Energietraeger[] = [
    {name : "Oil", factor : 1.1, results: [Result.AmountOfOil, Result.ForrestToTakeCO2, Result.CompareForrestSizes]},
    {name : "Gas", factor : 1.1, results: [Result.AmountOfGas, Result.ForrestToTakeCO2, Result.CompareForrestSizes]},
    {name : "Wood", factor : 0.2, results: [Result.AmountOfWood, Result.ForrestToTakeCO2, Result.ForrestToGrowWood, Result.CompareForrestSizes]},
    {name : "Eletric Power", factor : 2.4, results: [Result.AmountOfStrom, Result.ForrestToTakeCO2, Result.CompareForrestSizes]},
    {name : "Solar power, etc", factor : 0, results: []}
]

