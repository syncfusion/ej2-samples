import { loadCultureFiles } from '../common/culture-loader';
import { Schedule, Day, Week, WorkWeek, Month, Agenda } from '@syncfusion/ej2-schedule';
import { DataManager, WebApiAdaptor } from '@syncfusion/ej2-data';

Schedule.Inject(Day, Week, WorkWeek, Month, Agenda);

/**
 * Schedule google calendar integration sample
 */

(window as any).default = (): void => {
    loadCultureFiles();
    const CALENDAR_ID: string = 'en.usa%23holiday@group.v.calendar.google.com';
    const PUBLIC_KEY: string = 'AIzaSyBgbX_tgmVanBP4yafDPPXxWr70sjbKAXM';
    let dataManger: DataManager = new DataManager({
        url: 'https://www.googleapis.com/calendar/v3/calendars/' + CALENDAR_ID + '/events?key=' + PUBLIC_KEY,
        adaptor: new WebApiAdaptor(),
        crossDomain: true
    });
    let scheduleObj: Schedule = new Schedule({
        width: '100%',
        height: '650px',
        eventSettings: { dataSource: dataManger },
        readonly: true,
        currentView: 'Month',
        timezone: 'UTC',
        dataBinding: (e: Record<string, any>) => {
            let items: Record<string, any>[] = (e.result as Record<string, Record<string, any>[]>).items;
            let scheduleData: Object[] = [];
            if (items.length > 0) {
                for (let i: number = 0; i < items.length; i++) {
                    let event: Record<string, any> = items[i];
                    let when: string = event.start.dateTime as string;
                    let start: string = event.start.dateTime as string;
                    let end: string = event.end.dateTime as string;
                    if (!when) {
                        when = event.start.date as string;
                        start = event.start.date as string;
                        end = event.end.date as string;
                    }
                    scheduleData.push({
                        Id: event.id,
                        Subject: event.summary,
                        StartTime: new Date(start),
                        EndTime: new Date(end),
                        IsAllDay: !event.start.dateTime
                    });
                }
            }
            e.result = scheduleData;
        }
    });
    scheduleObj.appendTo('#Schedule');
};
