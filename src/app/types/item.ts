/* Interface für die Produktpalette */

export interface Item {
    id : number,
    stockAmmount: number,
    brand : string,
    color : string,
    model : string,
    price : number,
    hasFreezer: boolean,
    freezerVolume?: number,
    lowestTemperature: number,
    hasAutomaticDefrosting: boolean
}