import { loadCultureFiles } from '../common/culture-loader';
import { DateRangePicker } from '@syncfusion/ej2-calendars';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { FloatLabelType } from '@syncfusion/ej2-inputs';
/**
 * DateRangePicker Format sample
 */
(window as any).default = (): void => {
    loadCultureFiles();
    let formats: { [key: string]: Object; }[] = [
        { Id: '1', value: 'dd\'\/\'MMM\'\/\'yy hh:mm a', text: 'dd/MMM/yy hh:mm a' },
        { Id: '2', value: 'yyyy\'\/\'MM\'\/\'dd HH:mm', text: 'yyyy/MM/dd HH:mm' },
        { Id: '3', value: 'dd\'\/\'MMMM\'\/\'yyyy', text: 'dd/MMMM/yyyy' },
    ];

    let daterangepicker: DateRangePicker = new DateRangePicker({
        placeholder: "Select a range",
        format: 'dd\'\/\'MMM\'\/\'yy hh:mm a',
        startDate: new Date(new Date().setDate(1)),
        endDate: new Date(new Date().setDate(20))
    });
    daterangepicker.appendTo('#daterangepicker');

    let dropDownListObj: DropDownList = new DropDownList({
        placeholder: 'Formats',
        dataSource: formats,
        floatLabelType: <FloatLabelType>'Auto',
        fields: { text: 'text', value: 'value' },
        index: 0,
        change: onChange
    });
    dropDownListObj.appendTo('#dateformats');

    function onChange(): void {
        /*Apply selected format to the component*/
        daterangepicker.format = <string>dropDownListObj.value;
        daterangepicker.separator = (dropDownListObj.text === 'yyyy/MM/dd HH:mm') ? 'to' : '-';
    }
};

