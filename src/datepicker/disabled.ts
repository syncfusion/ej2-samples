import { DatePicker, RenderDayCellEventArgs } from '@syncfusion/ej2-calendars';
/**
 * Disabled DatePicker sample
 */

this.default = (): void => {
    let datepicker: DatePicker = new DatePicker({
        renderDayCell: disableDate,
        placeholder: 'Choose a date'
    });
    datepicker.appendTo('#datepicker');
    function disableDate(args: RenderDayCellEventArgs): void {
        if (args.date.getDay() === 0 || args.date.getDay() === 6) {
            args.isDisabled = true;
        }
    }

};