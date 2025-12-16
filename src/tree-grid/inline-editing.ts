import { TreeGrid, Toolbar, Edit, RowDD } from '@syncfusion/ej2-treegrid';
import { sampleData } from './data-source';
import { DropDownList, ChangeEventArgs } from '@syncfusion/ej2-dropdowns';

TreeGrid.Inject(Toolbar, Edit, RowDD);
/**
 * Auto wrap sample
 */
(window as any).default = (): void => {
    let treegrid: TreeGrid = new TreeGrid(
        {
            dataSource: sampleData,
            childMapping: 'subtasks',
            treeColumnIndex: 1,
            height: 400,
            editSettings: {
                allowAdding: true,
                allowEditing: true,
                allowDeleting: true,
                mode: 'Cell',
                newRowPosition: 'Below'

            },
            toolbar: ['Add', 'Delete', 'Update', 'Cancel', 'Indent', 'Outdent'],
            columns: [
                {
                    field: 'taskID', headerText: 'Task ID', isPrimaryKey: true, textAlign: 'Right',
                    validationRules: { required: true, number: true}, width: 140
                },
                { field: 'taskName', headerText: 'Task Name', editType: 'stringedit', width: 220, validationRules: {required: true} },
                { field: 'startDate', headerText: 'Start Date', textAlign: 'Right', width: 130, editType: 'datepickeredit',
                  format: 'yMd', validationRules: { date: true} },
                {
                    field: 'duration', headerText: 'Duration', textAlign: 'Right', width: 140, editType: 'numericedit',
                    validationRules: { number: true, min: 0}, edit: { params: {  format: 'n'}}
                }
            ]
        });
    treegrid.appendTo('#TreeGrid');

    let dropDownColumns: DropDownList = new DropDownList({
        dataSource: [{ id: 'CellEditing', name: 'Cell Editing' }, {id: 'RowEditing', name: 'Row Editing'}],
        fields: { text: 'name', value: 'id' },
        value: 'CellEditing',
        width: 140,
        change: (e: ChangeEventArgs) => {
            if (e.value === 'CellEditing') {
                treegrid.editSettings.mode = 'Cell';
                treegrid.toolbar = ['Add', 'Delete', 'Update', 'Cancel', 'Indent', 'Outdent'];
            } else {
                treegrid.editSettings.mode = 'Row';
                treegrid.toolbar = ['Add', 'Edit', 'Delete', 'Update', 'Cancel', 'Indent', 'Outdent'];
            }
        }
    });
    dropDownColumns.appendTo('#editmodes');
};

