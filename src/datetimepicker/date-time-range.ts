import { loadCultureFiles } from '../common/culture-loader';
import { DateTimePicker } from '@syncfusion/ej2-calendars';

/**
 * Range DateTimePicker sample
 */

(window as any).default = (): void => {
    loadCultureFiles();
    let today: Date = new Date();
    let currentYear: number = today.getFullYear();
    let currentMonth: number = today.getMonth();
    let currentDay: number = today.getDate();
    let dateTimeInstance1: DateTimePicker = new DateTimePicker({
        placeholder: "Select a date and time",
        min: new Date(currentYear, currentMonth, 7, 10, 0, 0),
        max: new Date(currentYear, currentMonth, 27, 22, 30, 0),
        value: new Date(currentYear, currentMonth, 14, 12, 0, 0)
    });
    dateTimeInstance1.appendTo('#datetimepicker1');

    let dateTimeInstance2: DateTimePicker = new DateTimePicker({
        placeholder: "Select a date and time",
        minTime: new Date(currentYear, currentMonth, 7, 10),
        maxTime: new Date(currentYear, currentMonth, 27, 20, 30),
        value: new Date(currentYear, currentMonth, 14, 12, 0, 0)
    });
    dateTimeInstance2.appendTo('#datetimepicker2');
};

