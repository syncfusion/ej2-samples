import { loadCultureFiles } from '../common/culture-loader';
import { TimePicker, ChangeEventArgs } from '@syncfusion/ej2-calendars';
import { Schedule, Day, Week, TimelineViews, EventRenderedArgs, Resize, DragAndDrop } from '@syncfusion/ej2-schedule';
import { applyCategoryColor } from './helper';
import * as dataSource from './datasource.json';
import { extend } from '@syncfusion/ej2-base';

Schedule.Inject(Day, Week, TimelineViews, Resize, DragAndDrop);

/**
 *  Schedule scroll to particular hour sample
 */

(window as any).default = (): void => {
    loadCultureFiles();
    let data: Object[] = <Object[]>extend([], (dataSource as any).scheduleData, null, true);
    let scheduleObj: Schedule = new Schedule({
        width: '100%',
        height: '650px',
        selectedDate: new Date(2019, 0, 10),
        views: ['Day', 'Week', 'TimelineDay', 'TimelineWeek'],
        eventSettings: {
            dataSource: data
        },
        eventRendered: (args: EventRenderedArgs) => applyCategoryColor(args, scheduleObj.currentView)
    });
    scheduleObj.appendTo('#Schedule');

    let scrollToHour: TimePicker = new TimePicker({
        width: 100,
        value: new Date(2000, 0, 1, 9),
        format: 'HH:mm',
        change: (args: ChangeEventArgs) => {
            scheduleObj.scrollTo(args.text);
        }
    });
    scrollToHour.appendTo('#ScrollToHour');
};
