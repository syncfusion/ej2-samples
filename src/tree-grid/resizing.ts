import { loadCultureFiles } from '../common/culture-loader';
import { TreeGrid, Page, Resize } from '@syncfusion/ej2-treegrid';
import { sampleData } from './data-source';

/**
 * Default TreeGrid sample
 */
TreeGrid.Inject(Page, Resize);

(window as any).default = (): void => {
    loadCultureFiles();
    let treegrid: TreeGrid = new TreeGrid(
        {
            dataSource: sampleData,
            childMapping: 'subtasks',
            allowPaging: true,
            pageSettings: {pageSize: 10},
            allowResizing: true,
            treeColumnIndex: 1,
            columns: [
                { field: 'taskID', headerText: 'Task ID', textAlign: 'Right', width: 100 },
                { field: 'taskName', headerText: 'Task Name', width: 220, minWidth: 120, maxWidth: 300 },
                { field: 'startDate', headerText: 'Start Date', textAlign: 'Right', width: 135, format: { skeleton: 'yMd', type: 'date' }},
                { field: 'endDate', headerText: 'End Date', textAlign: 'Right', width: 135, format: { skeleton: 'yMd', type: 'date' }},
                { field: 'duration', headerText: 'Duration', textAlign: 'Right', allowResizing: false, width: 120 },
                { field: 'progress', headerText: 'Progress', textAlign: 'Right', width: 120 },
                { field: 'priority', headerText: 'Priority', textAlign: 'Left', width: 135 },
            ]
        });
    treegrid.appendTo('#TreeGrid');
};
