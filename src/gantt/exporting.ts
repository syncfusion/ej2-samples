import { loadCultureFiles } from '../common/culture-loader';
import { Gantt, ExcelExport, Selection, Toolbar } from '@syncfusion/ej2-gantt';
import { editingData, editingResources } from './data-source';
import { ClickEventArgs } from '@syncfusion/ej2-navigations';

/**
 * Editing Gantt sample
 */
Gantt.Inject(Selection, Toolbar, ExcelExport);
(window as any).default = (): void => {
    loadCultureFiles();
    let gantt: Gantt = new Gantt(
        {
            dataSource: editingData,
            dateFormat: 'MMM dd, y',
            taskFields: {
                id: 'TaskID',
                name: 'TaskName',
                startDate: 'StartDate',
                endDate: 'EndDate',
                duration: 'Duration',
                progress: 'Progress',
                dependency: 'Predecessor',
                child: 'subtasks',
                resourceInfo: 'resources'
            },
            allowExcelExport: true,
            toolbar: ['ExcelExport', 'CsvExport'],
            toolbarClick: (args?: ClickEventArgs) => {
                if (args.item.id === 'GanttExport_excelexport') {
                    gantt.excelExport();
                } else if (args.item.id === 'GanttExport_csvexport') {
                    gantt.csvExport();
                }
            },
            allowSelection: true,
            gridLines: 'Both',
            height: '450px',
            treeColumnIndex: 1,
            resourceNameMapping: 'resourceName',
            resourceIDMapping: 'resourceId',
            resources: editingResources,
            highlightWeekends: true,
            timelineSettings: {
                topTier: {
                    unit: 'Week',
                    format: 'MMM dd, y',
                },
                bottomTier: {
                    unit: 'Day',
                },
            },
            labelSettings: {
                leftLabel: 'TaskName',
                rightLabel: 'resources'
            },
            projectStartDate: new Date('03/25/2019'),
            projectEndDate: new Date('07/28/2019')
        });
    gantt.appendTo('#GanttExport');
};
