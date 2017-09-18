import { DatePicker } from '@syncfusion/ej2-calendars';
import { loadCldr, L10n, Internationalization } from '@syncfusion/ej2-base';
import * as numberingSystems from '../common/cldr-data/supplemental/numberingSystems.json';
import * as zhgregorian from '../common/cldr-data/main/zh/ca-gregorian.json';
import * as zhnumbers from '../common/cldr-data/main/zh/numbers.json';
import * as degregorian from '../common/cldr-data/main/de/ca-gregorian.json';
import * as denumbers from '../common/cldr-data/main/de/numbers.json';
import * as argregorian from '../common/cldr-data/main/ar/ca-gregorian.json';
import * as arnumbers from '../common/cldr-data/main/ar/numbers.json';
/**
 * Globalization DatePicker sample
 */

this.default = (): void => {
    L10n.load({
        'de': {
            'datepicker': {
                placeholder: 'Wählen Sie ein Datum'
            }
        },
        'zh': {
            'datepicker': {
                placeholder: '选择日期'
            }
        },
        'en': {
            'datepicker': {
                placeholder: 'Choose a date'
            }
        },
        'ar': {
            'datepicker': {
                placeholder: 'اختر تاريخا'
            }
        }
    });

    // loadCldr method to load the culture specific JSON file.
    loadCldr(numberingSystems, zhgregorian, zhnumbers, degregorian, denumbers, argregorian, arnumbers);

    let datepicker: DatePicker = new DatePicker({
        locale: 'de'
    });
    datepicker.appendTo('#datepicker');

    let globalize: Internationalization = new Internationalization(datepicker.locale);
    document.getElementById('culture').addEventListener('change', changeLocale);

    function changeLocale(): void {
        let culture: string = (document.getElementById('culture') as HTMLSelectElement).value;
        datepicker.locale = culture;
        datepicker.locale === 'ar' ? datepicker.enableRtl = true : datepicker.enableRtl = false;
        globalize = new Internationalization(datepicker.locale);
        datepicker.dataBind();
    }
};
