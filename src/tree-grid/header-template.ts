import { TreeGrid, Page } from '@syncfusion/ej2-treegrid';
import { headerData } from './data-source';

/**
 * Default Grid sample
 */
TreeGrid.Inject(Page);

(window as any).default = (): void => {
    let grid: TreeGrid = new TreeGrid(
        {
            dataSource: headerData,
            childMapping: 'subtasks',
            treeColumnIndex: 0,
            allowPaging: true,
            columns: [
                { field: 'taskName', headerTemplate: '#projectName', width: 220 },
                { field: 'startDate', headerTemplate: '#dateTemplate', format: 'yMd', textAlign: 'Right' },
                { field: 'resourceId', headerTemplate: '#resource', textAlign: 'Right' },
                { field: 'duration', headerTemplate: '#durationTemplate', textAlign: 'Right' },
                { field: 'progress', headerTemplate: '#progressTemplate', textAlign: 'Right' }
            ]
        });
    grid.appendTo('#Grid');
};
