import { Grid } from '@syncfusion/ej2-grids';
import { Query, DataManager } from '@syncfusion/ej2-data';
import { employeeData } from './datasource';

/**
 * Default Grid sample
 */
this.default = (): void => {
    let data: Object = new DataManager(employeeData).executeLocal(new Query().take(15));
    let grid: Grid = new Grid(
        {
            dataSource: data,
            columns: [
                { field: 'EmployeeID', headerText: 'Employee ID', width: 120, textAlign: 'right', headerTemplate: '#employeetemplate' },
                { field: 'FirstName', headerText: 'Name', width: 140 },
                { field: 'Title', headerText: 'Title', width: 170 },
                {
                    field: 'HireDate', headerText: 'Hire Date', width: 130, format: 'yMd',
                    textAlign: 'right', headerTemplate: '#datetemplate'
                },
                { field: 'ReportsTo', headerText: 'Reports To', width: 120, textAlign: 'right' }
            ]
        });
    grid.appendTo('#Grid');
};
