import { loadCultureFiles } from '../common/culture-loader';
import {
    Schedule, Day, Week, WorkWeek, Month, Resize, DragAndDrop
} from '@syncfusion/ej2-schedule';
import { getReadOnlyEventsData } from './helper';

Schedule.Inject(Day, Week, WorkWeek, Month, Resize, DragAndDrop);

/**
 * Schedule readonly events sample
 */

(window as any).default = (): void => {
    loadCultureFiles();
    let data: Object[] = getReadOnlyEventsData();
    let scheduleObj: Schedule = new Schedule({
        width: '100%',
        height: '650px',
        eventSettings: { dataSource: data },
        views: ['Day', 'Week', 'WorkWeek', 'Month']
    });
    scheduleObj.appendTo('#Schedule');
};
