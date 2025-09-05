import { loadCultureFiles } from '../common/culture-loader';
import { Gantt, Sort, DayMarkers, Selection  } from '@syncfusion/ej2-gantt';
import { editingData } from './data-source';

/**
 * Sorting Gantt sample
 */

Gantt.Inject(Sort, DayMarkers, Selection );
(window as any).default = (): void => {
    loadCultureFiles();
    let gantt: Gantt = new Gantt(
        {
            dataSource: editingData,
            height: '650px',
            rowHeight:46,
            taskbarHeight:25,
            highlightWeekends: true,
            allowSelection: true,
            allowSorting: true,
            treeColumnIndex: 1,
            selectedRowIndex: 0,
            taskFields: {
                id: 'TaskID',
                name: 'TaskName',
                startDate: 'StartDate',
                endDate: 'EndDate',
                duration: 'Duration',
                progress: 'Progress',
                dependency: 'Predecessor',
                parentID:'ParentId'
            },
            columns: [
                { field: 'TaskID' , visible:false},
                { field: 'TaskName', width: 250 },
                { field: 'StartDate' },
                { field: 'EndDate' },
                { field: 'Duration' },
                { field: 'Progress' },
            ],
            labelSettings: {
                leftLabel: 'TaskName'
            },
            splitterSettings: {
                columnIndex: 2
            },
            sortSettings: { columns: [{ field: 'TaskName', direction: 'Ascending' }, { field: 'TaskID', direction: 'Ascending' }] },
            projectStartDate: new Date('03/26/2025'),
            projectEndDate: new Date('09/01/2025'),
        });
    gantt.appendTo('#Sorting');
};
