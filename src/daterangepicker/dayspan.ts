import { DateRangePicker } from '@syncfusion/ej2-calendars';
/**
 * DateRangePicker Min/Max Days Sample
 */
this.default = (): void => {
    let daterangepicker: DateRangePicker = new DateRangePicker({minDays: 5, maxDays: 10});
    daterangepicker.appendTo('#daterangepicker');
};