import { extend } from '@syncfusion/ej2-base';
import { Schedule, Day, Week, WorkWeek, Month, EventRenderedArgs, Resize, DragAndDrop } from '@syncfusion/ej2-schedule';
import { fifaEventsData, applyCategoryColor } from './datasource';

Schedule.Inject(Day, Week, WorkWeek, Month, Resize, DragAndDrop);

/**
 * Schedule views sample
 */

this.default = () => {
    let data: Object[] = <Object[]>extend([], fifaEventsData, null, true);
    let scheduleObj: Schedule = new Schedule({
        width: '100%',
        height: '650px',
        selectedDate: new Date(2018, 5, 21),
        eventSettings: { dataSource: data },
        views: [
            { displayName: '3 Days', option: 'Day', interval: 3 },
            { displayName: '2 Weeks', option: 'Week', isSelected: true, interval: 2 },
            { displayName: '4 Months', option: 'Month', interval: 4 }
        ],
        eventRendered: (args: EventRenderedArgs) => applyCategoryColor(args, scheduleObj.currentView)
    });
    scheduleObj.appendTo('#Schedule');
};
