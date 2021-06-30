import { loadCultureFiles } from '../common/culture-loader';
import { extend } from '@syncfusion/ej2-base';
import { Schedule, TimelineViews, TimelineMonth, Resize, DragAndDrop } from '@syncfusion/ej2-schedule';
import * as dataSource from './datasource.json';

Schedule.Inject(TimelineViews, TimelineMonth, Resize, DragAndDrop);

/**
 * Schedule inline editing sample
 */

(window as any).default = (): void => {
    loadCultureFiles();
    let data: Object[] = <Object[]>extend([], (dataSource as any).zooEventsData, null, true);
    let scheduleObj: Schedule = new Schedule({
        width: '100%',
        height: '650px',
        selectedDate: new Date(2018, 3, 4),
        views: ['TimelineWeek', 'TimelineMonth'],
        currentView: 'TimelineWeek',
        allowInline: true,
        eventSettings: {
            dataSource: <Object[]>extend([], (dataSource as any).resourceData.concat((dataSource as any).timelineResourceData), null, true)
        },
        group: { resources: ['Categories'] },
        resources: [{
            field: 'TaskId', title: 'Category', name: 'Categories', allowMultiple: true,
            dataSource: [
                { text: 'Nancy', id: 1, groupId: 1, color: '#df5286' },
                { text: 'Robert', id: 3, groupId: 2, color: '#ea7a57' },
                { text: 'Michael', id: 5, groupId: 3, color: '#df5286' },
                { text: 'Steven', id: 2, groupId: 1, color: '#7fa900' },
                { text: 'Smith', id: 4, groupId: 2, color: '#5978ee' }
            ],
            textField: 'text', idField: 'id', groupIDField: 'groupId', colorField: 'color'
        }]
    });
    scheduleObj.appendTo('#Schedule');
};
