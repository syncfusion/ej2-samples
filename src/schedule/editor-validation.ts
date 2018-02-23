import { extend } from '@syncfusion/ej2-base';
import { Schedule, Day, Week, WorkWeek, Month, Agenda, EventRenderedArgs } from '@syncfusion/ej2-schedule';
import { scheduleData, applyCategoryColor } from './datasource';

Schedule.Inject(Day, Week, WorkWeek, Month, Agenda);

/**
 *  Schedule editor validation sample
 */

this.default = () => {
    let data: Object[] = <Object[]>extend([], scheduleData, null, true);
    let scheduleObj: Schedule = new Schedule({
        width: '100%',
        height: '550px',
        selectedDate: new Date(2018, 1, 15),
        eventSettings: {
            dataSource: data,
            fields: {
                subject: { name: 'Subject', validation: { required: true } },
                location: {
                    name: 'Location', validation: {
                        required: true,
                        regex: ['^[a-zA-Z0-9- ]*$', 'Special character(s) not allowed in this field']
                    }
                },
                description: {
                    name: 'Description', validation: {
                        required: true, minLength: 5, maxLength: 500
                    }
                },
                startTime: { name: 'StartTime', validation: { required: true } },
                endTime: { name: 'EndTime', validation: { required: true } }
            }
        },
        eventRendered: (args: EventRenderedArgs) => applyCategoryColor(args, scheduleObj.currentView)
    });
    scheduleObj.appendTo('#Schedule');
};
