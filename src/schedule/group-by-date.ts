import { loadCultureFiles } from '../common/culture-loader';
import { Schedule, ScheduleModel, Day, Week, Month, Agenda, Resize, DragAndDrop } from '@syncfusion/ej2-schedule';
import * as dataSource from './datasource.json';

/**
 * schedule resources group sample
 */
Schedule.Inject(Day, Week, Month, Agenda, Resize, DragAndDrop);

(window as any).default = (): void => {
    loadCultureFiles();
    let scheduleOptions: ScheduleModel = {
        width: '100%',
        height: '650px',
        selectedDate: new Date(2021, 3, 6),
        group: {
            byDate: true,
            resources: ['Owners']
        },
        resources: [{
            field: 'TaskId', title: 'Assignee',
            name: 'Owners', allowMultiple: true,
            dataSource: [
                { text: 'Alice', id: 1, color: '#df5286' },
                { text: 'Smith', id: 2, color: '#7fa900' }
            ],
            textField: 'text', idField: 'id', colorField: 'color'
        }],
        views: ['Day', 'Week', 'Month', 'Agenda'],
        eventSettings: {
            dataSource: (dataSource as any).resourceData,
            fields: {
                subject: { title: 'Task', name: 'Subject' },
                location: { title: 'Project Name', name: 'Location' },
                description: { title: 'Comments', name: 'Description' }
            }
        }
    };

    let scheduleObj: Schedule = new Schedule(scheduleOptions);
    scheduleObj.appendTo(document.getElementById('Schedule'));
};
