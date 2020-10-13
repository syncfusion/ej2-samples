import { loadCultureFiles } from '../common/culture-loader';
import { TreeGrid, Page } from '@syncfusion/ej2-treegrid';
import { textWrapData } from './data-source';

TreeGrid.Inject(Page);
/**
 * Auto wrap sample
 */
(window as any).default = (): void => {
    loadCultureFiles();
    let grid: TreeGrid = new TreeGrid(
        {
            dataSource: textWrapData,
            allowPaging: true,
            allowTextWrap: true,
            height: 350,
            childMapping: 'subtasks',
            pageSettings: { pageSize: 8 },
            treeColumnIndex: 1,
            columns: [
                { field: 'taskID', headerText: 'Task ID', width: 90, textAlign: 'Right' },
                { field: 'taskName', headerText: 'TaskName', width: 100 },
                { field: 'startDate', headerText: 'Start Date', format: 'yMd', textAlign: 'Right', width: 90},
                { field: 'duration', headerText: 'Duration', textAlign: 'Right', width: 90 },
                { field: 'progress', headerText: 'Progress', textAlign: 'Right', width: 90 },
                { field: 'priority', headerText: 'Priority', width: 90 },
            ],
        });
    grid.appendTo('#Grid');
};

