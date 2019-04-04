import { loadCultureFiles } from '../common/culture-loader';
import { Browser, extend } from '@syncfusion/ej2-base';
import { DropDownList, ChangeEventArgs } from '@syncfusion/ej2-dropdowns';
import { Schedule, Day, Week, WorkWeek, Month, Agenda, Timezone, EventRenderedArgs, Resize, DragAndDrop } from '@syncfusion/ej2-schedule';
import * as dataSource from './datasource.json';
import { applyCategoryColor } from './helper';
import { tz } from 'moment-timezone';

Schedule.Inject(Day, Week, WorkWeek, Month, Agenda, Resize, DragAndDrop);

/**
 * Schedule timezone events sample
 */

(window as any).default = (): void => {
    loadCultureFiles();
    if (Browser.isIE) {
        Timezone.prototype.offset = (date: Date, timezone: string): number => {
            return tz.zone(timezone).utcOffset(date.getTime());
        };
    }
    let fifaEvents: Object[] = <Object[]>extend([], ((dataSource as any).fifaEventsData), null, true);
    let timezone: Timezone = new Timezone();
    // Here remove the local offset from events
    for (let fifaEvent of fifaEvents) {
        let event: { [key: string]: Object } = fifaEvent as { [key: string]: Object };
        event.StartTime = timezone.removeLocalOffset(new Date(<string>event.StartTime));
        event.EndTime = timezone.removeLocalOffset(new Date(<string>event.EndTime));
    }
    // Initialize schedule component
    let scheduleObj: Schedule = new Schedule({
        width: '100%',
        height: '650px',
        timezone: 'UTC',
        workHours: { start: '11:00' },
        selectedDate: new Date(2018, 5, 20),
        eventSettings: { dataSource: fifaEvents },
        eventRendered: (args: EventRenderedArgs) => applyCategoryColor(args, scheduleObj.currentView)
    });
    scheduleObj.appendTo('#Schedule');

    // Initialize DropDownList component for timezone list
    let dropDownListObject: DropDownList = new DropDownList({
        popupWidth: 250,
        change: (args: ChangeEventArgs) => {
            scheduleObj.timezone = <string>args.value;
            scheduleObj.dataBind();
        }
    });
    dropDownListObject.appendTo('#scheduletimezone');
};
