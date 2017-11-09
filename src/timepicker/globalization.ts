import { TimePicker } from '@syncfusion/ej2-calendars';
import { loadCldr, L10n, Internationalization } from '@syncfusion/ej2-base';
import * as DropDown from '@syncfusion/ej2-dropdowns';
import * as numberingSystems from '../common/cldr-data/supplemental/numberingSystems.json';
import * as zhgregorian from '../common/cldr-data/main/zh/ca-gregorian.json';
import * as zhnumbers from '../common/cldr-data/main/zh/numbers.json';
import * as degregorian from '../common/cldr-data/main/de/ca-gregorian.json';
import * as denumbers from '../common/cldr-data/main/de/numbers.json';
import * as argregorian from '../common/cldr-data/main/ar/ca-gregorian.json';
import * as arnumbers from '../common/cldr-data/main/ar/numbers.json';
import * as vigregorian from '../common/cldr-data/main/vi/ca-gregorian.json';
import * as vinumbers from '../common/cldr-data/main/vi/numbers.json';
/**
 * Internationalization sample
 */

this.default = (): void => {
    /*loads the localization text*/
    L10n.load({
        'de': {
            'timepicker': { placeholder: 'Wählen Sie Zeit' }
        },
        'zh': {
            'timepicker': { placeholder: '選擇時間' }
        },
        'vi': {
            'timepicker': { placeholder: 'Chọn thời gian' }
        },
        'en': {
            'timepicker': { placeholder: 'Select Time' }
        },
        'ar': {
            'timepicker': { placeholder: 'حدد الوقت' }
        }
    });
    /* loadCldr method to load the culture specific JSON file.*/
    loadCldr(numberingSystems, zhgregorian, zhnumbers, degregorian, denumbers, argregorian, arnumbers, vigregorian, vinumbers);
    let date: Date = new Date();
    let day: number = date.getDate();
    let month: number = date.getMonth();
    let year: number = date.getFullYear();
    let timepicker: TimePicker = new TimePicker({
        value: new Date(year, month, day, 10, 0, 0),
        locale: 'de'
    });
    timepicker.appendTo('#timepicker');
    let dropObj: DropDown.DropDownList = new DropDown.DropDownList({
        width: '100%', change: cultureChange, value: 'de'
    });
    dropObj.appendTo('#culture');
    function cultureChange(): void {
        /*Apply selected locale to the component*/
        let culture: string = this.text;
        timepicker.locale = culture;
        timepicker.enableRtl = culture === 'ar' ? true : false;
    }
};
