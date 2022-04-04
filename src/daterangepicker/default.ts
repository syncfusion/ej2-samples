import { loadCultureFiles } from '../common/culture-loader';
import { DateRangePicker } from '@syncfusion/ej2-calendars';
/**
 * Default DateRangePicker sample
 */
(window as any).default = (): void => {
    loadCultureFiles();
    let daterangepicker: DateRangePicker = new DateRangePicker({
        placeholder: "Select a range",
    });
    daterangepicker.appendTo('#daterangepicker');
};