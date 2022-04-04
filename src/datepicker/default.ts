import { loadCultureFiles } from '../common/culture-loader';
import { DatePicker } from '@syncfusion/ej2-calendars';
/**
 * Default DatePicker sample
 */

(window as any).default = (): void => {
    loadCultureFiles();
    let datepicker: DatePicker = new DatePicker({
        placeholder: "Choose a date",
    });
    datepicker.appendTo('#datepicker');
};