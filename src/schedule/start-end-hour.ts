import { loadCultureFiles } from '../common/culture-loader';
import { Schedule, Day, Week, TimelineViews, EventRenderedArgs, Resize, DragAndDrop } from '@syncfusion/ej2-schedule';
import { Button } from '@syncfusion/ej2-buttons';
import { TimePicker } from '@syncfusion/ej2-calendars';
import { applyCategoryColor } from './helper';
import * as dataSource from './datasource.json';
import { extend , Internationalization} from '@syncfusion/ej2-base';

Schedule.Inject(Day, Week, TimelineViews, Resize, DragAndDrop);

/**
 * Schedule start and end hour sample
 */

(window as any).default = (): void => {
    loadCultureFiles();
    const globalize:Internationalization = new Internationalization();
    let data: Object[] = <Object[]>extend([], (dataSource as Record<string, any>).employeeEventData, null, true);
    let scheduleObj: Schedule = new Schedule({
        width: '100%',
        height: '650px',
        startHour: '08:00',
        endHour: '20:00',
        views: ['Day', 'Week', 'TimelineDay', 'TimelineWeek'],
        workHours: { highlight: false },
        selectedDate: new Date(2021, 1, 15),
        eventSettings: { dataSource: data },
        eventRendered: (args: EventRenderedArgs) => applyCategoryColor(args, scheduleObj.currentView)
    });
    scheduleObj.appendTo('#Schedule');
    // custom code start
    let start: TimePicker = new TimePicker({
        placeholder: 'Start Hour',
        floatLabelType: "Always",
        value: new Date(2021, 0, 1, 8),
        format: 'HH:mm'
    });
    start.appendTo('#startTime');
    let end: TimePicker = new TimePicker({
        placeholder: 'End Hour',
        floatLabelType: "Always",
        value: new Date(2021, 0, 1, 20),
        format: 'HH:mm'
    });
    end.appendTo('#endTime');
    let button: Button = new Button();
    button.appendTo('#submit');
    document.getElementById('submit').onclick = () => {
        scheduleObj.startHour = globalize.formatDate(start.value, { skeleton: 'Hm' });
        scheduleObj.endHour = globalize.formatDate(end.value, { skeleton: 'Hm' });
        scheduleObj.dataBind();
    };
    // custom code end
};
