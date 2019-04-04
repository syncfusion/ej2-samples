import { loadCultureFiles } from '../common/culture-loader';
import { Schedule, MonthAgenda } from '@syncfusion/ej2-schedule';
import * as dataSource from './datasource.json';
import { extend } from '@syncfusion/ej2-base';

Schedule.Inject(MonthAgenda);

/**
 * Schedule month agenda sample
 */

(window as any).default = (): void => {
    loadCultureFiles();
    let data: Object[] = <Object[]>extend([], (dataSource as any).fifaEventsData, null, true);
    let scheduleObj: Schedule = new Schedule({
        width: '100%',
        height: '510px',
        views: ['MonthAgenda'],
        selectedDate: new Date(2018, 5, 20),
        eventSettings: { dataSource: data }
    });
    scheduleObj.appendTo('#Schedule');
};
