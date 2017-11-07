import { DateRangePicker } from '@syncfusion/ej2-calendars';
/**
 * DateRangePicker Presets sample
 */
this.default = (): void => {
    let daterangepicker: DateRangePicker = new DateRangePicker({
        placeholder: 'Select a range',
        presets: [
            {
                label: 'This Week',
                start: new Date(new Date().setDate(new Date().getDate() - new Date().getDay())),
                end: new Date()
            },
            {
                label: 'This Month',
                start: new Date(new Date().setDate(1)),
                end: new Date(new Date(new Date().setMonth(new Date().getMonth() + 1)).setDate(0))
            },
            {
                label: 'Last Month',
                start: new Date(new Date(new Date().setMonth(new Date().getMonth() - 1)).setDate(1)),
                end: new Date(new Date().setDate(0))
            },
            {
                label: 'Last Year',
                start: new Date(new Date().getFullYear() - 1 , 0, 1),
                end: new Date(new Date().getFullYear() - 1 , 11, 31)
            }
        ]
    });
    daterangepicker.appendTo('#daterangepicker');
};