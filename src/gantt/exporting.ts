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
                child: 'subtasks',
                resourceInfo: 'resources'
            },
            eventMarkers: [
                {
                    day: new Date('04/02/2024'),
                }, {
                    day: new Date('04/09/2024'),
                    label: 'Research phase'
                }, {
                    day: new Date('04/30/2024'),
                    label: 'Design phase'
                }, {
                    day: new Date('05/23/2024'),
                    label: 'Production phase'
                }, {
                    day: new Date('06/20/2024'),
                    label: 'Sales and marketing phase'
                }
            ],
            holidays: [
                {
                    from: new Date('04/04/2024'),
                    to: new Date('04/04/2024'),
                    label: 'Local Holiday'
                }, {
                    from: new Date('04/19/2024'),
                    to: new Date('04/19/2024'),
                    label: 'Good Friday'
                }, {
                    from: new Date('04/30/2024'),
                    to: new Date('04/30/2024'),
                    label: 'Release Holiday'
                },
            ],
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
            height: '445px',
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
            projectStartDate: new Date('03/25/2024'),
            projectEndDate: new Date('07/28/2024')
        });
    gantt.appendTo('#GanttExport');
};
