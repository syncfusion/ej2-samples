import { loadCultureFiles } from '../common/culture-loader';
import { DateRangePicker } from '@syncfusion/ej2-calendars';
/**
 * DateRangePicker Min/Max Days Sample
 */
(window as any).default = (): void => {
    loadCultureFiles();
    let daterangepicker: DateRangePicker = new DateRangePicker({minDays: 5, maxDays: 10});
    daterangepicker.appendTo('#daterangepicker');
};