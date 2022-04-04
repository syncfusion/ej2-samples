import { loadCultureFiles } from '../common/culture-loader';
import { TreeGrid, Page } from '@syncfusion/ej2-treegrid';
import { headerData } from './data-source';

/**
 * Default Grid sample
 */
TreeGrid.Inject(Page);

(window as any).default = (): void => {
    loadCultureFiles();
    let grid: TreeGrid = new TreeGrid(
        {
            dataSource: headerData,
            childMapping: 'subtasks',
            height: 350,
            treeColumnIndex: 0,
            allowPaging: true,
            columns: [
                { field: 'taskName', headerTemplate: '#projectName', width: 220 },
                { field: 'startDate', headerTemplate: '#dateTemplate', format: 'yMd',textAlign: 'Center'},
                { field: 'resourceId', headerTemplate: '#resource', textAlign: 'Center' },
                { field: 'duration', headerTemplate: '#durationTemplate', textAlign: 'Center' },
                { field: 'progress', headerTemplate: '#progressTemplate', textAlign: 'Center' }
            ]
        });
    grid.appendTo('#TreeGrid');
};
