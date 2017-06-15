import { Calendar, RenderDayCellEventArgs, ChangedEventArgs } from '@syncfusion/ej2-calendars';
/**
 * Disabled calendar sample
 */

this.default = (): void => {
    let calendar: Calendar = new Calendar({
        renderDayCell: disableDate, change: valueChange
    });
    calendar.appendTo('#calendar');
    function disableDate(args: RenderDayCellEventArgs): void {
        if (args.date.getDay() === 0 || args.date.getDay() === 6) {
            args.isDisabled = true;
        }
    }
    function valueChange(args: ChangedEventArgs): void {
        (<HTMLInputElement>document.getElementById('date_label')).textContent = 'Selected Value: ' + args.value.toLocaleDateString();
    }

};