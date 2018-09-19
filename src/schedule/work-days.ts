import { extend } from '@syncfusion/ej2-base';
import { DropDownList, ChangeEventArgs } from '@syncfusion/ej2-dropdowns';
import {
    Schedule, Week, WorkWeek, Month, TimelineViews, TimelineMonth,
    EventRenderedArgs, Resize, DragAndDrop
} from '@syncfusion/ej2-schedule';
import { employeeEventData, applyCategoryColor } from './datasource';

Schedule.Inject(Week, WorkWeek, Month, TimelineViews, TimelineMonth, Resize, DragAndDrop);

/**
 * Schedule Work days sample
 */

this.default = () => {
    let data: Object[] = <Object[]>extend([], employeeEventData, null, true);
    // Initialize schedule component
    let scheduleObj: Schedule = new Schedule({
        width: '100%',
        height: '650px',
        workDays: [1, 3, 5],
        workHours: {
            start: '08:00'
        },
        views: ['Week', 'WorkWeek', 'Month', 'TimelineWeek', 'TimelineMonth'],
        selectedDate: new Date(2018, 1, 14),
        eventSettings: { dataSource: data },
        eventRendered: (args: EventRenderedArgs) => applyCategoryColor(args, scheduleObj.currentView)
    });
    scheduleObj.appendTo('#Schedule');

    // Initialize DropDownList component for work days
    let workDaysDropDown: DropDownList = new DropDownList({
        popupWidth: 180,
        change: (args: ChangeEventArgs) => {
            scheduleObj.workDays = args.value.toString().split(',').map(Number);
            scheduleObj.dataBind();
        }
    });
    workDaysDropDown.appendTo('#scheduleworkdays');

    // Initialize DropDownList component for first day of week
    let dayOfWeekDropDown: DropDownList = new DropDownList({
        change: (args: ChangeEventArgs) => {
            scheduleObj.firstDayOfWeek = parseInt(<string>args.value, 10);
            scheduleObj.dataBind();
        }
    });
    dayOfWeekDropDown.appendTo('#scheduledayofweek');
};
