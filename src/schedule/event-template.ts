import { loadCultureFiles } from '../common/culture-loader';
import { Browser, Internationalization, extend } from '@syncfusion/ej2-base';
import { Schedule, Day, Week, TimelineViews, ViewsModel, Resize, DragAndDrop } from '@syncfusion/ej2-schedule';
import * as dataSource from './datasource.json';

Schedule.Inject(Day, Week, TimelineViews, Resize, DragAndDrop);

/**
 * Schedule event template sample
 */

(window as any).default = (): void => {
    loadCultureFiles();
    // custom code start
    // Used in templates to get time string
    let instance: Internationalization = new Internationalization();
    (window as TemplateFunction).getTimeString = (value: Date) => {
        return instance.formatDate(value, { skeleton: 'hm' });
    };
    interface TemplateFunction extends Window {
        getTimeString?: Function;
    }
    // custom code end
    let viewsCollection: ViewsModel[] = [
        { option: 'Week', eventTemplate: '#event-template' },
        { option: 'TimelineWeek', eventTemplate: '#timeline-event-template' }
    ];
    if (Browser.isDevice) {
        viewsCollection = [{ option: 'Day', eventTemplate: '#event-template' },
        { option: 'TimelineDay', eventTemplate: '#timeline-event-template' }];
    }
    let data: Object[] = <Object[]>extend([], (dataSource as any).webinarData, null, true);
    let scheduleObj: Schedule = new Schedule({
        width: '100%',
        height: '650px',
        startHour: '08:00',
        endHour: '18:00',
        workHours: {
            start: '08:00'
        },
        views: viewsCollection,
        selectedDate: new Date(2018, 1, 15),
        readonly: true,
        eventSettings: {
            dataSource: data
        }
    });
    scheduleObj.appendTo('#Schedule');
};
