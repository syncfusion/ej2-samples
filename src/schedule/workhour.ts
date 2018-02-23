import { Schedule, Day, Week, WorkWeek, Month, EventRenderedArgs } from '@syncfusion/ej2-schedule';
import { extend } from '@syncfusion/ej2-base';
import { Button } from '@syncfusion/ej2-buttons';
import { TimePicker } from '@syncfusion/ej2-calendars';
import { employeeEventData, applyCategoryColor } from './datasource';

Schedule.Inject(Day, Week, WorkWeek, Month);

/**
 * Schedule Work Hour sample
 */

this.default = () => {
    let data: Object[] = <Object[]>extend([], employeeEventData, null, true);
    let scheduleObj: Schedule = new Schedule({
        width: '100%',
        height: '550px',
        workHours: {
            highlight: true,
            start: '11:00',
            end: '20:00'
        },
        views: ['Day', 'Week', 'WorkWeek', 'Month'],
        selectedDate: new Date(2018, 1, 15),
        eventSettings: { dataSource: data },
        eventRendered: (args: EventRenderedArgs) => applyCategoryColor(args, scheduleObj.currentView)
    });
    scheduleObj.appendTo('#Schedule');
    let start: TimePicker = new TimePicker({
        width: 100,
        value: new Date(2000, 0, 1, 11),
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
