import { loadCultureFiles } from '../common/culture-loader';
import { CheckBox, ChangeEventArgs } from '@syncfusion/ej2-buttons';
import { Schedule, ScheduleModel, Month, TimelineViews, TimelineMonth, Resize, DragAndDrop } from '@syncfusion/ej2-schedule';
import * as dataSource from './datasource.json';

/**
 * schedule resources group sample
 */
Schedule.Inject(Month, TimelineViews, TimelineMonth, Resize, DragAndDrop);

(window as any).default = (): void => {
    loadCultureFiles();
    let calendarCollections: Object[] = [
        { CalendarText: 'My Calendar', CalendarId: 1, CalendarColor: '#c43081' },
        { CalendarText: 'Company', CalendarId: 2, CalendarColor: '#ff7f50' },
        { CalendarText: 'Birthday', CalendarId: 3, CalendarColor: '#AF27CD' },
        { CalendarText: 'Holiday', CalendarId: 4, CalendarColor: '#808000' }
    ];
    let scheduleOptions: ScheduleModel = {
        width: '100%',
        height: '650px',
        selectedDate: new Date(2018, 3, 1),
        group: {
            resources: ['Calendars']
        },
        resources: [{
            field: 'CalendarId', title: 'Calendars',
            name: 'Calendars', allowMultiple: true,
            dataSource: [calendarCollections[0]],
            textField: 'CalendarText', idField: 'CalendarId', colorField: 'CalendarColor'
        }],
        views: ['Month', 'TimelineWeek', 'TimelineMonth'],
        eventSettings: { dataSource: generateCalendarData() }
    };

    let scheduleObj: Schedule = new Schedule(scheduleOptions, document.getElementById('Schedule'));

    function onChange(args: ChangeEventArgs): void {
        let value: number = parseInt((<Element>args.event.target).getAttribute('value'), 10);
        let resourceData: Object[] = calendarCollections.filter((calendar: { [key: string]: Object }) => calendar.CalendarId === value);
        if (args.checked) {
            scheduleObj.addResource(resourceData[0], 'Calendars', value - 1);
        } else {
            scheduleObj.removeResource(value, 'Calendars');
        }
    }

    new CheckBox({ cssClass: 'personal', value: '1', label: 'My Calendar', checked: true, disabled: true, change: onChange }, '#personal');
    new CheckBox({ cssClass: 'company', value: '2', label: 'Company', checked: false, change: onChange }, '#company');
    new CheckBox({ cssClass: 'birthday', value: '3', label: 'Birthday', checked: false, change: onChange }, '#birthdays');
    new CheckBox({ cssClass: 'holiday', value: '4', label: 'Holiday', checked: false, change: onChange }, '#holidays');

    //custom code start
    function generateCalendarData(): Object[] {
        let collections: Object[] = [];
        let dataCollections: Object[][] =
            [(dataSource as any).personalData, (dataSource as any).companyData,
            (dataSource as any).birthdayData, (dataSource as any).holidayData];
        for (let data of dataCollections) {
            collections = collections.concat(data);
        }
        return collections;
    }
    //custom code end
};