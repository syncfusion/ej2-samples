import { DatePicker } from '@syncfusion/ej2-calendars';
/**
 * Default DatePicker sample
 */

this.default = (): void => {
    let datepicker: DatePicker = new DatePicker({
        placeholder: 'Choose a date'
    });
    datepicker.appendTo('#datepicker');
};