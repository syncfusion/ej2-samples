import { loadCultureFiles } from '../common/culture-loader';
import { DateTimePicker } from '@syncfusion/ej2-calendars';
/**
 * Default DateTimePicker sample
 */

(window as any).default = (): void => {
    loadCultureFiles();
    let dateTimeInstance: DateTimePicker = new DateTimePicker();
    dateTimeInstance.appendTo('#datetimepicker');
};