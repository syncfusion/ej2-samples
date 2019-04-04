import { loadCultureFiles } from '../common/culture-loader';
import { extend } from '@syncfusion/ej2-base';
import { Schedule, TimelineViews, Resize, DragAndDrop } from '@syncfusion/ej2-schedule';
import { CheckBox, ChangeEventArgs } from '@syncfusion/ej2-buttons';
import * as dataSource from './datasource.json';

/**
 * schedule adaptive rows sample
 */
Schedule.Inject(TimelineViews, Resize, DragAndDrop);

(window as any).default = (): void => {
    loadCultureFiles();
    let scheduleObj: Schedule = new Schedule({
        width: '100%',
        height: '650px',
        selectedDate: new Date(2018, 7, 1),
        currentView: 'TimelineWeek',
        rowAutoHeight: true,
        views: ['TimelineDay', 'TimelineWeek'],
        group: {
            enableCompactView: false,
            resources: ['MeetingRoom']
        },
        resources: [{
            field: 'RoomId', title: 'Room Type',
            name: 'MeetingRoom', allowMultiple: true,
            dataSource: [
                { text: 'Room A', id: 1, color: '#98AFC7' },
                { text: 'Room B', id: 2, color: '#99c68e' },
                { text: 'Room C', id: 3, color: '#C2B280' },
                { text: 'Room D', id: 4, color: '#3090C7' },
                { text: 'Room E', id: 5, color: '#95b9' },
                { text: 'Room F', id: 6, color: '#95b9c7' },
                { text: 'Room G', id: 7, color: '#deb887' },
                { text: 'Room H', id: 8, color: '#3090C7' },
                { text: 'Room I', id: 9, color: '#98AFC7' },
                { text: 'Room J', id: 10, color: '#778899' }
            ],
            textField: 'text', idField: 'id', colorField: 'color'
        }],
        eventSettings: {
            dataSource: <Object[]>extend([], (dataSource as any).roomData, null, true),
            fields: {
                id: 'Id',
                subject: { title: 'Summary', name: 'Subject' },
                location: { title: 'Location', name: 'Location' },
                description: { title: 'Comments', name: 'Description' },
                startTime: { title: 'From', name: 'StartTime' },
                endTime: { title: 'To', name: 'EndTime' }
            }
        }
    });
    scheduleObj.appendTo('#Schedule');
    function onChange(args: ChangeEventArgs): void {
        scheduleObj.rowAutoHeight = args.checked;
    }
    new CheckBox({ label: 'Row Auto Height', checked: true, change: onChange }, '#adaptive-rows');
};