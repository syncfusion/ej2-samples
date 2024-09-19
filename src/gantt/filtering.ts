import { loadCultureFiles } from '../common/culture-loader';
import { Gantt, Filter, Toolbar, IActionBeginEventArgs, Selection } from '@syncfusion/ej2-gantt';
import { filteredData } from './data-source';
import { getValue } from '@syncfusion/ej2-base';
import { DropDownList, ChangeEventArgs } from '@syncfusion/ej2-dropdowns';

/**
 * Filtering Gantt sample
 */

Gantt.Inject(Filter, Toolbar, Selection);
(window as any).default = (): void => {
    loadCultureFiles();
    let type: { [key: string]: Object }[] = [
        { id: 'Menu', type: 'Menu' },
        { id: 'Excel', type: 'Excel' }
    ];
    let mode: { [key: string]: Object }[] = [
        { id: 'Parent', type: 'Parent' },
        { id: 'Child', type: 'Child' },
        { id: 'Both', type: 'Both' },
        { id: 'None', type: 'None' },
    ];
    let gantt: Gantt = new Gantt(
        {
            dataSource: filteredData,
            dateFormat: 'MM/dd/yyyy hh:mm:ss',
            taskFields  : {
                id: 'TaskID',
                name: 'TaskName',
                startDate: 'StartDate',
                endDate: 'EndDate',
                duration: 'Duration',
                dependency: 'Predecessor',
                child: 'subtasks',
            },
            columns: [
                { field: 'TaskName', headerText: 'Task Name', width: '250', clipMode: 'EllipsisWithTooltip' },
                { field: 'StartDate', headerText: 'Start Date' },
                { field: 'Duration', headerText: 'Duration' },
                { field: 'EndDate', headerText: 'End Date' },
                { field: 'Predecessor', headerText: 'Predecessor' }
            ],
            treeColumnIndex: 0,
            allowFiltering: true,
            filterSettings: { type: 'Menu',hierarchyMode:'Parent'},
            includeWeekend: true,
            height: '450px',
            timelineSettings: {
                timelineUnitSize: 60,
                topTier: {
                    format: 'MMM dd, yyyy',
                    unit: 'Day',
                },
                bottomTier: {
                    unit: 'Hour',
                    format: 'h.mm a'
                },
            },
            splitterSettings: {
                columnIndex: 2
            },
            durationUnit: 'Hour',
            dayWorkingTime: [{ from: 1, to: 24 }],
            labelSettings: {
                rightLabel: 'TaskName',
            },
            projectStartDate: new Date('07/16/2024 01:00:00 AM'),
            projectEndDate: new Date('07/25/2024'),
            actionComplete: (args: IActionBeginEventArgs) => {
                if (args.requestType === 'filterafteropen' &&
                 (getValue('columnName', args) === 'StartDate' || getValue('columnName', args) === 'EndDate') 
                    && gantt.filterSettings.type === "Menu") {
                    getValue('filterModel', args).dlgDiv.querySelector('.e-datetimepicker').ej2_instances[0].min = new Date(2024, 5, 1);
                    getValue('filterModel', args).dlgDiv.querySelector('.e-datetimepicker').ej2_instances[0].max = new Date(2024, 8, 30);
                    getValue('filterModel', args).dlgDiv.querySelector('.e-datetimepicker').ej2_instances[0].dataBind();
                }
            },
        });
    gantt.appendTo('#Filtering');
    let dropDownType: DropDownList = new DropDownList({
        dataSource: type,
        popupWidth: '100%',
        fields: { text: 'type', value: 'id' },
        value: 'Menu',
        change: (e: ChangeEventArgs) => {
            let type: any = <string>e.value;
            gantt.filterSettings.type = type;
            gantt.clearFiltering();
        }
    });
    dropDownType.appendTo('#filtertype');
    let dropDownMode: DropDownList = new DropDownList({
        dataSource: mode,
        popupWidth: '100%',
        fields: { text: 'type', value: 'id' },
        value: 'Parent',
        change: (e: ChangeEventArgs) => {
            let mode: any = <string>e.value;
            gantt.filterSettings.hierarchyMode = mode;
            gantt.clearFiltering();
        }
    });
    dropDownMode.appendTo('#mode');
};
