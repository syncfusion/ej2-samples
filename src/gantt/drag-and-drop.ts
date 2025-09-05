import { loadCultureFiles } from '../common/culture-loader';
import { Gantt, Selection, RowDD, Edit } from '@syncfusion/ej2-gantt';
import { projectNewData } from './data-source';

/**
 * Drag and Drop Gantt sample
 */

Gantt.Inject(Selection, RowDD, Edit);
(window as any).default = (): void => {
    loadCultureFiles();
    let gantt: Gantt = new Gantt(
        {
            dataSource: projectNewData,
            height: '650px',
            rowHeight:46,
            taskbarHeight:25,
            allowRowDragAndDrop: true,
            allowTaskbarDragAndDrop: true,
            treeColumnIndex: 1,
            editSettings: {
                allowAdding: true,
                allowEditing: true,
                allowDeleting: true,
                allowTaskbarEditing: true,
                showDeleteConfirmDialog: true
            },
            splitterSettings: {
                columnIndex: 3
            },
            selectionSettings: {
                type: 'Multiple'
            },
            columns: [
                { field: 'TaskID', headerText: 'ID', width: 80 },
                { field: 'TaskName', headerText: 'Name', width: 250 },
                { field: 'StartDate' },
                { field: 'EndDate' },
                { field: 'Duration' },
                { field: 'Progress' },
                { field: 'Predecessor', headerText: 'Dependency' }
            ],
            taskFields: {
                id: 'TaskID',
                name: 'TaskName',
                startDate: 'StartDate',
                endDate: 'EndDate',
                duration: 'Duration',
                progress: 'Progress',
                dependency: 'Predecessor',
                parentID: 'ParentId'
            },
            labelSettings: {
                leftLabel: 'TaskName'
            },
            projectStartDate: new Date('03/26/2025'),
            projectEndDate: new Date('07/20/2025')
        });
    gantt.appendTo('#DragAndDrop');
};
