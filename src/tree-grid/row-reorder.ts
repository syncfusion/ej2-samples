import { loadCultureFiles } from '../common/culture-loader';
import { TreeGrid, RowDD, Selection} from '@syncfusion/ej2-treegrid';
import { dragData } from './data-source';

TreeGrid.Inject(RowDD, Selection);

/**
 * Reorder TreeGrid sample
 */
(window as any).default = (): void => {
    loadCultureFiles();

    let treegrid: TreeGrid = new TreeGrid(
        {
            dataSource: dragData,
            allowRowDragAndDrop: true,
            childMapping: 'subtasks',
            height: '400',
            allowSelection: true,
            selectionSettings: { type: 'Multiple' },
            treeColumnIndex: 1,
            columns: [
                { field: 'taskID', headerText: 'Task ID', isPrimaryKey: true, textAlign: 'Right', width: 100 },
                { field: 'taskName', headerText: 'Task Name', width: 250 },
                { field: 'startDate', headerText: 'Start Date', textAlign: 'Right', width: 135, format: { skeleton: 'yMd', type: 'date' }},
                { field: 'endDate', headerText: 'End Date', textAlign: 'Right', width: 135, format: { skeleton: 'yMd', type: 'date' }},
                { field: 'duration', headerText: 'Duration', textAlign: 'Right', width: 120 },
                { field: 'progress', headerText: 'Progress', textAlign: 'Right', width: 120 },
                { field: 'priority', headerText: 'Priority', textAlign: 'Left', width: 135 },
            ],
        });
    treegrid.appendTo('#TreeGrid');
};