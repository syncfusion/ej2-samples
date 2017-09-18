import { DatePicker } from '@syncfusion/ej2-calendars';
/**
 * Date Format DatePicker sample
 */

this.default = (): void => {
    let datepicker: DatePicker = new DatePicker({
        format: 'dd-MMM-yy',
        value: new Date(),
        placeholder: 'Choose a date'
    });
    datepicker.appendTo('#datepicker');

    document.getElementById('dateformat').addEventListener('change', changeLocale);

    function changeLocale(): void {
        let dateFormat: string = (document.getElementById('dateformat') as HTMLSelectElement).value;
        datepicker.format = dateFormat;
        datepicker.dataBind();
    }
};
