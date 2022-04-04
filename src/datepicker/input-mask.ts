import { loadCultureFiles } from '../common/culture-loader';
import { DatePicker, MaskedDateTime } from '@syncfusion/ej2-calendars';
/**
 * Default DatePicker sample
 */
 DatePicker.Inject(MaskedDateTime);
(window as any).default = (): void => {
    loadCultureFiles();
    let datepicker: DatePicker = new DatePicker({
        placeholder: "Choose a date",
        format: "M/d/yyyy",
        enableMask: true
    });
    datepicker.appendTo('#datepicker');
};