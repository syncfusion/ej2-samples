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
                { field: 'FirstName', headerText: 'First Name', width: 140 },
                {
                    field: 'BirthDate', headerText: 'Birth Date', width: 130, format: 'yMd',
                    textAlign: 'right', headerTemplate: '#datetemplate'
                },
                { field: 'City', width: 120 },
                { field: 'Country', headerText: 'Country', width: 140, format: 'yMd', textAlign: 'right' },
            ]
        });
    grid.appendTo('#Grid');
};
