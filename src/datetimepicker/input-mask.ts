import { loadCultureFiles } from '../common/culture-loader';
import { DateTimePicker, MaskedDateTime } from '@syncfusion/ej2-calendars';
/**
 * Default DateTimePicker sample
 */
 DateTimePicker.Inject(MaskedDateTime);
(window as any).default = (): void => {
    loadCultureFiles();
    let dateTimeInstance: DateTimePicker = new DateTimePicker({
        placeholder: "Select a date and time",
        format: "M/d/yyyy hh:mm a",
        enableMask: true
    });
    dateTimeInstance.appendTo('#datetimepicker');
};