import { Calendar, ChangedEventArgs } from '@syncfusion/ej2-calendars';
import { loadCldr, Internationalization } from '@syncfusion/ej2-base';
import * as numberingSystems from '../common/cldr-data/supplemental/numberingSystems.json';
import * as zhgregorian from '../common/cldr-data/main/zh/ca-gregorian.json';
import * as zhnumbers from '../common/cldr-data/main/zh/numbers.json';
import * as degregorian from '../common/cldr-data/main/de/ca-gregorian.json';
import * as denumbers from '../common/cldr-data/main/de/numbers.json';
import * as vigregorian from '../common/cldr-data/main/vi/ca-gregorian.json';
import * as vinumbers from '../common/cldr-data/main/vi/numbers.json';
/**
 * Internationalization calendar sample
 */

this.default = (): void => {
    // loadCldr method to load the culture specific JSON file.
    loadCldr(numberingSystems, zhgregorian, zhnumbers, degregorian, denumbers, vigregorian, vinumbers);
    let calendar: Calendar = new Calendar({
        change: valueChange, locale: 'de', value: new Date()
    });
    calendar.appendTo('#calendar');
    calendar.locale = 'de';
    let globalize: Internationalization = new Internationalization(calendar.locale);
    function valueChange(args: ChangedEventArgs): void {
        (<HTMLInputElement>document.getElementById('date_label')).textContent = 'Selected Value: ' + globalize.formatDate(args.value);
    }
    document.getElementById('cultures').addEventListener('change', changeLocale);

    function changeLocale(): void {
        let culture: string = (document.getElementById('cultures') as HTMLSelectElement).value;
        calendar.locale = culture;
        globalize = new Internationalization(calendar.locale);
        (<HTMLInputElement>document.getElementById('date_label')).textContent = 'Selected Value: ' + globalize.formatDate(calendar.value);
        calendar.dataBind();
    }
};