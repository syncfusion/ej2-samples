import { extend } from '@syncfusion/ej2-base';
import {
    Schedule, Day, Week, WorkWeek, Month, Agenda, EventRenderedArgs,
    EventFieldsMapping, Resize, DragAndDrop
} from '@syncfusion/ej2-schedule';
import { leaveData } from './datasource';
import { DataManager, Query } from '@syncfusion/ej2-data';
Schedule.Inject(Day, Week, WorkWeek, Month, Agenda, Resize, DragAndDrop);

/**
 * Schedule normal events sample
 */

this.default = () => {
    let data: Object[] = <Object[]>extend([], leaveData, null, true);
    let scheduleObj: Schedule = new Schedule({
        width: '100%',
        height: '650px',
        selectedDate: new Date(2018, 1, 15),
        eventSettings: { dataSource: data },
        eventRendered: (args: EventRenderedArgs) => {
            let categoryColor: string;
            let appData: { [key: string]: Object } = args.data as { [key: string]: Object };
            let eventFields: EventFieldsMapping = scheduleObj.eventFields;
            let parentApp: { [key: string]: Object } = <{ [key: string]: Object }>new DataManager(scheduleObj.eventsData).
                executeLocal(new Query().where(eventFields.id, 'equal', appData[eventFields.id] as string | number))[0];
            let start: number = new Date(parentApp[eventFields.startTime] as string).setHours(0, 0, 0, 0);
            let end: number = new Date(parentApp[eventFields.endTime] as string).setHours(0, 0, 0, 0);
            if (appData.IsAllDay as boolean) {
                categoryColor = '#8e24aa';
            } else if (start !== end) {
                categoryColor = '#f57f17';
            } else {
                categoryColor = '#7fa900';
            }
            if (scheduleObj.currentView === 'Agenda') {
                (args.element.firstChild as HTMLElement).style.borderLeftColor = categoryColor;
            } else {
                args.element.style.backgroundColor = categoryColor;
            }
        }
    });
    scheduleObj.appendTo('#Schedule');
};
