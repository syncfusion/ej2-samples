import { DateTimePicker } from '@syncfusion/ej2-calendars';
import { DropDownList} from '@syncfusion/ej2-dropdowns';
/**
 * Date format DatePicker sample
 */

this.default = (): void => {
    let datetimepicker: DateTimePicker = new DateTimePicker({
        format: 'dd-MMM-yy hh:mm a',
        value: new Date()
    });
    datetimepicker.appendTo('#datetimepicker');

    let dropdownInstance: DropDownList = new DropDownList({
        placeholder: 'Format',
        floatLabelType: 'Auto',
        change: onChange
    });
    dropdownInstance.appendTo('#dateformats');

    function onChange(): void {
        /*Apply selected format to the component*/
        datetimepicker.format = <string>dropdownInstance.value;
    }
};
