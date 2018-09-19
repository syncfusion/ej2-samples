import { Schedule, Day, Week, TimelineViews, Resize, DragAndDrop } from '@syncfusion/ej2-schedule';
import { scheduleData } from './datasource';
import { DropDownList, ChangeEventArgs as DropDownChangeArgs } from '@syncfusion/ej2-dropdowns';
import { Internationalization, extend } from '@syncfusion/ej2-base';

/**
 * schedule sample
 */
Schedule.Inject(Day, Week, TimelineViews, Resize, DragAndDrop);
this.default = () => {
    let instance: Internationalization = new Internationalization();
    (window as TemplateFunction).majorSlotTemplate = (date: Date) => {
        return instance.formatDate(date, { skeleton: 'hm' });
    };
    (window as TemplateFunction).minorSlotTemplate = (date: Date) => {
        return instance.formatDate(date, { skeleton: 'ms' }).replace(':00', '');
    };
    interface TemplateFunction extends Window {
        majorSlotTemplate?: Function;
        minorSlotTemplate?: Function;
    }
    let data: Object[] = <Object[]>extend([], scheduleData, null, true);
    let scheduleObj: Schedule = new Schedule({
        width: '100%',
        height: '650px',
        selectedDate: new Date(2018, 1, 15),
        currentView: 'TimelineWeek',
        views: ['Day', 'Week', 'TimelineDay', 'TimelineWeek'],
        timeScale: {
            enable: true,
            interval: 60,
            slotCount: 6
        },
        eventSettings: { dataSource: data }
    });

    let minorSlot: DropDownList = new DropDownList({
        change: (args: DropDownChangeArgs) => {
            scheduleObj.timeScale.slotCount = parseInt(args.value as string, 10);
            scheduleObj.dataBind();
        }
    });
    minorSlot.appendTo('#slotCount');

    let majorSlotCount: DropDownList = new DropDownList({
        change: (args: DropDownChangeArgs) => {
            scheduleObj.timeScale.interval = parseInt(args.value as string, 10);
            scheduleObj.dataBind();
        }
    });
    majorSlotCount.appendTo('#interval');

    let timeScale: DropDownList = new DropDownList({
        change: (args: DropDownChangeArgs) => {
            scheduleObj.timeScale.enable = (args.value === 'enable') ? true : false;
            scheduleObj.dataBind();
        }
    });
    timeScale.appendTo('#timescale');

    let timescaleTemplate: DropDownList = new DropDownList({
        change: (args: DropDownChangeArgs) => {
            scheduleObj.timeScale.majorSlotTemplate = (args.value === 'yes') ? '#majorSlotTemplate' : null;
            scheduleObj.timeScale.minorSlotTemplate = (args.value === 'yes') ? '#minorSlotTemplate' : null;
            scheduleObj.dataBind();
        }
    });
    timescaleTemplate.appendTo('#template');
    scheduleObj.appendTo('#Schedule');
};
