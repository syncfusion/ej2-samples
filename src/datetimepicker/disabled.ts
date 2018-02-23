import { DateTimePicker, RenderDayCellEventArgs } from '@syncfusion/ej2-calendars';
/**
 * Disabled DateTimePicker sample
 */

this.default = (): void => {
    let dateTimeInstance: DateTimePicker = new DateTimePicker({
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