import { loadCultureFiles } from '../common/culture-loader';
import { TreeGrid, RowDD, Page, Selection } from '@syncfusion/ej2-treegrid';
import { dragData  } from './data-source';
 
TreeGrid.Inject(Page,Selection,RowDD);
 
/**
* DragAndDrop between two TreeGrid sample
*/
(window as any).default = (): void => {
    loadCultureFiles();
    let treegrid: TreeGrid = new TreeGrid({
        dataSource: dragData,
        treeColumnIndex: 1,
        allowPaging: true,
        pageSettings: { pageCount: 2 },
        childMapping: 'subtasks',
        allowRowDragAndDrop: true,
        rowDropSettings: { targetID: 'destTree' },
        selectionSettings: { type: 'Multiple' },
        columns: [
                { field: 'taskID', headerText: 'Task ID', isPrimaryKey: true, width: 90, textAlign: 'Right' },
                { field: 'taskName', headerText: 'Task Name', width: 190 },
                {
                    field: 'startDate', headerText: 'Start Date', width: 100, textAlign: 'Right', type: 'date',format: 'yMd'
                },
                { field: 'duration', headerText: 'Duration', width: 95, textAlign: 'Right' }
        ]
    });
    treegrid.appendTo('#TreeGrid');
    
    let destTree: TreeGrid = new TreeGrid({
        dataSource: [],
        treeColumnIndex: 1,
        allowPaging: true,
        pageSettings: { pageCount: 2 },
        childMapping: 'subtasks',
        allowRowDragAndDrop: true,
        rowDropSettings: { targetID: 'TreeGrid' },
        selectionSettings: { type: 'Multiple' },
        columns: [
                { field: 'taskID', headerText: 'Task ID', isPrimaryKey: true, width: 90, textAlign: 'Right' },
                { field: 'taskName', headerText: 'Task Name', width: 190 },
                {
                    field: 'startDate', headerText: 'Start Date', width: 100, textAlign: 'Right', type: 'date',format: 'yMd'
                },
                { field: 'duration', headerText: 'Duration', width: 95, textAlign: 'Right' }
        ]
    });
    destTree.appendTo('#destTree');
};
