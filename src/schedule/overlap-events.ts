import { loadCultureFiles } from '../common/culture-loader';
import { Schedule, Day, Week, WorkWeek, Month, Agenda, Resize, DragAndDrop } from '@syncfusion/ej2-schedule';
import * as dataSource from './datasource.json';
import { extend } from '@syncfusion/ej2-base';

Schedule.Inject(Day, Week, WorkWeek, Month, Agenda, Resize, DragAndDrop);

/**
 * Schedule Overlap Events sample
 */

(window as any).default = (): void => {
    loadCultureFiles();
    let data: Object[] = <Object[]>extend([], (dataSource as any).scheduleOverlapData, null, true);
    let scheduleObj: Schedule = new Schedule({
        width: '100%',
        height: '550px',
        selectedDate: new Date(2025, 1, 12),
        eventSettings: { dataSource: data },
        allowOverlap: false,
    });
    scheduleObj.appendTo('#Schedule');
};
