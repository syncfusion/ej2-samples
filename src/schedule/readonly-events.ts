import { extend } from '@syncfusion/ej2-base';
import { Schedule, Day, Week, WorkWeek, Month, EventClickArgs, EventRenderedArgs, PopupOpenEventArgs } from '@syncfusion/ej2-schedule';
import { readonlyEventsData } from './datasource';

Schedule.Inject(Day, Week, WorkWeek, Month);

/**
 * Schedule readonly events sample
 */

this.default = () => {
    let isReadOnly: Function = (data: { [key: string]: Object }): boolean => {
        return <boolean>data.ReadOnly || (data.EndTime < new Date());
    };
    let data: Object[] = <Object[]>extend([], readonlyEventsData, null, true);
    let scheduleObj: Schedule = new Schedule({
        width: '100%',
        height: '550px',
        eventSettings: { dataSource: data },
        views: ['Day', 'Week', 'WorkWeek', 'Month'],
        eventClick: (args: EventClickArgs) => {
            if ((args.element as HTMLElement).classList.contains('e-read-only')) {
                args.cancel = true;
            }
        },
        popupOpen: (args: PopupOpenEventArgs) => {
            if (args.type === 'Editor' && isReadOnly(args.data)) {
                args.cancel = true;
            }
        },
        eventRendered: (args: EventRenderedArgs) => {
            if (isReadOnly(args.data)) {
                args.element.setAttribute('aria-readonly', 'true');
                args.element.classList.add('e-read-only');
            }
        }
    });
    scheduleObj.appendTo('#Schedule');
};
