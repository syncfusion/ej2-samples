import { loadCultureFiles } from '../common/culture-loader';
import { TimePicker, MaskedDateTime } from '@syncfusion/ej2-calendars';

/**
 * Default sample
 */
 TimePicker.Inject(MaskedDateTime);
(window as any).default = (): void => {
    loadCultureFiles();

    let timeObj: TimePicker = new TimePicker({
        format: "h:mm a",
        enableMask: true
    });
    timeObj.appendTo('#timepicker');
};