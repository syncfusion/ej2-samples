import { loadCultureFiles } from '../common/culture-loader';
import { Schedule, ScheduleModel, Month, TimelineMonth, Resize, DragAndDrop } from '@syncfusion/ej2-schedule';
import * as dataSource from './datasource.json';
import { extend } from '@syncfusion/ej2-base';
/**
 * schedule multiple dragging sample
 */
Schedule.Inject(Month, TimelineMonth, Resize, DragAndDrop);

(window as any).default = (): void => {
    loadCultureFiles();
    let scheduleOptions: ScheduleModel = {
        width: '100%',
        height: '650px',
        selectedDate: new Date(2018, 3, 4),
        allowMultiDrag: true,
        showQuickInfo: false,
        allowResizing: false,
        views: ['Month', 'TimelineMonth'],
        currentView: 'Month',
        group: {
            resources: ['Owners']
        },
        resources: [{
            field: 'TaskId', title: 'Owners',
            name: 'Owners',
            dataSource: [
                { text: 'Nancy', id: 1, color: '#df5286' },
                { text: 'Steven', id: 2, color: '#7fa900' },
                { text: 'Robert', id: 3, color: '#ea7a57' },
                { text: 'Smith', id: 4, color: '#5978ee' },
                { text: 'Micheal', id: 5, color: '#df5286' }
            ],
            textField: 'text', idField: 'id', colorField: 'color'
        }
        ],
        eventSettings: {
            dataSource: <Object[]>extend([], (dataSource as any).resourceData.concat((dataSource as any).timelineResourceData), null, true)
        }
    };

    let scheduleObj: Schedule = new Schedule(scheduleOptions, '#Schedule');
};