import { DateRangePicker } from '@syncfusion/ej2-calendars';
/**
 * Default DateRangePicker sample
 */
this.default = (): void => {
    let daterangepicker: DateRangePicker = new DateRangePicker({placeholder: 'Select a range'});
    daterangepicker.appendTo('#daterangepicker');
};