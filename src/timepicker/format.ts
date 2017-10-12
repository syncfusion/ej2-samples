import { TimePicker } from '@syncfusion/ej2-calendars';

/**
 * Format sample
 */

this.default = (): void => {

    let timeObj: TimePicker = new TimePicker({
        value: new Date(),
        step: 60,
        format: 'dd/MM/yyyy HH:mm'
    });
    timeObj.appendTo('#timepicker');
};