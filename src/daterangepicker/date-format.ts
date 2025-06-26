import { loadCultureFiles } from '../common/culture-loader';
import { DateRangePicker } from '@syncfusion/ej2-calendars';
import { DropDownList, ChangeEventArgs as DropDownChangeEventArgs, MultiSelectChangeEventArgs, MultiSelect, CheckBoxSelection } from '@syncfusion/ej2-dropdowns';
import { FloatLabelType } from '@syncfusion/ej2-inputs';
/**
 * DateRangePicker Format sample
 */
MultiSelect.Inject(CheckBoxSelection);
(window as any).default = (): void => {
    loadCultureFiles();
    let daterangepicker: DateRangePicker = new DateRangePicker({
        placeholder: "Select a range",
        format: "dd'/'MMM'/'yy hh:mm a",
        startDate: new Date(new Date().setDate(1)),
        endDate: new Date(new Date().setDate(20)),
        inputFormats: ['dd/MM/yyyy', 'yyyyMMdd']
    });
    daterangepicker.appendTo('#daterangepicker');

    let dropdownInstance: DropDownList = new DropDownList({
        placeholder: 'Select a format',
        value: 'format1',
        dataSource: [
            { Id: 'format1', Text: 'dd/MMM/yy hh:mm a' },
            { Id: 'format2', Text: 'yyyy-MM-dd' },
            { Id: 'format3', Text: 'dd-MMMM-yyyy' },
             { Id: 'format4', Text: 'yyyy/MM/dd HH:mm' }
        ],
        fields: { text: 'Text', value: 'Id' },
        change: (args: DropDownChangeEventArgs) => {
            daterangepicker.format = (args.itemData as any).Text;
            daterangepicker.separator = ((args.itemData as any).Text === 'yyyy/MM/dd HH:mm') ? 'to' : '-';
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
        allowFiltering:false,
        change: (args: MultiSelectChangeEventArgs ) => {
            daterangepicker.inputFormats = args.value as string[];
        }
    });
    multiSelectDatePicker.appendTo('#inputFormatsDatePicker');
};

