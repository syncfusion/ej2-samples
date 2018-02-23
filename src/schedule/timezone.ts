import { Browser, extend } from '@syncfusion/ej2-base';
import { DropDownList, ChangeEventArgs } from '@syncfusion/ej2-dropdowns';
import { Schedule, Day, Week, WorkWeek, Month, Agenda, Timezone, EventRenderedArgs } from '@syncfusion/ej2-schedule';
import { fifaEventsData, applyCategoryColor } from './datasource';
import { tz } from 'moment-timezone';

Schedule.Inject(Day, Week, WorkWeek, Month, Agenda);

/**
 * Schedule timezone events sample
 */

this.default = () => {
    if (Browser.isIE) {
        Timezone.prototype.offset = (date: Date, timezone: string): number => {
            return tz.zone(timezone).utcOffset(date.getTime());
        };
    }
    let fifaEvents: Object[] = <Object[]>extend([], fifaEventsData, null, true);
    let timezone: Timezone = new Timezone();
    // Here remove the local offset from events
    for (let fifaEvent of fifaEvents) {
        let event: { [key: string]: Object } = fifaEvent as { [key: string]: Object };
        event.StartTime = timezone.removeLocalOffset(<Date>event.StartTime);
        event.EndTime = timezone.removeLocalOffset(<Date>event.EndTime);
    }
    // Initialize schedule component
    let scheduleObj: Schedule = new Schedule({
        width: '100%',
        height: '550px',
        timezone: 'UTC',
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
