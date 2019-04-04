import { loadCultureFiles } from '../common/culture-loader';
import {
    Schedule, Day, Week, WorkWeek, Month, TimelineViews, TimelineMonth,
    EventRenderedArgs, Resize, DragAndDrop
} from '@syncfusion/ej2-schedule';
import { Button } from '@syncfusion/ej2-buttons';
import { TimePicker } from '@syncfusion/ej2-calendars';
import { applyCategoryColor } from './helper';
import * as dataSource from './datasource.json';
import { extend } from '@syncfusion/ej2-base';

Schedule.Inject(Day, Week, WorkWeek, Month, TimelineViews, TimelineMonth, Resize, DragAndDrop);

/**
 * Schedule Work Hour sample
 */

(window as any).default = (): void => {
    loadCultureFiles();
    let data: Object[] = <Object[]>extend([], (dataSource as any).employeeEventData, null, true);
    let scheduleObj: Schedule = new Schedule({
        width: '100%',
        height: '650px',
        workHours: {
            highlight: true,
            start: '08:00',
            end: '20:00'
        },
        views: ['Day', 'Week', 'WorkWeek', 'Month', 'TimelineWeek', 'TimelineMonth'],
        selectedDate: new Date(2018, 1, 15),
        eventSettings: { dataSource: data },
        eventRendered: (args: EventRenderedArgs) => applyCategoryColor(args, scheduleObj.currentView)
    });
    scheduleObj.appendTo('#Schedule');
    let start: TimePicker = new TimePicker({
        width: 100,
        value: new Date(2000, 0, 1, 8),
        format: 'HH:mm'
    });
    start.appendTo('#startTime');
    let end: TimePicker = new TimePicker({
        width: 100,
        value: new Date(2000, 0, 1, 20),
        format: 'HH:mm'
    });
    end.appendTo('#endTime');
    let button: Button = new Button();
    button.appendTo('#submit');
    document.getElementById('submit').onclick = () => {
        let start: HTMLInputElement = document.getElementById('startTime') as HTMLInputElement;
        let end: HTMLInputElement = document.getElementById('endTime') as HTMLInputElement;
        scheduleObj.workHours.start = start.value;
        scheduleObj.workHours.end = end.value;
    };
};
