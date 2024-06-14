import { loadCultureFiles } from '../common/culture-loader';
import { Grid, Page, Selection, DetailRow, Sort, Filter } from '@syncfusion/ej2-grids';
import { DataManager, ODataV4Adaptor } from '@syncfusion/ej2-data';
import { employeeData } from './data-source';

Grid.Inject(Page, Selection, DetailRow, Sort, Filter);
/**
 * Hierarchy Grid Sample
 */
(window as any).default = (): void => {
    loadCultureFiles();
    let dataManger: Object = new DataManager({
        url: 'https://services.odata.org/V4/Northwind/Northwind.svc/Orders',
        adaptor: new ODataV4Adaptor,
        crossDomain: true
    });
    let dataManger2: Object = new DataManager({
        url: 'https://services.odata.org/V4/Northwind/Northwind.svc/Customers',
        adaptor: new ODataV4Adaptor,
        crossDomain: true
    });

    let grid: Grid = new Grid({
        dataSource: employeeData,
        allowSorting: true,
        allowFiltering: true,
        filterSettings: { type: 'Excel' },
        columns: [
            { field: 'EmployeeID', headerText: 'Employee ID', textAlign: 'Right', width: 125 },
            { field: 'FirstName', headerText: 'Name', width: 125 },
            { field: 'Title', headerText: 'Title', width: 180 },
            { field: 'City', headerText: 'City', width: 110 },
            { field: 'Country', headerText: 'Country', width: 110 }
        ],
        childGrid: {
            dataSource: dataManger,
            queryString: 'EmployeeID',
            allowPaging: true,
            columns: [
                { field: 'OrderID', headerText: 'Order ID', textAlign: 'Right', width: 120 },
                { field: 'ShipCity', headerText: 'Ship City', width: 120 },
                { field: 'Freight', headerText: 'Freight', width: 120 },
                { field: 'ShipName', headerText: 'Ship Name', width: 150 }
            ],
            childGrid: {
                dataSource: dataManger2,
                queryString: 'CustomerID',
                columns: [
                    { field: 'CustomerID', headerText: 'Customer ID', textAlign: 'Right', width: 75 },
                    { field: 'Phone', headerText: 'Phone', width: 100 },
                    { field: 'Address', headerText: 'Address', width: 120 },
                    { field: 'Country', headerText: 'Country', width: 100 }
                ]
            },

        },
    });
    grid.appendTo('#Grid');
};