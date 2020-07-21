import { Grid, Page, Selection } from '@syncfusion/ej2-grids';
import { orderData } from './data-source';

Grid.Inject(Page, Selection);

/**
 * Local Data sample
 */
(window as any).default = (): void => {
    let grid: Grid = new Grid(
        {
            dataSource: orderData,
            allowPaging: true,
            columns: [
                { field: 'OrderID', headerText: 'Order ID', width: 120, textAlign: 'Right' },
                { field: 'CustomerName', headerText: 'Customer Name', width: 150 },
                { field: 'OrderDate', headerText: 'Order Date', width: 130, format: 'yMd', textAlign: 'Right' },
                { field: 'Freight', width: 120, format: 'C2', textAlign: 'Right' },
                { field: 'ShippedDate', headerText: 'Shipped Date', width: 130, format: 'yMd', textAlign: 'Right' },
                { field: 'ShipCountry', headerText: 'Ship Country', width: 150 }
            ],
            pageSettings: { pageCount: 5 }
        });
    grid.appendTo('#Grid');
};