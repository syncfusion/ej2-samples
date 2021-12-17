import { loadCultureFiles } from '../common/culture-loader';
import { Schedule, Day, Week, WorkWeek, Month, Agenda } from '@syncfusion/ej2-schedule';
import { DataManager, WebApiAdaptor } from '@syncfusion/ej2-data';

Schedule.Inject(Day, Week, WorkWeek, Month, Agenda);

/**
 * Schedule remote data sample
 */

(window as any).default = (): void => {
    loadCultureFiles();
    let dataManager: DataManager = new DataManager({
        url: 'https://ej2services.syncfusion.com/production/web-services/api/Schedule',
        adaptor: new WebApiAdaptor,
        crossDomain: true
    });
    let scheduleObj: Schedule = new Schedule({
        width: '100%',
        height: '650px',
        currentView: 'Month',
        eventSettings: { dataSource: dataManager },
        readonly: true
    });
    scheduleObj.appendTo('#Schedule');
};
