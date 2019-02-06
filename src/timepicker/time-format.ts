import { loadCultureFiles } from '../common/culture-loader';
import { TimePicker } from '@syncfusion/ej2-calendars';

/**
 * Format sample
 */

(window as any).default = (): void => {
    loadCultureFiles();

    let timeObj: TimePicker = new TimePicker({
        value: new Date(),
        step: 60,
        format: 'HH:mm'
    });
    timeObj.appendTo('#timepicker');
};