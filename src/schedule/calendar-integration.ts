import { loadCultureFiles } from '../common/culture-loader';
import { Schedule, Day, Week, WorkWeek, Month, Agenda } from '@syncfusion/ej2-schedule';
import { DataManager, WebApiAdaptor } from '@syncfusion/ej2-data';

Schedule.Inject(Day, Week, WorkWeek, Month, Agenda);

/**
 * Schedule google calendar integration sample
 */

(window as any).default = (): void => {
    loadCultureFiles();
    const CALENDAR_ID: string = '5105trob9dasha31vuqek6qgp0@group.calendar.google.com';
    const PUBLIC_KEY: string = 'AIzaSyD76zjMDsL_jkenM5AAnNsORypS1Icuqxg';
    let dataManger: DataManager = new DataManager({
        url: 'https://www.googleapis.com/calendar/v3/calendars/' + CALENDAR_ID + '/events?key=' + PUBLIC_KEY,
        adaptor: new WebApiAdaptor,
        crossDomain: true
    });
    let scheduleObj: Schedule = new Schedule({
        width: '100%',
        height: '650px',
        selectedDate: new Date(2018, 10, 14),
        eventSettings: { dataSource: dataManger },
        readonly: true,
        dataBinding: (e: { [key: string]: Object }) => {
            let items: { [key: string]: Object }[] = (e.result as { [key: string]: Object }).items as { [key: string]: Object }[];
            let scheduleData: Object[] = [];
            if (items.length > 0) {
                for (let i: number = 0; i < items.length; i++) {
                    let event: { [key: string]: Object } = items[i];
                    let when: string = (event.start as { [key: string]: Object }).dateTime as string;
                    let start: string = (event.start as { [key: string]: Object }).dateTime as string;
                    let end: string = (event.end as { [key: string]: Object }).dateTime as string;
                    if (!when) {
                        when = (event.start as { [key: string]: Object }).date as string;
                        start = (event.start as { [key: string]: Object }).date as string;
                        end = (event.end as { [key: string]: Object }).date as string;
                    }
                    scheduleData.push({
                        Id: event.id,
                        Subject: event.summary,
                        StartTime: new Date(start),
                        EndTime: new Date(end),
                        IsAllDay: !(event.start as { [key: string]: Object }).dateTime
                    });
                }
            }
            e.result = scheduleData;
        }
    });
    scheduleObj.appendTo('#Schedule');
};
