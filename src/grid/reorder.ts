import { loadCultureFiles } from '../common/culture-loader';
import { DropDownList, ChangeEventArgs } from '@syncfusion/ej2-dropdowns';
import { Grid, Selection, Reorder, Column, ActionEventArgs, Sort, Filter, Edit, Toolbar } from '@syncfusion/ej2-grids';
import { employeeData } from './data-source';

Grid.Inject(Selection, Reorder, Sort, Filter, Edit, Toolbar);

/**
 * Reorder Grid sample
 */
(window as any).default = (): void => {
    loadCultureFiles();
    let columnNames: { [key: string]: Object }[] = [
        { id: 'EmployeeID', name: 'Employee ID' },
        { id: 'FirstName', name: 'Name' },
        { id: 'Title', name: 'Title' },
        { id: 'HireDate', name: 'Hire Date' }
    ];
    let columnsIndex: { [key: string]: Object }[] = [
        { id: '0', name: '1' },
        { id: '1', name: '2' },
        { id: '2', name: '3' },
        { id: '3', name: '4' }
    ];

    let grid: Grid = new Grid(
        {
            dataSource: employeeData,
            allowReordering: true,
            allowSorting: true,
            allowFiltering: true,
            filterSettings: { type: 'Excel' },
            toolbar: ['Add', 'Edit', 'Delete', 'Update', 'Cancel'],
            editSettings: { allowAdding: true, allowEditing: true, allowDeleting: true },
            columns: [
                { field: 'EmployeeID', headerText: 'Employee ID', textAlign: 'Right', width: 150, isPrimaryKey: true, validationRules: { required: true, number: true } },
                { field: 'FirstName', headerText: 'Name', width: 125, validationRules: { required: true, minLength: 5 } },
                { field: 'Title', headerText: 'Title', width: 190 },
                {
                    field: 'HireDate', headerText: 'Hire Date', textAlign: 'Right',
                    width: 135, format: { skeleton: 'yMd', type: 'date' }, editType: 'datepickeredit', type:'date'
                }
            ],
            actionComplete: (args: ActionEventArgs) => {
                if (args.requestType === 'reorder') {
                    let columnName: string = <string>dropDownColumn.value;
                    let index: number = grid.getColumnIndexByField(columnName);
                    dropDownIndex.value = index.toString();
                }

            }
        });
    grid.appendTo('#Grid');
    let dropDownColumn: DropDownList = new DropDownList({
        dataSource: columnNames,
        fields: { text: 'name', value: 'id' },
        value: 'EmployeeID',
        change: (e: ChangeEventArgs) => {
            let columnName: string = <string>e.value;
            let index: number = grid.getColumnIndexByField(columnName);
            dropDownIndex.value = index.toString();

        }
    });
    dropDownColumn.appendTo('#columns');

    let dropDownIndex: DropDownList = new DropDownList({
        dataSource: columnsIndex,
        fields: { text: 'name', value: 'id' },
        value: '0',
        change: (e: ChangeEventArgs) => {
            let columnName: string = <string>dropDownColumn.value;
            let toColumnIndex: number = <number>e.value;
            grid.reorderColumns(columnName, (<Column>grid.columns[toColumnIndex]).field);
        }
    });
    dropDownIndex.appendTo('#columnIndex');
};