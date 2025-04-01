import { loadCultureFiles } from '../common/culture-loader';
import { TreeGrid, Toolbar, Edit, Column } from '@syncfusion/ej2-treegrid';
import { sampleData } from './data-source';
import { DropDownList, ChangeEventArgs, AutoComplete } from '@syncfusion/ej2-dropdowns';

TreeGrid.Inject(Toolbar, Edit);
/**
 * Auto wrap sample
 */
(window as any).default = (): void => {
    loadCultureFiles();
    let elem: HTMLElement;
    let autoCompleteObj: AutoComplete;
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
                mode: 'Row',
                newRowPosition: 'Below'

            },
            toolbar: ['Add', 'Edit', 'Delete', 'Update', 'Cancel'],
            columns: [
                {
                    field: 'taskID', headerText: 'Task ID', isPrimaryKey: true, textAlign: 'Right',
                    validationRules: { required: true, number: true }, width: 80
                },
                { field: 'taskName', headerText: 'Task Name', editType: 'stringedit', validationRules: { required: true }, edit: {
                    create: () => {
                        elem = document.createElement('input');
                        return elem;
                    },
                    read: () => {
                        return autoCompleteObj.value;
                    },
                    destroy: () => {
                        autoCompleteObj.destroy();
                    },
                    write: (args: { rowData: Object, column: Column }) => {
                        autoCompleteObj = new AutoComplete({
                            dataSource: <{key: string, value: any}[]>grid.grid.dataSource,
                            fields: { value: 'taskName' },
                            value: args.rowData[args.column.field]
                        });
                        autoCompleteObj.appendTo(elem);
                    }
                },
                width: 200  },
                { field: 'startDate', headerText: 'Start Date', textAlign: 'Right', width: 155, editType: 'datepickeredit',
                  format: 'yMd', edit: { params: { format:'M/d/yyyy'}}, validationRules: { date: ['M/d/yyyy', 'Please enter a valid date'] } },
                {
                    field: 'duration', headerText: 'Duration', textAlign: 'Right', width: 140, editType: 'numericedit',
                     validationRules: { number: true, min: 0 }, edit: { params: {  format: 'n'}}
                },
                {
                    field: 'progress', headerText: 'Progress', textAlign: 'Right', width: 150,
                    editType: 'numericedit', validationRules: { number: true, min: 0 }, edit: { params: {  format: 'n'}}
                },
                {
                    field: 'priority', headerText: 'Priority', width: 130,
                    editType: 'stringedit', validationRules: { required: true }
                }
            ]
        });
    grid.appendTo('#Grid');

    let dropDownColumns: DropDownList = new DropDownList({
        dataSource: [{ id: 'CellEditing', name: 'Cell Editing' }, {id: 'RowEditing', name: 'Row Editing'}],
        fields: { text: 'name', value: 'id' },
        value: 'CellEditing',
        change: (e: ChangeEventArgs) => {
            grid.editSettings.mode = e.value === 'CellEditing' ? 'Cell' : 'Row';
        }
    });
    dropDownColumns.appendTo('#editmodes');
};

