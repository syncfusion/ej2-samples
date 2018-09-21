import { Schedule, ScheduleModel, TimelineViews, TimelineMonth, Agenda, Resize, DragAndDrop } from '@syncfusion/ej2-schedule';
import { resourceData, timelineResourceData } from './datasource';
import { extend } from '@syncfusion/ej2-base';
/**
 * schedule resources group sample
 */
Schedule.Inject(TimelineViews, TimelineMonth, Agenda, Resize, DragAndDrop);

this.default = () => {
    let scheduleOptions: ScheduleModel = {
        width: '100%',
        height: '650px',
        selectedDate: new Date(2018, 3, 4),
        views: ['TimelineDay', 'TimelineWeek', 'TimelineWorkWeek', 'TimelineMonth', 'Agenda'],
        currentView: 'TimelineWeek',
        group: {
            byGroupID: false,
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
                    { text: 'Development', id: 1, color: '#df5286' },
                    { text: 'Testing', id: 2, color: '#7fa900' }
                ],
                textField: 'text', idField: 'id', colorField: 'color'
            }
        ],
        eventSettings: {
            dataSource: <Object[]>extend([], resourceData.concat(timelineResourceData), null, true)
        }
    };

    let scheduleObj: Schedule = new Schedule(scheduleOptions, '#Schedule');
};