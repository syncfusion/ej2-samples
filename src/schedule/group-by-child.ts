import { loadCultureFiles } from '../common/culture-loader';
import { Schedule, ScheduleModel, Day, Week, WorkWeek, Month, Agenda, Resize, DragAndDrop } from '@syncfusion/ej2-schedule';
import * as dataSource from './datasource.json';

/**
 * schedule resources group sample
 */
Schedule.Inject(Day, Week, WorkWeek, Month, Agenda, Resize, DragAndDrop);

(window as any).default = (): void => {
    loadCultureFiles();
    let scheduleOptions: ScheduleModel = {
        width: '100%',
        height: '650px',
        currentView: 'WorkWeek',
        selectedDate: new Date(2018, 5, 5),
        startHour: '09:00',
        endHour: '19:00',
        group: {
            byGroupID: false,
            resources: ['Projects', 'Categories']
        },
        resources: [
            {
                field: 'ProjectId', title: 'Choose Project', name: 'Projects',
                dataSource: [
                    { text: 'PROJECT 1', id: 1, color: '#cb6bb2' },
                    { text: 'PROJECT 2', id: 2, color: '#56ca85' }
                ],
                textField: 'text', idField: 'id', colorField: 'color'
            }, {
                field: 'CategoryId', title: 'Category',
                name: 'Categories', allowMultiple: true,
                dataSource: [
                    { text: 'Development', id: 1, color: '#df5286' },
                    { text: 'Testing', id: 2, color: '#7fa900' }
                ],
                textField: 'text', idField: 'id', colorField: 'color'
            }
        ],
        eventSettings: {
            dataSource: (dataSource as any).resourceTeamData,
            fields: {
                subject: { title: 'Summary', name: 'Subject' },
                description: { title: 'Comments', name: 'Description' }
            }
        }
    };
    let scheduleObj: Schedule = new Schedule(scheduleOptions, document.getElementById('Schedule'));
};