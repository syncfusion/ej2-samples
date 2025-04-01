import { loadCultureFiles } from '../common/culture-loader';
import { DatePicker } from '@syncfusion/ej2-calendars';
import { DropDownList, ChangeEventArgs as DropDownChangeEventArgs, MultiSelectChangeEventArgs, MultiSelect, CheckBoxSelection } from '@syncfusion/ej2-dropdowns';
/**
 * Date format DatePicker sample
 */

MultiSelect.Inject(CheckBoxSelection);

(window as any).default = (): void => {
    loadCultureFiles();
    let datepicker: DatePicker = new DatePicker({
        placeholder: "Choose a date",
        value: new Date(),
        format: 'dd-MMM-yy',
        showClearButton: true,
        inputFormats: ['dd/MM/yyyy', 'yyyyMMdd']
    });
    datepicker.appendTo('#datepicker');

    let dropdownInstance: DropDownList = new DropDownList({
        placeholder: 'Select a format',
        value: 'format1',
        dataSource: [
            { Id: 'format1', Text: 'dd-MMM-yy' },
            { Id: 'format2', Text: 'yyyy-MM-dd' },
            { Id: 'format3', Text: 'dd-MMMM-yyyy' }
        ],
        fields: { text: 'Text', value: 'Id' },
        change: (args: DropDownChangeEventArgs) => {
            datepicker.format = (args.itemData as any).Text;
        }
    });
    dropdownInstance.appendTo('#dateformats');

    let multiSelectDatePicker: MultiSelect = new MultiSelect({
        placeholder: 'e.g. MM/dd/yyyy',
        value: ['dd/MM/yyyy', 'yyyyMMdd'],
        dataSource: [
            'dd/MM/yyyy', 'ddMMMyy', 'yyyyMMdd', 'dd.MM.yy', 'MM/dd/yyyy', 'yyyy/MMM/dd', 'dd-MM-yyyy'
        ],
        mode: 'CheckBox',
        showSelectAll: true,
        change: (args: MultiSelectChangeEventArgs ) => {
            datepicker.inputFormats = args.value as string[];
        }
    });
    multiSelectDatePicker.appendTo('#inputFormatsDatePicker');
};
