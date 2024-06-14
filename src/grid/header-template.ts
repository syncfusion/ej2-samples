import { loadCultureFiles } from '../common/culture-loader';
import { Grid, Sort, Filter, Edit, Toolbar } from '@syncfusion/ej2-grids';
import { Query, DataManager } from '@syncfusion/ej2-data';
import { employeeData } from './data-source';

Grid.Inject(Sort, Filter, Edit, Toolbar);
/**
 * Default Grid sample
 */
(window as any).default = (): void => {
    loadCultureFiles();
    let data: Object = new DataManager(employeeData as JSON[]).executeLocal(new Query().take(15));
    let grid: Grid = new Grid(
        {
            dataSource: data,
            allowSorting: true,
            allowFiltering: true,
            filterSettings: { type: 'Excel' },
            toolbar: ['Add', 'Edit', 'Delete', 'Update', 'Cancel'],
            editSettings: { allowAdding: true, allowEditing: true, allowDeleting: true },
            columns: [
                { field: 'EmployeeID', headerText: 'Employee ID', width: 120, textAlign: 'Right', headerTemplate: '#employeetemplate', isPrimaryKey: true, validationRules: { required: true, number: true } },
                { field: 'FirstName', headerText: 'Name', width: 140, validationRules: { required: true, minLength: 5 } },
                { field: 'Title', headerText: 'Title', width: 170 },
                {
                    field: 'HireDate', headerText: 'Hire Date', width: 130, format: 'yMd',
                    textAlign: 'Right', headerTemplate: '#datetemplate', editType: 'datepickeredit'
                },
                { field: 'ReportsTo', headerText: 'Reports To', width: 120, textAlign: 'Right' }
            ]
        });
    grid.appendTo('#Grid');
};
