import { Grid, Selection, GridLine } from '@syncfusion/ej2-grids';
import { employeeData } from './datasource';

Grid.Inject(Selection);

/**
 * Grid Lines sample
 */
this.default = (): void => {
    let grid: Grid = new Grid(
        {
            dataSource: employeeData,
            gridLines: 'default',
            columns: [
                { field: 'EmployeeID', headerText: 'Employee ID', textAlign: 'right', width: 140 },
                { field: 'FirstName', headerText: 'Name', width: 125 },
                { field: 'Title', headerText: 'Title', width: 180 },
                {
                    field: 'HireDate', headerText: 'Hire Date', textAlign: 'right',
                    width: 135, format: { skeleton: 'yMd', type: 'date' }
                }
            ]
        });
    grid.appendTo('#Grid');

    document.getElementById('ddl').onchange = () => {
        let ddl: HTMLSelectElement = document.getElementById('ddl') as HTMLSelectElement;
        grid.gridLines = <GridLine>ddl.value;
        grid.refresh();
    };
};
