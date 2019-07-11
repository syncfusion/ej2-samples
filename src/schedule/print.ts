import { loadCultureFiles } from '../common/culture-loader';
import { extend } from '@syncfusion/ej2-base';
import { ItemModel } from '@syncfusion/ej2-navigations';
import {
    Schedule, Month, ActionEventArgs, ToolbarActionArgs, DragAndDrop, Resize, Print
} from '@syncfusion/ej2-schedule';
import * as dataSource from './datasource.json';

/**
 * Schedule excel export sample
 */

(window as any).default = (): void => {
    loadCultureFiles();
    Schedule.Inject(Month, DragAndDrop, Resize, Print);
    let data: Object[] = <Object[]>extend([], (dataSource as any).scheduleData, null, true);
    let scheduleObj: Schedule = new Schedule({
        width: '100%',
        height: '550px',
        views: ['Month'],
        selectedDate: new Date(2019, 0, 10),
        eventSettings: { dataSource: data },
        actionBegin: (args: ActionEventArgs & ToolbarActionArgs) => {
            if (args.requestType === 'toolbarItemRendering') {
                let printItem: ItemModel = {
                    align: 'Right', showTextOn: 'Both', prefixIcon: 'e-icon-schedule-print',
                    text: 'Print', cssClass: 'e-schedule-print', click: onPrintIconClick
                };
                args.items.push(printItem);
            }
        }
    });
    scheduleObj.appendTo('#Schedule');

    function onPrintIconClick(): void {
        scheduleObj.print();
    }
};