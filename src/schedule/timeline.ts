import { loadCultureFiles } from '../common/culture-loader';
import { DatePicker, ChangeEventArgs } from '@syncfusion/ej2-calendars';
import { Schedule, TimelineViews, TimelineMonth, Agenda, Resize, DragAndDrop } from '@syncfusion/ej2-schedule';
import * as dataSource from './datasource.json';
import { extend } from '@syncfusion/ej2-base';

Schedule.Inject(TimelineViews, TimelineMonth, Agenda, Resize, DragAndDrop);

/**
 * Schedule Timeline sample
 */

(window as any).default = (): void => {
    loadCultureFiles();
    let scheduleObj: Schedule = new Schedule({
        height: '650px',
        selectedDate: new Date(2019, 0, 10),
        currentView: 'TimelineWeek',
        views: [
            { option: 'TimelineDay' },
            { option: 'TimelineWeek' },
            { option: 'TimelineWorkWeek' },
            { option: 'TimelineMonth' },
            { option: 'Agenda' }
        ],
        eventSettings: {
            dataSource:
                <Object[]>extend([], (dataSource as any).scheduleData.concat((dataSource as any).timelineData), null, true)
        }
    });
    scheduleObj.appendTo('#Schedule');

    // custom code start
    let currentDateObj: DatePicker = new DatePicker({
        value: new Date(2019, 0, 10),
        showClearButton: false,
        change: (args: ChangeEventArgs) => {
            scheduleObj.selectedDate = args.value;
            scheduleObj.dataBind();
        }
    });
    currentDateObj.appendTo('#scheduledate');
    // custom code end
};
