import { Internationalization, extend } from '@syncfusion/ej2-base';
import { Schedule, Day, Week, Month, Agenda, EventRenderedArgs } from '@syncfusion/ej2-schedule';
import { fifaEventsData, applyCategoryColor } from './datasource';

Schedule.Inject(Day, Week, Month, Agenda);

/**
 *  Schedule view based configuration sample
 */

this.default = () => {
    let data: Object[] = <Object[]>extend([], fifaEventsData, null, true);
    //To get time
    let instance: Internationalization = new Internationalization();
    (window as TemplateFunction).getTimeString = (value: Date) => {
        return instance.formatDate(value, { skeleton: 'Hm' });
    };
    interface TemplateFunction extends Window {
        getTimeString?: Function;
    }
    let agendaTemplate: string = '<div class="subject">${Subject}</div><div class="group">${Description}</div>' +
        '<div class="location">${getTimeString(data.StartTime)}, ${City}</div>';
    let scheduleObj: Schedule = new Schedule({
        width: '100%',
        height: '550px',
        selectedDate: new Date(2018, 5, 20),
        eventSettings: { dataSource: data },
        views: [
            { option: 'Day', startHour: '07:00', endHour: '18:00' },
            { option: 'Week', startHour: '09:00', endHour: '19:00', showWeekend: false },
            { option: 'Month' },
            { option: 'Agenda', eventTemplate: agendaTemplate }
        ],
        eventRendered: (args: EventRenderedArgs) => applyCategoryColor(args, scheduleObj.currentView)
    });
    scheduleObj.appendTo('#Schedule');
};
