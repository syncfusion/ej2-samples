import { extend } from '@syncfusion/ej2-base';
import { Schedule, MonthAgenda } from '@syncfusion/ej2-schedule';
import { fifaEventsData } from './datasource';

Schedule.Inject(MonthAgenda);

/**
 * Schedule month agenda sample
 */

this.default = () => {
    let data: Object[] = <Object[]>extend([], fifaEventsData, null, true);
    let scheduleObj: Schedule = new Schedule({
        width: '100%',
        height: '550px',
        views: ['MonthAgenda'],
        selectedDate: new Date(2018, 5, 20),
        eventSettings: { dataSource: data }
    });
    scheduleObj.appendTo('#Schedule');
};
