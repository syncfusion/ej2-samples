import { loadCultureFiles } from '../common/culture-loader';
import { Schedule, Day, Week, WorkWeek, Month, EventRenderedArgs, Resize, DragAndDrop } from '@syncfusion/ej2-schedule';
import * as dataSource from './datasource.json';
import { applyCategoryColor } from './helper';
import { extend } from '@syncfusion/ej2-base';

Schedule.Inject(Day, Week, WorkWeek, Month, Resize, DragAndDrop);

/**
 * Schedule views sample
 */

(window as any).default = (): void => {
    loadCultureFiles();
    let data: Object[] = <Object[]>extend([], (dataSource as any).fifaEventsData, null, true);
    let scheduleObj: Schedule = new Schedule({
        width: '100%',
        height: '650px',
        selectedDate: new Date(2021, 5, 16),
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
