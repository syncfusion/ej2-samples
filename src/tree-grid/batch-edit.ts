import { loadCultureFiles } from '../common/culture-loader';
import { TreeGrid, Toolbar, Edit } from '@syncfusion/ej2-treegrid';
import { sampleData } from './data-source';

TreeGrid.Inject(Toolbar, Edit);
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
            height: 400,
            editSettings: {
                allowAdding: true,
                allowEditing: true,
                allowDeleting: true,
                mode: 'Batch',
                newRowPosition: 'Below'

            },
            toolbar: ['Add', 'Delete', 'Update', 'Cancel'],
            columns: [
                {
                    field: 'taskID', headerText: 'Task ID', isPrimaryKey: true, textAlign: 'Right',
                    validationRules: { required: true, number: true}, width: 90
                },
                { field: 'taskName', headerText: 'Task Name', editType: 'stringedit', width: 220, validationRules: {required: true} },
                { field: 'startDate', headerText: 'Start Date', textAlign: 'Right', width: 130, editType: 'datepickeredit',
                  format: 'yMd', validationRules: { date: true} },
                {
                    field: 'duration', headerText: 'Duration', textAlign: 'Right', width: 140, editType: 'numericedit',
                    validationRules: { number: true, min: 0}, edit: { params: {  format: 'n'}}
                },
                {
                    field: 'progress', headerText: 'Progress', textAlign: 'Right', width: 150,
                    editType: 'numericedit', validationRules: { number: true, min: 0 }, edit: { params: {  format: 'n'}}
                },
                {
                    field: 'priority', headerText: 'Priority', width: 90,
                    editType: 'stringedit', validationRules: { required: true }
                }
            ]
        });
    grid.appendTo('#TreeGrid');
};

