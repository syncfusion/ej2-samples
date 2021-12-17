import { loadCultureFiles } from '../common/culture-loader';
import { extend } from '@syncfusion/ej2-base';
import { ItemModel } from '@syncfusion/ej2-navigations';
import {
    Schedule, Week, ActionEventArgs, ExcelExport, DragAndDrop, Resize, ExportOptions, ExportFieldInfo
} from '@syncfusion/ej2-schedule';
import * as dataSource from './datasource.json';

/**
 * Schedule excel export sample
 */

(window as any).default = (): void => {
    loadCultureFiles();
    Schedule.Inject(Week, DragAndDrop, Resize, ExcelExport);
    let data: Object[] = <Object[]>extend([], (dataSource as any).scheduleData, null, true);
    let scheduleObj: Schedule = new Schedule({
        width: '100%',
        height: '550px',
        views: ['Week'],
        currentView: 'Week',
        selectedDate: new Date(2021, 0, 10),
        eventSettings: { dataSource: data },
        actionBegin: (args: ActionEventArgs) => {
            if (args.requestType === 'toolbarItemRendering') {
                let exportItem: ItemModel = {
                    align: 'Right', showTextOn: 'Both', prefixIcon: 'e-icons e-export-excel',
                    text: 'Excel Export', cssClass: 'e-excel-export', click: onExportClick
                };
                args.items.push(exportItem);
            }
        }
    });
    scheduleObj.appendTo('#Schedule');

    function onExportClick(): void {
        const exportFields: ExportFieldInfo[] = [
            { name: 'Id', text: 'Id' },
            { name: 'Subject', text: 'Summary' },
            { name: 'StartTime', text: 'Start Date' },
            { name: 'EndTime', text: 'End Date' },
            { name: 'Location', text: 'Place' }
        ];
        const exportValues: ExportOptions = { fieldsInfo: exportFields };
        scheduleObj.exportToExcel(exportValues);
    }
};