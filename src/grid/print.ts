import { loadCultureFiles } from '../common/culture-loader';
import { Grid, Sort, DetailRow, Toolbar, HierarchyGridPrintMode } from '@syncfusion/ej2-grids';
import { employeeData, customerData, hierarchyOrderdata } from './data-source';
import { DropDownList, ChangeEventArgs } from '@syncfusion/ej2-dropdowns';

Grid.Inject(Sort, DetailRow, Toolbar);
/**
 * Print Grid sample
 */
(window as any).default = (): void => {
    loadCultureFiles();

    let hierarchyPrintModes: string[] = ['Expanded', 'All', 'None'];

    let dropdown: DropDownList = new DropDownList({
        dataSource: hierarchyPrintModes,
        value: 'All',
        change: (e: ChangeEventArgs) => {
            grid.hierarchyPrintMode = grid.childGrid.hierarchyPrintMode = e.value as HierarchyGridPrintMode;
        }
    });
    dropdown.appendTo('#dropdown');

    let grid: Grid = new Grid({
        dataSource: employeeData,
        hierarchyPrintMode: 'All',
        allowSorting: true,
        toolbar: [ 'Print'],
        columns: [
            { field: 'EmployeeID', headerText: 'Employee ID', textAlign: 'Right', width: 125 },
            { field: 'FirstName', headerText: 'Name', width: 125 },
            { field: 'Title', headerText: 'Title', width: 180 },
            { field: 'City', headerText: 'City', width: 110 }
        ],
        childGrid: {
            dataSource: hierarchyOrderdata,
            queryString: 'EmployeeID',
            hierarchyPrintMode: 'All',
            columns: [
                { field: 'OrderID', headerText: 'Order ID', textAlign: 'Right', width: 120 },
                { field: 'ShipCity', headerText: 'Ship City', width: 120 },
                { field: 'Freight', headerText: 'Freight', width: 120, format: 'C2'},
                { field: 'ShipName', headerText: 'Ship Name', width: 150 }
            ],
            childGrid: {
                dataSource: customerData,
                queryString: 'CustomerID',
                columns: [
                    { field: 'CustomerID', headerText: 'Customer ID', textAlign: 'Right', width: 75 },
                    { field: 'Phone', headerText: 'Phone', width: 100 },
                    { field: 'Address', headerText: 'Address', width: 120 },
                    { field: 'Country', headerText: 'Country', width: 100 }
                ]
            }
        }
    });
    grid.appendTo('#Grid');
};