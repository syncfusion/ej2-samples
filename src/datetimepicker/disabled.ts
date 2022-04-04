import { loadCultureFiles } from '../common/culture-loader';
import { DateTimePicker, RenderDayCellEventArgs } from '@syncfusion/ej2-calendars';
/**
 * Disabled DateTimePicker sample
 */

(window as any).default = (): void => {
    loadCultureFiles();
    let dateTimeInstance: DateTimePicker = new DateTimePicker({
        placeholder: "Select a date and time",
        renderDayCell: disableDate
    });
    dateTimeInstance.appendTo('#datetimepicker');
    function disableDate(args: RenderDayCellEventArgs): void {
        /*Date need to be disabled*/
        if (args.date.getDay() === 0 || args.date.getDay() === 6) {
            args.isDisabled = true;
        }
    }

};