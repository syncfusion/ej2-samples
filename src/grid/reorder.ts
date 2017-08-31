import { Grid, Selection, Reorder, Column, ActionEventArgs } from '@syncfusion/ej2-grids';
import { employeeData } from './datasource';

Grid.Inject(Selection, Reorder);

/**
 * Reorder Grid sample
 */
this.default = (): void => {
    let grid: Grid = new Grid(
        {
            dataSource: employeeData,
            allowReordering: true,
            columns: [
                { field: 'EmployeeID', headerText: 'Employee ID', textAlign: 'right', width: 140 },
                { field: 'FirstName', headerText: 'Name', width: 125 },
                { field: 'Title', headerText: 'Title', width: 190 },
                {
                    field: 'HireDate', headerText: 'Hire Date', textAlign: 'right',
                    width: 135, format: { skeleton: 'yMd', type: 'date' }
                }
            ],
            actionComplete: (args: ActionEventArgs) => {
                if (args.requestType === 'reorder') {
                    let columnName: string = (document.getElementById('columns') as HTMLSelectElement).value;
                    let index: number = grid.getColumnIndexByField(columnName);
                    (document.getElementById('columnIndex') as HTMLSelectElement).value = index.toString();
                }

            }
        });
    grid.appendTo('#Grid');
    document.getElementById('columns').onchange = () => {
        let columnName: string = (document.getElementById('columns') as HTMLSelectElement).value;
        let index: number = grid.getColumnIndexByField(columnName);
        (document.getElementById('columnIndex') as HTMLSelectElement).value = index.toString();
    };
    document.getElementById('columnIndex').onchange = () => {
        let columnName: string = (document.getElementById('columns') as HTMLSelectElement).value;
        let toColumnIndex: number = parseInt((document.getElementById('columnIndex') as HTMLSelectElement).value, 10);
        grid.reorderColumns(columnName, (<Column>grid.columns[toColumnIndex]).field);
    };
};