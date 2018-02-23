import { extend } from '@syncfusion/ej2-base';
import { Schedule, Day, Week, WorkWeek, Month, Agenda, EventRenderedArgs } from '@syncfusion/ej2-schedule';
import { leaveData } from './datasource';

Schedule.Inject(Day, Week, WorkWeek, Month, Agenda);

/**
 * Schedule normal events sample
 */

this.default = () => {
    let data: Object[] = <Object[]>extend([], leaveData, null, true);
    let scheduleObj: Schedule = new Schedule({
        width: '100%',
        height: '550px',
        selectedDate: new Date(2018, 1, 15),
        eventSettings: { dataSource: data },
        eventRendered: (args: EventRenderedArgs) => {
            let categoryColor: string;
            let start: number = new Date(args.data.StartTime as string).setHours(0, 0, 0, 0);
            let end: number = new Date(args.data.EndTime as string).setHours(0, 0, 0, 0);
            if (args.data.IsAllDay as boolean) {
                categoryColor = '#8e24aa';
            } else if (start !== end) {
                categoryColor = '#f57f17';
            } else {
                categoryColor = '#7fa900';
            }
            if (scheduleObj.currentView === 'Agenda') {
                (args.element.firstChild as HTMLElement).style.borderLeftColor = categoryColor;
            } else {
                args.element.style.backgroundColor = categoryColor;
            }
        }
    });
    scheduleObj.appendTo('#Schedule');
};
