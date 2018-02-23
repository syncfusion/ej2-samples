import { extend } from '@syncfusion/ej2-base';
import { DatePicker, ChangeEventArgs } from '@syncfusion/ej2-calendars';
import { Schedule, Day, Week, WorkWeek, Month, Agenda } from '@syncfusion/ej2-schedule';
import { scheduleData } from './datasource';

Schedule.Inject(Day, Week, WorkWeek, Month, Agenda);

/**
 * Schedule Default sample
 */

this.default = () => {
    let data: Object[] = <Object[]>extend([], scheduleData, null, true);
    let scheduleObj: Schedule = new Schedule({
        height: '550px',
        selectedDate: new Date(2018, 1, 15),
        eventSettings: { dataSource: data }
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
