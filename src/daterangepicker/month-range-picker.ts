import { loadCultureFiles } from '../common/culture-loader';
import { DateRangePicker } from '@syncfusion/ej2-calendars';
/**
 * DateRangePicker Month Picker sample
 */
(window as any).default = (): void => {
    loadCultureFiles();
    let daterangepicker: DateRangePicker = new DateRangePicker({ start: 'Year', depth: 'Year', format: 'MMM yyyy' });
    daterangepicker.appendTo('#daterangepicker');
};