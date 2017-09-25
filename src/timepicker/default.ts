import { TimePicker } from '@syncfusion/ej2-calendars';

/**
 * Default sample
 */

this.default = (): void => {

    let timeObj: TimePicker = new TimePicker({
        placeholder: 'Select a time'
    });
    timeObj.appendTo('#timepicker');
};