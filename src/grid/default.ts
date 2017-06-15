import { Grid, Selection } from '@syncfusion/ej2-grids';
import { Query, DataManager } from '@syncfusion/ej2-data';
import { orderData } from './datasource';

Grid.Inject(Selection);

/**
 * Default Grid sample
 */
this.default = (): void => {
    let data: Object = new DataManager(orderData).executeLocal(new Query().take(15));
    let grid: Grid = new Grid(
        {
            dataSource: data,
            columns: [
                { field: 'OrderID', headerText: 'Order ID', width: 120, textAlign: 'right' },
                { field: 'CustomerName', headerText: 'Customer Name', width: 150 },
                { field: 'OrderDate', headerText: 'Order Date', width: 130, format: 'yMd', textAlign: 'right' },
                { field: 'Freight', width: 120, format: 'C2', textAlign: 'right' },
                { field: 'ShippedDate', headerText: 'Shipped Date', width: 140, format: 'yMd', textAlign: 'right' },
                { field: 'ShipCountry', headerText: 'Ship Country', width: 150 }
            ]
        });
    grid.appendTo('#Grid');
};
