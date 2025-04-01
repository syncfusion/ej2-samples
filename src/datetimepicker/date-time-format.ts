import { loadCultureFiles } from '../common/culture-loader';
import { DateTimePicker } from '@syncfusion/ej2-calendars';
import { DropDownList, MultiSelect, ChangeEventArgs as DropDownListChangeEventArgs, MultiSelectChangeEventArgs, CheckBoxSelection } from '@syncfusion/ej2-dropdowns';

/**
 * Date format DatePicker sample
 */
MultiSelect.Inject(CheckBoxSelection);

(window as any).default = (): void => {
    loadCultureFiles();
    let datetimepicker: DateTimePicker = new DateTimePicker({
        placeholder: "Select a date and time",
        format: 'dd-MMM-yy hh:mm a',
        value: new Date()
    });
    datetimepicker.appendTo('#datetimepicker');

    let dropdownListDateTimePicker: DropDownList = new DropDownList({
        placeholder: 'Select a format',
        value: 'format1',
        dataSource: [
            { Id: 'format1', Text: 'dd-MMM-yy hh:mm a' },
            { Id: 'format2', Text: 'yyyy-MM-dd HH:mm' }
        ],
        fields: { text: 'Text', value: 'Id' },
        change: (args: DropDownListChangeEventArgs) => {
            datetimepicker.format = (args.itemData as any).Text;
        }
    });
    dropdownListDateTimePicker.appendTo('#displayFormatDateTimePicker');

    let multiSelectDateTimePicker: MultiSelect = new MultiSelect({
        placeholder: 'e.g. MM/dd/yyyy hh:mm a',
        value: ['MM.dd.yyyy hh:mm a', 'yyyy-MM-dd HH:mm'],
        dataSource: [
            'MM.dd.yyyy hh:mm a', 'yyyy-MM-dd HH:mm', 'dd MMM yyyy HH:mm', 'MMM/dd/yyyy hh:mm tt',
            'yyyy/MM/dd hh:mm tt', 'dd-MM-yyyy HH:mm', 'MM/dd/yyyy hh:mm tt', 'yyyy.MM.dd HH:mm'
        ],
        mode: 'CheckBox',
        showSelectAll: true,
        change: (args: MultiSelectChangeEventArgs) => {
            datetimepicker.inputFormats = args.value as string[];
        }
    });
    multiSelectDateTimePicker.appendTo('#inputFormatsDateTimePicker');
};
