import { Calendar, ChangedEventArgs } from '@syncfusion/ej2-calendars';
import { loadCldr, Internationalization } from '@syncfusion/ej2-base';
/**
 * Internationalization calendar sample
 */

this.default = (): void => {
    loadCldr(
        require('../common/cldr-data/supplemental/numberingSystems.json'),
        require('../common/cldr-data/main/zh/ca-gregorian.json'),
        require('../common/cldr-data/main/zh/timeZoneNames.json'),
        require('../common/cldr-data/main/zh/numbers.json'),
        require('../common/cldr-data/main/zh/currencies.json'),
        require('../common/cldr-data/main/de/ca-gregorian.json'),
        require('../common/cldr-data/main/de/timeZoneNames.json'),
        require('../common/cldr-data/main/de/numbers.json'),
        require('../common/cldr-data/main/de/currencies.json')
    );
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
