import { loadCultureFiles } from '../common/culture-loader';
import { extend } from '@syncfusion/ej2-base';
import { Schedule, Day, Week, WorkWeek, Resize, DragAndDrop, NavigatingEventArgs } from '@syncfusion/ej2-schedule';
import { RadioButton, ChangeEventArgs } from '@syncfusion/ej2-buttons';
import { NumericTextBox, ChangeEventArgs as NumericChangeEventArgs } from '@syncfusion/ej2-inputs';
import * as dataSource from './datasource.json';

Schedule.Inject(Day, Week, WorkWeek, Resize, DragAndDrop);

/**
 * Limit Concurrent Events sample
 */

(window as any).default = (): void => {
    loadCultureFiles();
    let data: Object[] = <Object[]>extend([], (dataSource as Record<string, any>).overlappingData, null, true);
    let displayMode: string = 'limited';
    let maxEventsLimit: number = 1;

    let scheduleObj: Schedule = new Schedule({
        width: '100%',
        height: '650px',
        selectedDate: new Date(2026, 4, 29),
        currentView: 'Week',
        eventSettings: { dataSource: data },
        navigating: (args: NavigatingEventArgs) => {
            if (args.action === 'view') {
                applyMaxStackToAllViews();
            }
        },
        views: [
            { option: 'Day', maxEventStack: getMaxStack() },
            { option: 'Week', maxEventStack: getMaxStack() },
            { option: 'WorkWeek', maxEventStack: getMaxStack() }
        ]
    });
    scheduleObj.appendTo('#Schedule');

    let radioButton1: RadioButton = new RadioButton({
        cssClass: 'schedule-radio-button',
        name: 'eventDisplay',
        value: 'all',
        change: () => onDisplayModeChange("all")
    });
    radioButton1.appendTo('#radio1');

    let radioButton2: RadioButton = new RadioButton({
        cssClass: 'schedule-radio-button',
        name: 'eventDisplay',
        value: 'limited',
        checked: true,
        change: () => onDisplayModeChange("limited")
    });
    radioButton2.appendTo('#radio2');

    let numericTextBox: NumericTextBox = new NumericTextBox({
        value: maxEventsLimit,
        min: 1,
        width: '110px',
        format: 'n0',
        enabled: true,
        change: onLimitChange
    });
    numericTextBox.appendTo('#numeric');

    function getMaxStack(): number {
        return displayMode === 'all' ? 0 : maxEventsLimit;
    }

    function onDisplayModeChange(mode: string): void {
        displayMode = mode;
        if (displayMode === 'all') {
            scheduleObj.activeViewOptions.maxEventStack = 0;
            numericTextBox.enabled = false;
            numericTextBox.dataBind();
        } else {
            scheduleObj.activeViewOptions.maxEventStack = maxEventsLimit;
            numericTextBox.enabled = true;
            numericTextBox.dataBind();
        }
        scheduleObj.refreshEvents();
    }

    function onLimitChange(args: NumericChangeEventArgs): void {
        maxEventsLimit = args.value as number;
        scheduleObj.activeViewOptions.maxEventStack = maxEventsLimit;
        scheduleObj.refreshEvents();
    }

    function applyMaxStackToAllViews(): void {
        const value: number = displayMode === 'all' ? 0 : maxEventsLimit;
        const currentViews: { option: string; [key: string]: any }[] = scheduleObj.views as { option: string; [key: string]: any }[];
        const updatedViews: { option: string; [key: string]: any }[] = currentViews.map((view) => ({
            ...view,
            maxEventStack: value
        }));
        scheduleObj.setProperties({ views: updatedViews }, true);
        scheduleObj.dataBind();
        scheduleObj.refreshEvents();
    }
};
