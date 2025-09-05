import { loadCultureFiles } from '../common/culture-loader';
import { Gantt, ExcelExport, Selection, Toolbar, PdfExport, PdfExportProperties,DayMarkers } from '@syncfusion/ej2-gantt';
import { editingData, editingResources } from './data-source';
import { ClickEventArgs } from '@syncfusion/ej2-navigations';
import { Switch } from '@syncfusion/ej2-buttons';

/**
 * Editing Gantt sample
 */
Gantt.Inject(Selection, Toolbar, ExcelExport, PdfExport, DayMarkers);
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
                parentID: 'ParentId',
                resourceInfo: 'resources'
            },
            columns: [
                { field: 'TaskID', width: 80 },
                { field: 'TaskName', width: 250 }
            ],
            splitterSettings: {
                columnIndex: 2,
            },
            allowExcelExport: true,
            allowPdfExport: true,
            toolbar: ['ExcelExport', 'CsvExport', 'PdfExport'],
            toolbarClick: (args?: ClickEventArgs) => {
                if (args.item.id === 'GanttExport_excelexport') {
                    gantt.excelExport();
                } else if (args.item.id === 'GanttExport_csvexport') {
                    gantt.csvExport();
                } else if (args.item.id === 'GanttExport_pdfexport') {
                    gantt.pdfExport();
                }
            },
            allowSelection: true,
            gridLines: 'Both',
            height: '650px',
            rowHeight:46,
            taskbarHeight:25,
            treeColumnIndex: 1,
            resourceFields: {
                id: 'resourceId',
                name: 'resourceName'
            },
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
                leftLabel: 'TaskName'
            },
            projectStartDate: new Date('03/26/2025'),
            projectEndDate: new Date('09/01/2025'),
        });
    gantt.appendTo('#GanttExport');
};
