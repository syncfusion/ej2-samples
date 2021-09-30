import { loadCultureFiles } from '../common/culture-loader';
import { CheckBox, ChangeEventArgs } from '@syncfusion/ej2-buttons';
import { Schedule, Day, Week, WorkWeek, Month, Agenda, EventRenderedArgs, Resize, DragAndDrop } from '@syncfusion/ej2-schedule';
import { applyCategoryColor } from './helper';
import * as dataSource from './datasource.json';
import { extend } from '@syncfusion/ej2-base';

Schedule.Inject(Day, Week, WorkWeek, Month, Agenda, Resize, DragAndDrop);

/**
 *  Schedule event tooltip sample
 */

(window as any).default = (): void => {
    loadCultureFiles();
    let data: Record<string, any>[] = <Record<string, any>[]>extend([], (dataSource as Record<string, any>).eventsData, null, true);
    let template: string = '<div class="tooltip-wrap">' +
        '<div class="image ${EventType}"></div>' +
        '<div class="content-area"><div class="name">${Subject}</></div>' +
        '${if(City !== null && City !== undefined)}<div class="city">${City}</div>${/if}' +
        '<div class="time">From&nbsp;:&nbsp;${StartTime.toLocaleString()} </div>' +
        '<div class="time">To&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;${EndTime.toLocaleString()} </div></div></div>';
    let scheduleObj: Schedule = new Schedule({
        width: '100%',
        height: '650px',
        selectedDate: new Date(2021, 1, 15),
        eventSettings: {
            dataSource: data,
            enableTooltip: true,
            tooltipTemplate: template
        },
        eventRendered: (args: EventRenderedArgs) => applyCategoryColor(args, scheduleObj.currentView)
    });
    scheduleObj.appendTo('#Schedule');

    // custom code start
    let enableTooltipCheckObj: CheckBox = new CheckBox({
        label: 'Enable Tooltip', checked: true,
        change: (args: ChangeEventArgs) => {
            scheduleObj.eventSettings.enableTooltip = args.checked;
            scheduleObj.dataBind();
        }
    });
    enableTooltipCheckObj.appendTo('#enableTooltip');

    let enableTooltipTemplateCheckObj: CheckBox = new CheckBox({
        label: 'Enable Tooltip Template', checked: true,
        change: (args: ChangeEventArgs) => {
            scheduleObj.eventSettings.tooltipTemplate = args.checked ? template : null;
            scheduleObj.dataBind();
        }
    });
    enableTooltipTemplateCheckObj.appendTo('#enableTooltipTemplate');
    // custom code end
};
