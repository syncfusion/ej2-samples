import { Schedule, Day, Week, TimelineViews, Resize, DragAndDrop } from '@syncfusion/ej2-schedule';
import { DropDownList, ChangeEventArgs as DropDownChangeArgs } from '@syncfusion/ej2-dropdowns';
import { Internationalization, extend } from '@syncfusion/ej2-base';
import * as dataSource from './datasource.json';

/**
 * schedule sample
 */
Schedule.Inject(Day, Week, TimelineViews, Resize, DragAndDrop);
(window as any).default = () => {
    // custom code start
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
    // custom code end
    let data: Record<string, any>[] = <Record<string, any>[]>extend([], (dataSource as Record<string, any>).scheduleData, null, true);
    let scheduleObj: Schedule = new Schedule({
        width: '100%',
        height: '650px',
        cssClass: 'time-scale',
        selectedDate: new Date(2021, 0, 10),
        currentView: 'TimelineWeek',
        views: ['Day', 'Week', 'TimelineDay', 'TimelineWeek'],
        timeScale: {
            enable: true,
            interval: 60,
            slotCount: 6
        },
        workDays: [0, 1, 2, 3, 4, 5],
        eventSettings: { dataSource: data }
    });

    scheduleObj.appendTo('#Schedule');
    // custom code start
    let minorSlot: DropDownList = new DropDownList({
        placeholder: "Slot Count",
        floatLabelType: "Always",
        change: (args: DropDownChangeArgs) => {
            scheduleObj.timeScale.slotCount = parseInt(args.value as string, 10);
            scheduleObj.dataBind();
        }
    });
    minorSlot.appendTo('#slotCount');

    let majorSlotCount: DropDownList = new DropDownList({
        placeholder: "Interval (in Minutes)",
        floatLabelType: "Always",
        change: (args: DropDownChangeArgs) => {
            scheduleObj.timeScale.interval = parseInt(args.value as string, 10);
            scheduleObj.dataBind();
        }
    });
    majorSlotCount.appendTo('#interval');

    let timeScale: DropDownList = new DropDownList({
        placeholder: "Grid lines",
        floatLabelType: "Always",
        change: (args: DropDownChangeArgs) => {
            scheduleObj.timeScale.enable = (args.value === 'enable') ? true : false;
            scheduleObj.dataBind();
        }
    });
    timeScale.appendTo('#timescale');

    let timescaleTemplate: DropDownList = new DropDownList({
        placeholder: "Apply Template",
        floatLabelType: "Always",
        change: (args: DropDownChangeArgs) => {
            scheduleObj.timeScale.majorSlotTemplate = (args.value === 'yes') ? '#majorSlotTemplate' : null;
            scheduleObj.timeScale.minorSlotTemplate = (args.value === 'yes') ? '#minorSlotTemplate' : null;
            scheduleObj.dataBind();
        }
    });
    timescaleTemplate.appendTo('#template');
    // custom code end
};
