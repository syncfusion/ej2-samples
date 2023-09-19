import { loadCultureFiles } from '../common/culture-loader';
import { DateTimePicker } from '@syncfusion/ej2-calendars';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import {
    Schedule, Day, Week, WorkWeek, Month, PopupOpenEventArgs, ActionEventArgs, EventRenderedArgs, Resize, DragAndDrop
} from '@syncfusion/ej2-schedule';
import * as dataSource from './datasource.json';
import { extend } from '@syncfusion/ej2-base';

Schedule.Inject(Day, Week, WorkWeek, Month, Resize, DragAndDrop);

/**
 * Schedule editor template sample
 */

(window as any).default = (): void => {
    loadCultureFiles();
    let data: Object[] = <Object[]>extend([], (dataSource as any).doctorsEventData, null, true);
    let scheduleObj: Schedule = new Schedule({
        width: '100%',
        height: '650px',
        views: ['Day', 'Week', 'WorkWeek', 'Month'],
        showQuickInfo: false,
        selectedDate: new Date(2021, 1, 15),
        eventSettings: { dataSource: data },
        editorHeaderTemplate: '#EventEditorHeaderTemplate',
        editorTemplate: '#EventEditorTemplate',
        popupOpen: (args: PopupOpenEventArgs) => {
            if (args.type === 'Editor') {
                let statusElement: HTMLInputElement = args.element.querySelector('#EventType') as HTMLInputElement;
                if (!statusElement.classList.contains('e-dropdownlist')) {
                    let dropDownListObject: DropDownList = new DropDownList({
                        placeholder: 'Choose status', value: statusElement.value,
                        dataSource: ['New', 'Requested', 'Confirmed']
                    });
                    dropDownListObject.appendTo(statusElement);
                    statusElement.setAttribute('name', 'EventType');
                }
                let startElement: HTMLInputElement = args.element.querySelector('#StartTime') as HTMLInputElement;
                if (!startElement.classList.contains('e-datetimepicker')) {
                    new DateTimePicker({ value: new Date(startElement.value) || new Date() }, startElement);
                }
                let endElement: HTMLInputElement = args.element.querySelector('#EndTime') as HTMLInputElement;
                if (!endElement.classList.contains('e-datetimepicker')) {
                    new DateTimePicker({ value: new Date(endElement.value) || new Date() }, endElement);
                }
            }
        },
        eventRendered: (args: EventRenderedArgs) => {
            switch (args.data.EventType) {
                case 'Requested':
                    (args.element as HTMLElement).style.backgroundColor = '#F57F17';
                    break;
                case 'Confirmed':
                    (args.element as HTMLElement).style.backgroundColor = '#7fa900';
                    break;
                case 'New':
                    (args.element as HTMLElement).style.backgroundColor = '#8e24aa';
                    break;
            }
        },
        actionBegin: (args: ActionEventArgs) => {
            if (args.requestType === 'eventCreate' || args.requestType === 'eventChange') {
                let data: Record<string, any> = args.data instanceof Array ? args.data[0] : args.data;
                args.cancel = !scheduleObj.isSlotAvailable(data.StartTime as Date, data.EndTime as Date);
            }
        }
    });
    scheduleObj.appendTo('#Schedule');
};
