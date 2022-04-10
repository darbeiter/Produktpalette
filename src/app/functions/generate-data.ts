import { Item } from 'src/app/types/item';
import { ModelBrands } from '../types/model-brands';
import { colors } from '../data/colors';
import { allModelBrands } from '../data/model-brands';


/* Generiert die Produktpalette mit Random werten. */


export function generateData(ammount: number): Item[] {
    const items: Item[] = [];
    let idCounter: number = 0

    for(let i = 0; i < ammount; i++) {
        const mb = allModelBrands[randomNumber(0, allModelBrands.length - 1)];
        items.push({
            id : idCounter,
            stockAmmount: randomNumber(0, 5),
            brand : mb.brand,
            color : colors[randomNumber(0, colors.length)],
            model : mb.modelPrefix + mb.modelSuffix.toString(),
            price : randomNumber(100, 1500),
            hasFreezer: Boolean(randomNumber(0,1)),
            freezerVolume: randomNumber(10, 40),
            lowestTemperature: randomNumber(5, 20) * -1,
            hasAutomaticDefrosting: Boolean(randomNumber(0,1)),

        });
        idCounter++
        allModelBrands[allModelBrands.findIndex( (modelBrand) => modelBrand === mb)].modelSuffix++

    }
    return items;
}

function randomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1) + min)
  } 