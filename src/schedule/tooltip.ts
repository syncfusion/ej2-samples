import { extend } from '@syncfusion/ej2-base';
import { CheckBox, ChangeEventArgs } from '@syncfusion/ej2-buttons';
import { Schedule, Day, Week, WorkWeek, Month, Agenda, EventRenderedArgs, Resize, DragAndDrop } from '@syncfusion/ej2-schedule';
import { eventsData, applyCategoryColor } from './datasource';

Schedule.Inject(Day, Week, WorkWeek, Month, Agenda, Resize, DragAndDrop);

/**
 *  Schedule event tooltip sample
 */

this.default = () => {
    let data: Object[] = <Object[]>extend([], eventsData, null, true);
    let template: string = '<div class="tooltip-wrap">' +
        '<div class="image ${EventType}"></div>' +
        '<div class="content-area"><div class="name">${Subject}</></div>' +
        '${if(City !== null && City !== undefined)}<div class="city">${City}</div>${/if}' +
        '<div class="time">From&nbsp;:&nbsp;${StartTime.toLocaleString()} </div>' +
        '<div class="time">To&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;${EndTime.toLocaleString()} </div></div></div>';
    let scheduleObj: Schedule = new Schedule({
        width: '100%',
        height: '650px',
        selectedDate: new Date(2018, 1, 15),
        eventSettings: {
            dataSource: data,
            enableTooltip: true,
            tooltipTemplate: template
        },
        eventRendered: (args: EventRenderedArgs) => applyCategoryColor(args, scheduleObj.currentView)
    });
    scheduleObj.appendTo('#Schedule');

    let enableTooltipCheckObj: CheckBox = new CheckBox({
        label: 'Enable Tooltip', checked: true,
        change: (args: ChangeEventArgs) => {
            if (args.checked) {
                scheduleObj.eventSettings.enableTooltip = true;
            } else {
                scheduleObj.eventSettings.enableTooltip = false;
            }
            scheduleObj.dataBind();
        }
    });
    enableTooltipCheckObj.appendTo('#enableTooltip');

    let enableTooltipTemplateCheckObj: CheckBox = new CheckBox({
        label: 'Enable Tooltip Template', checked: true,
        change: (args: ChangeEventArgs) => {
            if (args.checked) {
                scheduleObj.eventSettings.tooltipTemplate = template;
            } else {
                scheduleObj.eventSettings.tooltipTemplate = null;
            }
            scheduleObj.dataBind();
        }
    });
    enableTooltipTemplateCheckObj.appendTo('#enableTooltipTemplate');
};
