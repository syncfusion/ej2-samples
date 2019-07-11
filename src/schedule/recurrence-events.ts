import { loadCultureFiles } from '../common/culture-loader';
import { Schedule, Day, Week, Month, EventRenderedArgs, Resize, DragAndDrop } from '@syncfusion/ej2-schedule';
import * as dataSource from './datasource.json';
import { applyCategoryColor } from './helper';
import { extend } from '@syncfusion/ej2-base';
import { ChangeEventArgs, CheckBox } from '@syncfusion/ej2-buttons';

Schedule.Inject(Day, Week, Month, Resize, DragAndDrop);

/**
 * Schedule Recurrence events sample
 */

(window as any).default = (): void => {
    loadCultureFiles();
    let data: Object[] = <Object[]>extend([], (dataSource as any).recurrenceData, null, true);
    let scheduleObj: Schedule = new Schedule({
        width: '100%',
        height: '650px',
        selectedDate: new Date(2018, 1, 20),
        views: ['Day', 'Week', 'Month'],
        eventSettings: { dataSource: data },
        eventRendered: (args: EventRenderedArgs) => applyCategoryColor(args, scheduleObj.currentView)
    });
    scheduleObj.appendTo('#Schedule');
    // custom code start
    function onChange(args: ChangeEventArgs): void {
        scheduleObj.eventSettings.editFollowingEvents = args.checked;
    }
    new CheckBox({ label: 'Enable Following Events', checked: false, change: onChange }, '#editFollowingEvents');
    // custom code end
};
