import { DateRangePicker } from '@syncfusion/ej2-calendars';
/**
 * DateRangePicker Presets sample
 */
this.default = (): void => {
    let start: Date = new Date(new Date(new Date().setDate(new Date().getDate() - (new Date().getDay() + 7) % 7)).toDateString());
    let daterangepicker: DateRangePicker = new DateRangePicker({
        presets: [
            {
                label: 'This Week',
                start: start,
                end: new Date(new Date(new Date().setDate(start.getDate() + 6)).toDateString())
            },
            {
                label: 'This Month',
                start: new Date(new Date(new Date().setDate(1)).toDateString()),
                end: new Date(new Date(new Date(new Date().setMonth(new Date().getMonth() + 1)).setDate(0)).toDateString())
            },
            {
                label: 'Last Month',
                start: new Date(new Date(new Date(new Date().setMonth(new Date().getMonth() - 1)).setDate(1)).toDateString()),
                end: new Date(new Date(new Date().setDate(0)).toDateString())
            },
            {
                label: 'Last Year',
                start: new Date(new Date(new Date().getFullYear() - 1, 0, 1).toDateString()),
                end: new Date(new Date(new Date().getFullYear() - 1, 11, 31).toDateString())
            }
        ]
    });
    daterangepicker.appendTo('#daterangepicker');
};