import { loadCultureFiles } from '../common/culture-loader';
import { DateTimePicker } from '@syncfusion/ej2-calendars';
/**
 * Default DateTimePicker sample
 */

(window as any).default = (): void => {
    loadCultureFiles();
    let dateTimeInstance: DateTimePicker = new DateTimePicker({
        placeholder: "Select a date and time",
    });
    dateTimeInstance.appendTo('#datetimepicker');
};