import { extend } from '@syncfusion/ej2-base';
import { Schedule, Day, Week, WorkWeek, Month, ActionEventArgs, EventRenderedArgs } from '@syncfusion/ej2-schedule';
import { employeeEventData, applyCategoryColor } from './datasource';

Schedule.Inject(Day, Week, WorkWeek, Month);

/**
 * Schedule cell dimension sample
 */

this.default = () => {
    let data: Object[] = <Object[]>extend([], employeeEventData, null, true);
    let scheduleObj: Schedule = new Schedule({
        width: '100%',
        height: '550px',
        views: ['Day', 'Week', 'WorkWeek', 'Month'],
        selectedDate: new Date(2018, 1, 15),
        cssClass: 'schedule-cell-dimension',
        showTimeIndicator: false,
        eventSettings: { dataSource: data },
        eventRendered: (args: EventRenderedArgs) => applyCategoryColor(args, scheduleObj.currentView),
        created: () => {
            scheduleObj.adjustEventWrapper();
        },
        actionComplete: (args: ActionEventArgs) => {
            if (args.requestType === 'dateNavigate' || args.requestType === 'viewNavigate') {
                scheduleObj.adjustEventWrapper();
            }
        }
    });
    scheduleObj.appendTo('#Schedule');
};
