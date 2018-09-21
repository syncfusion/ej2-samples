import { Grid, Page, Selection } from '@syncfusion/ej2-grids';
import { orderData } from './data-source';

Grid.Inject(Page, Selection);
/**
 * Stacked header Sample
 */
this.default = (): void => {
    let grid: Grid = new Grid(
        {
            dataSource: orderData,
            allowPaging: true,
            pageSettings: { pageCount: 5 },
            columns: [
                { field: 'OrderID', headerText: 'Order ID', textAlign: 'Right', width: 120 },
                {
                    headerText: 'Order Details', columns: [
                        { field: 'OrderDate', headerText: 'Order Date', textAlign: 'Right', width: 135, format: 'yMd' },
                        { field: 'Freight', headerText: 'Freight($)', textAlign: 'Right', width: 120, format: 'C2' },
                    ]
                },
                {
                    headerText: 'Ship Details', columns: [
                        { field: 'ShippedDate', headerText: 'Shipped Date', textAlign: 'Right', width: 145, format: 'yMd' },
                        { field: 'ShipCountry', headerText: 'Ship Country', width: 140 },
                    ]
                }
            ]
        });
    grid.appendTo('#Grid');
};