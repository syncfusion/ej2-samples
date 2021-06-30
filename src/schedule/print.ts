import { loadCultureFiles } from '../common/culture-loader';
import { extend } from '@syncfusion/ej2-base';
import {
    Schedule, Day, Week, WorkWeek, Month, Agenda, DragAndDrop, Resize, Print, ScheduleModel
} from '@syncfusion/ej2-schedule';
import { Button } from '@syncfusion/ej2-buttons';
import { CheckBox, ChangeEventArgs } from '@syncfusion/ej2-buttons';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { DatePicker } from '@syncfusion/ej2-calendars';
import * as dataSource from './datasource.json';

/**
 * Schedule print sample
 */

(window as any).default = (): void => {
    loadCultureFiles();
    Schedule.Inject(Day, Week, WorkWeek, Month, Agenda, DragAndDrop, Resize, Print);
    let data: Object[] = <Object[]>extend([], (dataSource as any).scheduleData, null, true);
    let scheduleObj: Schedule = new Schedule({
        width: '100%',
        height: '550px',
        selectedDate: new Date(2019, 0, 10),
        eventSettings: { dataSource: data },
    });
    scheduleObj.appendTo('#Schedule');

    let checkBoxObj: CheckBox = new CheckBox({
        labelPosition: "Before",
        label: "Print with options",
        change: onChange
    });
    checkBoxObj.appendTo('#checked');

    let printHeightAndWidthData: string[] = ['auto', '100%', '500px'];

    let heightObj: DropDownList = new DropDownList({
        width: "auto",
        placeholder: "Height",
        floatLabelType: "Always",
        dataSource: printHeightAndWidthData,
        popupHeight: '200px',
        value: 'auto'
    });
    heightObj.appendTo('#heightElement');

    let widthObj: DropDownList = new DropDownList({
        width: "auto",
        placeholder: "Width",
        floatLabelType: "Always",
        dataSource: printHeightAndWidthData,
        popupHeight: '200px',
        value: 'auto'
    });
    widthObj.appendTo('#widthElement');

    let selectedDateObj: DatePicker = new DatePicker({
        width: "auto",
        placeholder: "Selected date",
        floatLabelType: "Always",
        value: new Date(2019, 0, 10)
    });
    selectedDateObj.appendTo('#selectedDateElement');

    let printButton: Button = new Button({
        iconCss: 'e-icons e-icon-schedule-print',
        cssClass: 'e-print-btn'
    });
    printButton.appendTo('#print-btn');

    function onChange(args: ChangeEventArgs): void {
        let classList: string[] = ['.e-height-row', '.e-width-row', '.e-selected-date-row'];
        for (let i: number = 0; i < classList.length; i++) {
            let element: HTMLElement = document.querySelector(classList[i]);
            if (args.checked) {
                element.classList.remove('e-hide-row');
            } else {
                element.classList.add('e-hide-row');
            }
        }
    }

    document.getElementById('print-btn').onclick = (): void => {
        if (checkBoxObj.checked) {
            let printOptions: ScheduleModel = {
                height: heightObj.value as string,
                width: widthObj.value as string,
                selectedDate: selectedDateObj.value as Date
            };
            scheduleObj.print(printOptions);
        } else {
            scheduleObj.print();
        }
    }
};