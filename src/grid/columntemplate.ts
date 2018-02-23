import { Grid, Selection } from '@syncfusion/ej2-grids';
import { employeeData } from './datasource';
import { Query, DataManager } from '@syncfusion/ej2-data';

Grid.Inject(Selection);
/**
 * column template sample
 */
this.default = (): void => {
    let grid: Grid = new Grid({
        dataSource: new DataManager(employeeData as JSON[]).executeLocal(new Query().take(8)),
        columns: [
            {
                headerText: 'Employee Image', textAlign: 'Center',
                template: '#template', width: 180
            },
            { field: 'EmployeeID', headerText: 'Employee ID', textAlign: 'Right', width: 125 },
            { field: 'FirstName', headerText: 'Name', width: 120 },
            { field: 'Title', headerText: 'Title', width: 170 },
            {
                field: 'HireDate', headerText: 'Hire Date', textAlign: 'Right',
                width: 135, format: { skeleton: 'yMd', type: 'date' }
            },
            { field: 'ReportsTo', headerText: 'Reports To', width: 120, textAlign: 'Right' }
        ],
        width: 'auto',
        height: 359
    });
    grid.appendTo('#Grid');
};