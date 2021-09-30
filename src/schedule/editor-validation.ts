import { loadCultureFiles } from '../common/culture-loader';
import { Schedule, Day, Week, WorkWeek, Month, Agenda, EventRenderedArgs, Resize, DragAndDrop } from '@syncfusion/ej2-schedule';
import * as dataSource from './datasource.json';
import { applyCategoryColor } from './helper';
import { extend } from '@syncfusion/ej2-base';

Schedule.Inject(Day, Week, WorkWeek, Month, Agenda, Resize, DragAndDrop);

/**
 *  Schedule editor validation sample
 */

(window as any).default = (): void => {
    loadCultureFiles();
    let data: Object[] = <Object[]>extend([], (dataSource as any).scheduleData, null, true);
    let scheduleObj: Schedule = new Schedule({
        width: '100%',
        height: '650px',
        selectedDate: new Date(2021, 0, 10),
        eventSettings: {
            dataSource: data,
            fields: {
                subject: { name: 'Subject', validation: { required: true } },
                location: {
                    name: 'Location', validation: {
                        required: true,
                        regex: ['^[a-zA-Z0-9- ]*$', 'Special character(s) not allowed in this field']
                    }
                },
                description: {
                    name: 'Description', validation: {
                        required: true, minLength: 5, maxLength: 500
                    }
                },
                startTime: { name: 'StartTime', validation: { required: true } },
                endTime: { name: 'EndTime', validation: { required: true } }
            }
        },
        eventRendered: (args: EventRenderedArgs) => applyCategoryColor(args, scheduleObj.currentView)
    });
    scheduleObj.appendTo('#Schedule');
};
