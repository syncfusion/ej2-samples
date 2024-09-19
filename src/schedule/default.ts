import { loadCultureFiles } from '../common/culture-loader';
import { DatePicker, ChangeEventArgs } from '@syncfusion/ej2-calendars';
import { Schedule, Day, Week, WorkWeek, Month, Agenda, Resize, DragAndDrop, DragEventArgs } from '@syncfusion/ej2-schedule';
import * as dataSource from './datasource.json';
import { extend } from '@syncfusion/ej2-base';

Schedule.Inject(Day, Week, WorkWeek, Month, Agenda, Resize, DragAndDrop);

/**
 * Schedule Default sample
 */

(window as any).default = (): void => {
    loadCultureFiles();
    let data: Object[] = <Object[]>extend([], (dataSource as any).scheduleData, null, true);
    let scheduleObj: Schedule = new Schedule({
        height: '650px',
        selectedDate: new Date(2021, 0, 10),
        eventSettings: { dataSource: data },
        dragStart: (args: DragEventArgs) => {
            args.navigation.enable = true;
        }
    });
    scheduleObj.appendTo('#Schedule');

    let currentDate: DatePicker = new DatePicker({
        value: new Date(2021, 0, 10),
        showClearButton: false,
        placeholder: "Current Date",
        floatLabelType: "Always",
        change: (args: ChangeEventArgs) => {
            scheduleObj.selectedDate = args.value;
            scheduleObj.dataBind();
        }
    });
    currentDate.appendTo('#scheduledate');
};
