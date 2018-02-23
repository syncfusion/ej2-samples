import { DatePicker } from '@syncfusion/ej2-calendars';

/**
 * Range DatePicker sample
 */

this.default = (): void => {
    let today: Date = new Date();
    let currentYear: number = today.getFullYear();
    let currentMonth: number = today.getMonth();
    let currentDay: number = today.getDate();
    let datepicker: DatePicker = new DatePicker({
        min: new Date(currentYear, currentMonth, 7),
        max: new Date(currentYear, currentMonth, 27),
        value: new Date(currentYear, currentMonth, 14)
    });
    datepicker.appendTo('#datepicker');
};

