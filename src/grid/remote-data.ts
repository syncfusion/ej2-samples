import { loadCultureFiles } from '../common/culture-loader';
import { Grid, Page, Selection } from '@syncfusion/ej2-grids';
import { DataManager, WebApiAdaptor } from '@syncfusion/ej2-data';

Grid.Inject(Page, Selection);

/**
 * RemoteData sample
 */
(window as any).default = (): void => {
    loadCultureFiles();
    let hostUrl: string = 'https://services.syncfusion.com/js/production/api/orders';
    let data: Object = new DataManager({
        url: hostUrl,
        adaptor: new WebApiAdaptor ,
        crossDomain: true
    });
    let grid: Grid = new Grid(
        {
            dataSource: data,
            allowPaging: true,
            columns: [
                { field: 'OrderID', headerText: 'Order ID', width: 130, textAlign: 'Right' },
                { field: 'CustomerID', headerText: 'Customer ID', width: 170 },
                { field: 'EmployeeID', headerText: 'Employee ID', width: 135, textAlign: 'Right' },
                { field: 'Freight', headerText: 'Freight', width: 160, textAlign: 'Right', format: 'C2' },
                { field: 'ShipCountry', headerText: 'Ship Country', width: 150, textAlign: 'Center' },
            ]
        });
    grid.appendTo('#Grid');
};

