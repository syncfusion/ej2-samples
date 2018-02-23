import { Grid, Selection, Resize } from '@syncfusion/ej2-grids';
import { orderDetails } from './datasource';

Grid.Inject(Selection, Resize);

/**
 * Column resize Grid sample
 */
this.default = (): void => {
    let grid: Grid = new Grid(
        {
            dataSource: orderDetails,
            allowResizing: true,
            height: 400,
            columns: [
                { field: 'OrderID', headerText: 'Order ID', minWidth: 120, width: 200, maxWidth: 300, textAlign: 'Right' },
                { field: 'CustomerName', headerText: 'Customer Name', minWidth: 8, width: 200 },
                { field: 'OrderDate', headerText: 'Order Date', width: 200, minWidth: 8, format: 'yMd', textAlign: 'Right' },
                { field: 'Freight', width: 150, format: 'C2', minWidth: 8, textAlign: 'Right' },
                { field: 'ShipName', headerText: 'Ship Name', minWidth: 8, width: 300 },
                {
                    field: 'ShippedDate', headerText: 'Shipped Date', minWidth: 8,
                    width: 200, format: 'yMd', textAlign: 'Right', allowResizing: false
                },
                { field: 'ShipCountry', headerText: 'Ship Country', minWidth: 8, width: 200 },
                { field: 'ShipCity', headerText: 'Ship City', minWidth: 8, width: 200 }
            ]
        });
    grid.appendTo('#Grid');
};
