import { loadCultureFiles } from '../common/culture-loader';
import { DatePicker, RenderDayCellEventArgs } from '@syncfusion/ej2-calendars';
/**
 * Disabled DatePicker sample
 */

(window as any).default = (): void => {
    loadCultureFiles();
    let datepicker: DatePicker = new DatePicker({
        renderDayCell: disableDate
    });
    datepicker.appendTo('#datepicker');
    function disableDate(args: RenderDayCellEventArgs): void {
        /*Date need to be disabled*/
        if (args.date.getDay() === 0 || args.date.getDay() === 6) {
            args.isDisabled = true;
        }
    }

};