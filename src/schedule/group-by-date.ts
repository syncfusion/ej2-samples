import { loadCultureFiles } from '../common/culture-loader';
import { Schedule, ScheduleModel, Day, Week, Month, Agenda, Resize, DragAndDrop } from '@syncfusion/ej2-schedule';
import * as dataSource from './datasource.json';
import { ChangeEventArgs, CheckBox } from '@syncfusion/ej2-buttons';
import { extend } from '@syncfusion/ej2-base';

/**
 * schedule resources group sample
 */
Schedule.Inject(Day, Week, Month, Agenda, Resize, DragAndDrop);

(window as any).default = (): void => {
    loadCultureFiles();
    let data: Object[] = <Object[]>extend([], (dataSource as Record<string, any>).resourceData, null, true) as Record<string, any>[];
    let scheduleOptions: ScheduleModel = {
        width: '100%',
        height: '650px',
        selectedDate: new Date(2023, 0, 6),
        group: {
            byDate: true,
            hideNonWorkingDays: true,
            resources: ['Owners']
        },
        resources: [{
            field: 'TaskId', title: 'Assignee',
            name: 'Owners', allowMultiple: true,
            dataSource: [
                { text: 'Alice', id: 1, color: '#df5286', workDays: [1, 2, 3, 4] },
                { text: 'Smith', id: 2, color: '#7fa900', workDays: [2, 3, 5] }
            ],
            textField: 'text', idField: 'id', colorField: 'color', workDaysField: 'workDays'
        }],
        views: ['Day', 'Week', 'Month', 'Agenda'],
        eventSettings: {
            dataSource: data,
            fields: {
                subject: { title: 'Task', name: 'Subject' },
                location: { title: 'Project Name', name: 'Location' },
                description: { title: 'Comments', name: 'Description' }
            }
        }
    };

    let scheduleObj: Schedule = new Schedule(scheduleOptions);
    scheduleObj.appendTo(document.getElementById('Schedule'));

    let checkboxObj: CheckBox = new CheckBox({ label: 'Hide non working days', checked: true, change: onChange });
    checkboxObj.appendTo('#checkbox');

    function onChange(args: ChangeEventArgs): void {
        if (args.checked) {
            scheduleObj.group.hideNonWorkingDays = true;
        } else {
            scheduleObj.group.hideNonWorkingDays = false;
        }
    }
};