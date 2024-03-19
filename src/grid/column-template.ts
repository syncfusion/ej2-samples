import { loadCultureFiles } from '../common/culture-loader';
import { Grid, Selection, Sort } from '@syncfusion/ej2-grids';
import { employeeData } from './data-source';
import { Query, DataManager } from '@syncfusion/ej2-data';

Grid.Inject(Selection, Sort);
/**
 * column template sample
 */
(window as any).default = (): void => {
    loadCultureFiles();
    let grid: Grid = new Grid({
        dataSource: new DataManager(employeeData as JSON[]).executeLocal(new Query().take(8)),
        allowSorting: true,
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