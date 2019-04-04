import { loadCultureFiles } from '../common/culture-loader';
import { Button } from '@syncfusion/ej2-buttons';
import { MultiSelect, CheckBoxSelection, MultiSelectChangeEventArgs } from '@syncfusion/ej2-dropdowns';
import {
    Schedule, Day, Week, Month, TimelineViews, TimelineMonth,
    EventRenderedArgs, Resize, DragAndDrop
} from '@syncfusion/ej2-schedule';
import * as dataSource from './datasource.json';
import { applyCategoryColor } from './helper';
import { extend } from '@syncfusion/ej2-base';

Schedule.Inject(Day, Week, Month, TimelineViews, TimelineMonth, Resize, DragAndDrop);
MultiSelect.Inject(CheckBoxSelection);

/**
 *  Schedule hide non-working days sample
 */

(window as any).default = (): void => {
    loadCultureFiles();
    let data: Object[] = <Object[]>extend([], (dataSource as any).employeeEventData, null, true);
    let scheduleObj: Schedule = new Schedule({
        width: '100%',
        height: '650px',
        showWeekend: false,
        workDays: [1, 3, 4, 5],
        workHours: {
            start: '08:00'
        },
        views: ['Day', 'Week', 'Month', 'TimelineWeek', 'TimelineMonth'],
        selectedDate: new Date(2018, 1, 15),
        eventSettings: { dataSource: data },
        eventRendered: (args: EventRenderedArgs) => applyCategoryColor(args, scheduleObj.currentView)
    });
    scheduleObj.appendTo('#Schedule');

    let weekDays: { [key: string]: Object; }[] = [
        { Name: 'Sunday', Value: '0' },
        { Name: 'Monday', Value: '1' },
        { Name: 'Tuesday', Value: '2' },
        { Name: 'Wednesday', Value: '3' },
        { Name: 'Thursday', Value: '4' },
        { Name: 'Friday', Value: '5' },
        { Name: 'Saturday', Value: '6' }
    ];
    let checkList: MultiSelect = new MultiSelect({
        value: ['1', '3', '4', '5'] as any,
        dataSource: weekDays,
        fields: { text: 'Name', value: 'Value' },
        mode: 'CheckBox',
        showDropDownIcon: true,
        showClearButton: false,
        popupWidth: 180,
        change: (args: MultiSelectChangeEventArgs) => {
            let value: number[] = (args.value as number[]).slice(0).map(Number).sort();
            scheduleObj.workDays = value.length === 0 ? [0] : value;
            scheduleObj.dataBind();
        }
    });
    checkList.appendTo('#workdayscheckbox');

    let toggleBtn: Button = new Button({ isToggle: true });
    toggleBtn.appendTo('#showweekendbtn');
    toggleBtn.element.onclick = (): void => {
        if (toggleBtn.element.classList.contains('e-active')) {
            toggleBtn.content = 'Hide';
            scheduleObj.showWeekend = true;
        } else {
            toggleBtn.content = 'Show';
            scheduleObj.showWeekend = false;
        }
    };
};
