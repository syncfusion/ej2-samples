import { loadCultureFiles } from '../common/culture-loader';
import { TreeGrid, Page} from '@syncfusion/ej2-treegrid';
import { sampleData } from './data-source';

TreeGrid.Inject( Page );

/**
 * Search TreeGrid sample
 */
(window as any).default = (): void => {
    loadCultureFiles();
    let grid: TreeGrid = new TreeGrid(
        {
            dataSource: sampleData,
            allowPaging: true,
            childMapping: 'subtasks',
            treeColumnIndex: 1,
            columns: [
                { field: 'taskID', headerText: 'Task ID', width: 70, textAlign: 'Right' },
                { field: 'taskName', headerText: 'Task Name', width: 200, textAlign: 'Left' },
                { field: 'startDate', headerText: 'Start Date', width: 90, textAlign: 'Right', type: 'date', format: 'yMd' },
                { field: 'endDate', headerText: 'End Date', width: 90, textAlign: 'Right', type: 'date', format: 'yMd' },
                { field: 'duration', headerText: 'Duration', width: 80, textAlign: 'Right' },
                { field: 'progress', headerText: 'Progress', width: 80, textAlign: 'Right' },
                { field: 'priority', headerText: 'Priority', width: 90 }
            ],
            pageSettings: { pageSize: 10, pageCount: 2, pageSizes: true }
        });
    grid.appendTo('#TreeGrid');
};
