import { DateRangePicker } from '@syncfusion/ej2-calendars';
import { loadCldr, L10n, Internationalization } from '@syncfusion/ej2-base';
import * as numberingSystems from '../common/cldr-data/supplemental/numberingSystems.json';
import * as detimeZoneNames from '../common/cldr-data/main/de/timeZoneNames.json';
import * as degregorian from '../common/cldr-data/main/de/ca-gregorian.json';
import * as denumbers from '../common/cldr-data/main/de/numbers.json';
import * as argregorian from '../common/cldr-data/main/ar/ca-gregorian.json';
import * as arnumbers from '../common/cldr-data/main/ar/numbers.json';
import * as artimeZoneNames from '../common/cldr-data/main/ar/timeZoneNames.json';
/**
 * Globalization DateRangePicker sample
 */

this.default = (): void => {
    /*loads the localization text*/
    L10n.load({
        'de': {
            'daterangepicker': {
                placeholder: 'Einen Bereich auswählen',
                startLabel: 'Anfangsdatum',
                endLabel: 'Enddatum',
                applyText: 'Sich bewerben',
                cancelText: 'Stornieren',
                selectedDays: 'Ausgewählte Tage',
                days: 'Tage',
                customRange: 'benutzerdefinierten Bereich'
            }
        },
        'en': {
            'daterangepicker': {
                placeholder: 'Select a range ',
                startLabel: 'Start Date',
                endLabel: 'End Date',
                applyText: 'Apply',
                cancelText: 'Cancel',
                selectedDays: 'Selected Days',
                days: 'Days',
                customRange: 'Custom Range'
            }
        },
        'ar': {
            'daterangepicker': {
                placeholder: 'حدد نطاقا',
                startLabel: 'تاريخ البدء',
                endLabel: 'تاريخ الانتهاء',
                applyText: 'تطبيق',
                cancelText: 'إلغاء',
                selectedDays: 'الأيام المحددة',
                days: 'أيام',
                customRange: 'نطاق مخصص'
            }
        }
    });

    /* loadCldr method to load the culture specific JSON file.*/
    loadCldr(numberingSystems, detimeZoneNames, degregorian, denumbers, argregorian, arnumbers, artimeZoneNames);
    let daterangepicker: DateRangePicker = new DateRangePicker({
        locale: 'de'
    });
    daterangepicker.appendTo('#daterangepicker');

    let globalize: Internationalization = new Internationalization(daterangepicker.locale);
    document.getElementById('cultures').addEventListener('change', changeLocale);

    /*Apply selected locale to the component*/
    function changeLocale(): void {
        let culture: string = (document.getElementById('cultures') as HTMLSelectElement).value;
        daterangepicker.locale = culture;
        daterangepicker.locale === 'ar' ? daterangepicker.enableRtl = true : daterangepicker.enableRtl = false;
        globalize = new Internationalization(daterangepicker.locale);
        daterangepicker.dataBind();
    }
};
