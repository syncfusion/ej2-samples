import { loadCultureFiles } from '../common/culture-loader';
import { Gantt, Filter, Toolbar, IActionBeginEventArgs, Selection } from '@syncfusion/ej2-gantt';
import { filteredData } from './data-source';
import { getValue } from '@syncfusion/ej2-base';

/**
 * Filtering Gantt sample
 */

Gantt.Inject(Filter, Toolbar, Selection);
(window as any).default = (): void => {
    loadCultureFiles();
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
            toolbar: ['Search'],
            allowFiltering: true,
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
                columnIndex: 3
            },
            durationUnit: 'Hour',
            dayWorkingTime: [{ from: 1, to: 24 }],
            labelSettings: {
                rightLabel: 'TaskName',
            },
            projectStartDate: new Date('07/16/1969 01:00:00 AM'),
            projectEndDate: new Date('07/25/1969'),
            actionComplete: (args: IActionBeginEventArgs) => {
                if (args.requestType === 'filterafteropen' &&
                 (getValue('columnName', args) === 'StartDate' || getValue('columnName', args) === 'EndDate')) {
                    getValue('filterModel', args).dlgDiv.querySelector('.e-datetimepicker').ej2_instances[0].min = new Date(1969, 5, 1);
                    getValue('filterModel', args).dlgDiv.querySelector('.e-datetimepicker').ej2_instances[0].max = new Date(1969, 8, 30);
                    getValue('filterModel', args).dlgDiv.querySelector('.e-datetimepicker').ej2_instances[0].dataBind();
                }
            },
        });
    gantt.appendTo('#Filtering');
};
