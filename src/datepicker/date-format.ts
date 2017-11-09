import { DatePicker } from '@syncfusion/ej2-calendars';
/**
 * Date format DatePicker sample
 */

this.default = (): void => {
    let datepicker: DatePicker = new DatePicker({
        format: 'dd-MMM-yy',
        value: new Date(),
        placeholder: 'Choose a date'
    });
    datepicker.appendTo('#datepicker');

    document.getElementById('dateformats').addEventListener('change', changeLocale);

    function changeLocale(): void {
        /*Apply selected format to the component*/
        let dateFormat: string = (document.getElementById('dateformats') as HTMLSelectElement).value;
        datepicker.format = dateFormat;
        datepicker.dataBind();
    }
};
