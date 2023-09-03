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
    {name : "Erdöl", factor : 1.1, results: [Result.AmountOfOil, Result.ForrestToTakeCO2, Result.CompareForrestSizes]},
    {name : "Erdgas", factor : 1.1, results: [Result.AmountOfGas, Result.ForrestToTakeCO2, Result.CompareForrestSizes]},
    {name : "Holz", factor : 0.2, results: [Result.AmountOfWood, Result.ForrestToTakeCO2, Result.ForrestToGrowWood, Result.CompareForrestSizes]},
    {name : "Strom", factor : 2.4, results: [Result.AmountOfStrom, Result.ForrestToTakeCO2, Result.CompareForrestSizes]},
    {name : "Sonnenenergie oder ähnliches", factor : 0, results: []}
]

