import { loadCultureFiles } from '../common/culture-loader';
import { Schedule, ScheduleModel, TimelineViews, TimelineMonth, Agenda, Resize, DragAndDrop } from '@syncfusion/ej2-schedule';
import * as dataSource from './datasource.json';
import { extend } from '@syncfusion/ej2-base';
/**
 * schedule resources group sample
 */
Schedule.Inject(TimelineViews, TimelineMonth, Agenda, Resize, DragAndDrop);

(window as any).default = (): void => {
    loadCultureFiles();
    let scheduleOptions: ScheduleModel = {
        width: '100%',
        height: '650px',
        selectedDate: new Date(2018, 3, 4),
        views: ['TimelineDay', 'TimelineWeek', 'TimelineWorkWeek', 'TimelineMonth', 'Agenda'],
        currentView: 'TimelineWeek',
        group: {
            resources: ['Projects', 'Categories']
        },
        resources: [
            {
                field: 'ProjectId', title: 'Choose Project', name: 'Projects',
                dataSource: [
                    { text: 'PROJECT 1', id: 1, color: '#cb6bb2' },
                    { text: 'PROJECT 2', id: 2, color: '#56ca85' },
                    { text: 'PROJECT 3', id: 3, color: '#df5286' }
                ],
                textField: 'text', idField: 'id', colorField: 'color'
            }, {
                field: 'TaskId', title: 'Category',
                name: 'Categories', allowMultiple: true,
                dataSource: [
                    { text: 'Nancy', id: 1, groupId: 1, color: '#df5286' },
                    { text: 'Steven', id: 2, groupId: 1, color: '#7fa900' },
                    { text: 'Robert', id: 3, groupId: 2, color: '#ea7a57' },
                    { text: 'Smith', id: 4, groupId: 2, color: '#5978ee' },
                    { text: 'Micheal', id: 5, groupId: 3, color: '#df5286' },
                    { text: 'Root', id: 6, groupId: 3, color: '#00bdae' }
                ],
                textField: 'text', idField: 'id', groupIDField: 'groupId', colorField: 'color'
            }
        ],
        eventSettings: {
            dataSource: <Object[]>extend([], (dataSource as any).resourceData.concat((dataSource as any).timelineResourceData), null, true)
        }
    };

    let scheduleObj: Schedule = new Schedule(scheduleOptions, '#Schedule');
};