import { TreeGrid, Toolbar, Edit } from '@syncfusion/ej2-treegrid';
import { sampleData } from './data-source';

TreeGrid.Inject(Toolbar, Edit);
/**
 * Auto wrap sample
 */
(window as any).default = (): void => {
    let grid: TreeGrid = new TreeGrid(
        {
            dataSource: sampleData,
            childMapping: 'subtasks',
            treeColumnIndex: 1,
            height: 400,
            clipMode: 'EllipsisWithTooltip',
            editSettings: {
                allowAdding: true,
                allowEditing: true,
                allowDeleting: true,
                showDeleteConfirmDialog: true,
                mode: 'Row',
                newRowPosition: 'Above'

            },
            toolbar: ['Add', 'Edit', 'Delete', 'Update', 'Cancel'],
            columns: [
                {
                    field: 'taskID', headerText: 'Task ID', isPrimaryKey: true, textAlign: 'Right',
                    validationRules: { required: true, number: true }, width: 90
                },
                {
                    field: 'taskName', headerText: 'Task Name', editType: 'stringedit',
                    validationRules: { required: true }, width: 170
                },
                {
                    field: 'startDate', headerText: 'Start Date', textAlign: 'Right', width: 180,
                    editType: 'datetimepickeredit', edit: { params: { format: 'M/d/y hh:mm a' } },
                    format: { format: 'M/d/y hh:mm a', type: 'dateTime' }, validationRules: { date: ['M/d/y hh:mm a','Please enter a valid date'] }
                },
                {
                    field: 'approved', headerText: 'Approved', width: 80, editType: 'booleanedit',
                    type: 'boolean', displayAsCheckBox: true
                },
                {
                    field: 'progress', headerText: 'Progress', textAlign: 'Right', width: 150,
                    editType: 'numericedit', validationRules: { number: true, min: 0 }, edit: { params: { format: 'n' } }
                },
                { field: 'priority', headerText: 'Priority', width: 150, editType: 'dropdownedit', validationRules: { required: true } }
            ]
        });
    grid.appendTo('#Grid');
};

