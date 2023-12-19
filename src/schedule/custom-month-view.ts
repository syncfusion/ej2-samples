import { loadCultureFiles } from '../common/culture-loader';
import { Schedule, Month, Resize, DragAndDrop } from '@syncfusion/ej2-schedule';
import { generateObject } from './helper';

Schedule.Inject(Month, Resize, DragAndDrop);

/**
 * Schedule custom month view sample
 */

(window as any).default = (): void => {
    loadCultureFiles();
    let scheduleObj: Schedule = new Schedule({
        height: '650px',
        views: [{ option: 'Month', displayDate: new Date(2022, 0, 16), numberOfWeeks: 4, maxEventsPerRow: 3 }],
        eventSettings: { dataSource: generateObject(new Date(2021, 11, 19).getTime(), new Date(2022, 2, 12).getTime(), true) }
    });
    scheduleObj.appendTo('#Schedule');
};
