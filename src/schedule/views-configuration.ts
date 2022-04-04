import { loadCultureFiles } from '../common/culture-loader';
import { Internationalization, extend } from '@syncfusion/ej2-base';
import { Schedule, Day, Week, Month, Agenda, Resize, DragAndDrop } from '@syncfusion/ej2-schedule';
import { applyCategoryColor } from './helper';
import * as dataSource from './datasource.json';

Schedule.Inject(Day, Week, Month, Agenda, Resize, DragAndDrop);

/**
 *  Schedule view based configuration sample
 */

(window as any).default = (): void => {
    loadCultureFiles();
    let data: Object[] = <Object[]>extend([], (dataSource as Record<string, any>).fifaEventsData, null, true);
    // custom code start
    let instance: Internationalization = new Internationalization();
    (window as TemplateFunction).getTimeString = (value: Date) => {
        return instance.formatDate(value, { skeleton: 'Hm' });
    };
    interface TemplateFunction extends Window {
        getTimeString?: Function;
    }
    // custom code end
    let agendaTemplate: string = '<div><div class="subject">${Subject}</div> ${if(Description !== null && Description !== undefined)}' +
        '<div class="group" > ${ Description } </div>${/if}<div class="location">${getTimeString(data.StartTime)} ${if(City !== null &&' +
        'City !== undefined)}, ${ City } ${/if}</div ></div> ';
    let monthEventTemplate: string = '<div class="e-subject">${Subject}</div>';
    let scheduleObj: Schedule = new Schedule({
        width: '100%',
        height: '650px',
        currentView: 'Month',
        selectedDate: new Date(2021, 5, 20),
        eventSettings: { dataSource: data },
        resources: [{
            field: 'GroupId', title: 'Owner', name: 'Owners',
            dataSource: [
                { GroupText: 'Group A', GroupId: 1, GroupColor: '#1aaa55' },
                { GroupText: 'Group B', GroupId: 2, GroupColor: '#357cd2' }
            ],
            textField: 'GroupText', idField: 'GroupId', colorField: 'GroupColor'
        }],
        views: [
            { option: 'Day', startHour: '07:00', endHour: '18:00' },
            {
                option: 'Week', startHour: '09:00', endHour: '19:00', showWeekend: false,
                timeScale: { interval: 60, slotCount: 4 }
            },
            { option: 'Month', group: { resources: ['Owners'] }, eventTemplate: monthEventTemplate },
            { option: 'Agenda', eventTemplate: agendaTemplate }
        ]
    });
    scheduleObj.appendTo('#Schedule');
};
