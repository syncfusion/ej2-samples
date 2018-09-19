import { extend } from '@syncfusion/ej2-base';
import { DropDownList, ChangeEventArgs } from '@syncfusion/ej2-dropdowns';
import { Schedule, Day, Week, WorkWeek, Month, View, EventRenderedArgs, Resize, DragAndDrop } from '@syncfusion/ej2-schedule';
import { zooEventsData, applyCategoryColor } from './datasource';

Schedule.Inject(Day, Week, WorkWeek, Month, Resize, DragAndDrop);

/**
 * Schedule views sample
 */

this.default = () => {
    let data: Object[] = <Object[]>extend([], zooEventsData, null, true);
    // Initialize schedule component
    let scheduleObj: Schedule = new Schedule({
        width: '100%',
        height: '650px',
        views: ['Day', 'Week', 'WorkWeek', 'Month'],
        selectedDate: new Date(2018, 1, 15),
        eventSettings: { dataSource: data },
        eventRendered: (args: EventRenderedArgs) => applyCategoryColor(args, scheduleObj.currentView)
    });
    scheduleObj.appendTo('#Schedule');

    // Initialize DropDownList component for views
    let dropDownListObject: DropDownList = new DropDownList({
        change: (args: ChangeEventArgs) => {
            scheduleObj.currentView = <View>args.value;
            scheduleObj.dataBind();
        }
    });
    dropDownListObject.appendTo('#scheduleview');
};
