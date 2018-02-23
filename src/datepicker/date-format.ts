import { DatePicker } from '@syncfusion/ej2-calendars';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
/**
 * Date format DatePicker sample
 */

this.default = (): void => {
    let datepicker: DatePicker = new DatePicker({
        value: new Date(),
        format: 'dd-MMM-yy',
    });
    datepicker.appendTo('#datepicker');

    let dropdownInstance: DropDownList = new DropDownList({
        placeholder: 'Format',
        floatLabelType: 'Auto',
        change: onChange
    });
    dropdownInstance.appendTo('#dateformats');

    function onChange(): void {
        /*Apply selected format to the component*/
        datepicker.format = <string>dropdownInstance.value;
    }
};
