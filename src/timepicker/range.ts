import { TimePicker, ChangeEventArgs } from '@syncfusion/ej2-calendars';
import { CheckBox } from '@syncfusion/ej2-buttons';

/**
 * Time Range sample
 */

this.default = (): void => {
    let value: Date;
    let isStartTimeChange: Boolean = true;
    let startTime: TimePicker = new TimePicker({
        placeholder: 'Start Time',
        change: onEnableEndTime
    });
    startTime.appendTo('#start');
    let endTime: TimePicker = new TimePicker({
        placeholder: 'End Time',
        enabled: false
    });
    endTime.appendTo('#end');

    let checkboxObject: CheckBox = new CheckBox({ label: 'Business Hours', change: changeTime });
    checkboxObject.appendTo('#dayRange');

    let endInput: HTMLInputElement = <HTMLInputElement>document.getElementById('end');

    function changeTime(): void {
        let element: HTMLInputElement = <HTMLInputElement>document.getElementById('dayRange');
        if (element.checked) {
            isStartTimeChange = false;
            startTime.value = new Date('9/6/2017 9:00');
            endTime.enabled = true;
            endTime.value = new Date('9/6/2017 18:00');
            startTime.readonly = true;
            endTime.readonly = true;
        } else {
            endTime.value = null;
            startTime.value = null;
            endInput.value = '';
            startTime.readonly = false;
            endTime.readonly = false;
            endTime.enabled = false;
            isStartTimeChange = true;
        }
    }
    function onEnableEndTime(args: ChangeEventArgs): void {
        if (isStartTimeChange) {
            endTime.enabled = true;
            endTime.value = null;
            endInput.value = '';
            value = new Date(+args.value);
            value.setMinutes(value.getMinutes() + endTime.step);
            endTime.min = value;
        } else {
            isStartTimeChange = true;
        }
    }
};

