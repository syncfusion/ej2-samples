import { loadCultureFiles } from '../common/culture-loader';
import { TreeGrid, Page, Edit } from '@syncfusion/ej2-treegrid';
import { sampleData } from './data-source';

TreeGrid.Inject(Page, Edit);
/**
 * Auto wrap sample
 */
(window as any).default = (): void => {
    loadCultureFiles();
    let grid: TreeGrid = new TreeGrid(
        {
            dataSource: sampleData,
            childMapping: 'subtasks',
            treeColumnIndex: 1,
            height: 900,
            editSettings: { allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Row' },
            columns: [
                { field: 'taskID', headerText: 'Task ID', isPrimaryKey: true, width: 90, textAlign: 'Right' },
                { field: 'taskName', headerText: 'TaskName', textAlign: 'Left', width: 240, validationRules: { required: true } },
                { field: 'startDate', headerText: 'Start Date', format: 'yMd', textAlign: 'Right', editType: 'datepickeredit', width: 105 },
                { field: 'duration', headerText: 'Duration', width: 120, textAlign: 'Right',
                    editType: 'numericedit', edit: { params: {  format: 'n'}}
                },
                { field: 'progress', headerText: 'Progress', width: 130, textAlign: 'Right',
                    editType: 'numericedit', edit: { params: {  format: 'n'}}
                },
            ],
            pageSettings: { pageCount: 5 }
        });
    grid.appendTo('#Grid');
};

