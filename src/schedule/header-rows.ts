import {
    Schedule, ScheduleModel, TimelineViews, TimelineMonth, CellTemplateArgs,
    getWeekNumber, EventRenderedArgs, Resize, DragAndDrop
} from '@syncfusion/ej2-schedule';
import { headerRowData, applyCategoryColor } from './datasource';
import { Internationalization, extend } from '@syncfusion/ej2-base';
/**
 * schedule header rows sample
 */
Schedule.Inject(TimelineViews, TimelineMonth, Resize, DragAndDrop);

this.default = () => {
    interface TemplateFunction extends Window {
        getMonthDetails?: Function;
        getWeekDetails?: Function;
    }
    let instance: Internationalization = new Internationalization();
    (window as TemplateFunction).getMonthDetails = (value: CellTemplateArgs) => {
        return instance.formatDate((value as CellTemplateArgs).date, { skeleton: 'yMMMM' });
    };
    (window as TemplateFunction).getWeekDetails = (value: CellTemplateArgs) => {
        return 'Week ' + getWeekNumber((value as CellTemplateArgs).date);
    };
    let scheduleOptions: ScheduleModel = {
        width: '100%',
        height: '650px',
        selectedDate: new Date(2018, 0, 1),
        headerRows: [
            { option: 'Month', template: '#month-template' },
            { option: 'Week', template: '#week-template' },
            { option: 'Date' }
        ],
        views: [
            { option: 'TimelineMonth', interval: 12 }
        ],
        eventSettings: {
            dataSource: <Object[]>extend([], headerRowData, null, true)
        },
        eventRendered: (args: EventRenderedArgs) => applyCategoryColor(args, scheduleObj.currentView)
    };
    let scheduleObj: Schedule = new Schedule(scheduleOptions, document.getElementById('Schedule'));
};