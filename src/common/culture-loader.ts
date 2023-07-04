// tslint:disable
import * as numberingSystems from './cldr-data/supplemental/numberingSystems.json';
import * as currencyData from './cldr-data/supplemental/currencyData.json';
import * as deCultureData from './cldr-data/main/de/all.json';
import * as arCultureData from './cldr-data/main/ar/all.json';
import * as swissCultureDate from './cldr-data/main/fr-CH/all.json';
import * as enCultureData from './cldr-data/main/en/all.json';
import * as chinaCultureData from './cldr-data/main/zh/all.json';
import {loadCldr,L10n } from  '@syncfusion/ej2-base';
import { Locale } from './locale-string';

export function loadCultureFiles(stats?: boolean){
    loadCldr(numberingSystems, chinaCultureData, enCultureData, swissCultureDate, currencyData, deCultureData, arCultureData);
    L10n.load(Locale);
}
// tslint:enable