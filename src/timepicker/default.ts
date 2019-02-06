import { loadCultureFiles } from '../common/culture-loader';
import { TimePicker } from '@syncfusion/ej2-calendars';

/**
 * Default sample
 */

(window as any).default = (): void => {
    loadCultureFiles();

    let timeObj: TimePicker = new TimePicker({
    });
    timeObj.appendTo('#timepicker');
};