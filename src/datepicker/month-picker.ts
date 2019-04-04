import { loadCultureFiles } from '../common/culture-loader';
import { DatePicker } from '@syncfusion/ej2-calendars';
/**
 * DatePicker Month Picker sample
 */
(window as any).default = (): void => {
    loadCultureFiles();
    let datepicker: DatePicker = new DatePicker({ start: 'Year', depth: 'Year', format: 'MMMM y' });
    datepicker.appendTo('#datepicker');
};