import { loadCultureFiles } from '../common/culture-loader';
import { TimePicker, ChangeEventArgs } from '@syncfusion/ej2-calendars';
import { CheckBox, ChangeEventArgs as checkboxChange } from '@syncfusion/ej2-buttons';

/**
 * Time Range sample
 */

(window as any).default = (): void => {
    loadCultureFiles();
    let value: Date;
    let isStartTimeChange: Boolean = true;
    let startTime: TimePicker = new TimePicker({
        placeholder: "Select a start time",
        change: onEnableEndTime
    });
    startTime.appendTo('#start');
    let endTime: TimePicker = new TimePicker({
        placeholder: "Select a end time",
        enabled: false
    });
    endTime.appendTo('#end');

    let checkboxObject: CheckBox = new CheckBox({ label: 'Business Hours', change: changeTime });
    checkboxObject.appendTo('#dayRange');

    let endInput: HTMLInputElement = <HTMLInputElement>document.getElementById('end');
    function changeTime(args: checkboxChange): void {
        /*To determine whether we have selected business hours or not*/
        isStartTimeChange = false;
        if (args.checked) {
            /*Business hours*/
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
        }
    }
    function onEnableEndTime(args: ChangeEventArgs): void {
        /*Enables end time if start time is selected*/
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

