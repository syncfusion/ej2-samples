import { loadCultureFiles } from '../common/culture-loader';
import { TreeGrid, Page } from '@syncfusion/ej2-treegrid';
import { sampleData } from './data-source';

/**
 * CheckBox Selection TreeGrid sample
 */
TreeGrid.Inject(Page);

(window as any).default = (): void => {
    loadCultureFiles();
    let treegrid: TreeGrid = new TreeGrid(
        {
            dataSource: sampleData,
            childMapping: 'subtasks',
            height: 350,
            treeColumnIndex: 2,
            allowPaging: true,
            allowSelection: true,
            selectionSettings: { persistSelection: true },
            columns: [
                { type: 'checkbox', width: 50 },
                { field: 'taskID', headerText: 'Task ID', isPrimaryKey: true, width: 70, textAlign: 'Right' },
                { field: 'taskName', headerText: 'Task Name', width: 180, textAlign: 'Left' },
                { field: 'startDate', headerText: 'Start Date', width: 90, textAlign: 'Right', type: 'date', format: 'yMd' },
                { field: 'duration', headerText: 'Duration', width: 80, textAlign: 'Right' },
                { field: 'progress', headerText: 'Progress', width: 80, textAlign: 'Right' },
                { field: 'priority', headerText: 'Priority', width: 90 }
            ]
        });
    treegrid.appendTo('#TreeGrid');
};
