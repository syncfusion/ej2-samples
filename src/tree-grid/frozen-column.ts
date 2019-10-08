import { loadCultureFiles } from '../common/culture-loader';
import { TreeGrid, Freeze, Sort, Selection } from '@syncfusion/ej2-treegrid';
import { sampleData } from './data-source';

TreeGrid.Inject(Freeze, Sort, Selection);

/**
 * TreeGrid frozen columns sample
 */
(window as any).default = (): void => {
    loadCultureFiles();
    let treegrid: TreeGrid = new TreeGrid(
        {
            dataSource: sampleData,
            frozenColumns: 2,
            height: 410,
            childMapping: 'subtasks',
            treeColumnIndex: 1,
            allowSorting: true,
            allowSelection: false,
            columns: [
                { field: 'taskID', headerText: 'Task ID', textAlign: 'Right', width: 100 },
                { field: 'taskName', headerText: 'Task Name', width: 260 },
                { field: 'startDate', headerText: 'Start Date', width: 230, textAlign: 'Right',
                    type: 'date', format: { type: 'dateTime', format: 'dd/MM/yyyy' } },
                { field: 'endDate', headerText: 'End Date', width: 230, textAlign: 'Right',
                    type: 'date', format: { type: 'dateTime', format: 'dd/MM/yyyy' } },
                { field: 'duration', headerText: 'Duration', textAlign: 'Right', width: 210 },
                { field: 'progress', headerText: 'Progress', textAlign: 'Right', width: 210 },
                { field: 'priority', headerText: 'Priority', textAlign: 'Left', width: 230 },
                { field: 'approved', headerText: 'Approved', width: 230, textAlign: 'Left' }
            ]
        });
    treegrid.appendTo('#TreeGrid');
};