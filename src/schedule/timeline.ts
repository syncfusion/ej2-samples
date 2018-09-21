import { extend } from '@syncfusion/ej2-base';
import { DatePicker, ChangeEventArgs } from '@syncfusion/ej2-calendars';
import { Schedule, TimelineViews, TimelineMonth, Agenda, Resize, DragAndDrop } from '@syncfusion/ej2-schedule';
import { scheduleData, timelineData } from './datasource';

Schedule.Inject(TimelineViews, TimelineMonth, Agenda, Resize, DragAndDrop);

/**
 * Schedule Timeline sample
 */

this.default = () => {
    let scheduleObj: Schedule = new Schedule({
        height: '650px',
        selectedDate: new Date(2018, 1, 15),
        currentView: 'TimelineWeek',
        views: [
            { option: 'TimelineDay' },
            { option: 'TimelineWeek' },
            { option: 'TimelineWorkWeek' },
            { option: 'TimelineMonth' },
            { option: 'Agenda' }
        ],
        eventSettings: { dataSource: <Object[]>extend([], scheduleData.concat(timelineData), null, true) }
    });
    scheduleObj.appendTo('#Schedule');

    let currentDate: DatePicker = new DatePicker({
        value: new Date(2018, 1, 15),
        change: (args: ChangeEventArgs) => {
            scheduleObj.selectedDate = args.value;
            scheduleObj.dataBind();
        }
    });
    currentDate.appendTo('#scheduledate');
};
