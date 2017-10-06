import { Calendar, ChangedEventArgs } from '@syncfusion/ej2-calendars';
import { loadCldr, Internationalization } from '@syncfusion/ej2-base';
import * as numberingSystems from '../common/cldr-data/supplemental/numberingSystems.json';
import * as degregorian from '../common/cldr-data/main/de/ca-gregorian.json';
import * as denumbers from '../common/cldr-data/main/de/numbers.json';
import * as detimeZoneNames from '../common/cldr-data/main/de/timeZoneNames.json';
/**
 * Internationalization calendar sample
 */

this.default = (): void => {
    // loadCldr method to load the culture specific JSON file.
    loadCldr(numberingSystems, degregorian, denumbers, detimeZoneNames);
    let calendar: Calendar = new Calendar({
        change: valueChange, locale: 'de'
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
        if (calendar.value) {
            let dateString: string = globalize.formatDate(calendar.value);
            (<HTMLInputElement>document.getElementById('date_label')).textContent = 'Selected Value: ' + dateString;
            calendar.dataBind();
        }
    }
};
