import { loadCultureFiles } from '../common/culture-loader';
import { Grid, Selection, Resize, Sort } from '@syncfusion/ej2-grids';
import { orderDetails } from './data-source';

Grid.Inject(Selection, Resize, Sort);

/**
 * Column resize Grid sample
 */
(window as any).default = (): void => {
    loadCultureFiles();
    let grid: Grid = new Grid(
        {
            dataSource: orderDetails,
            allowResizing: true,
            allowSorting: true,
            height: 400,
            width: 850,
            autoFit: true,
            columns: [
                { field: 'OrderID', headerText: 'Order ID', minWidth: 100, width: 150, maxWidth: 200, textAlign: 'Right' },
                { field: 'CustomerName', headerText: 'Customer Name', minWidth: 100, width: 150 },
                { field: 'Freight', width: 120, format: 'C2', minWidth: 100, textAlign: 'Right' },
                {
                    field: 'ShippedDate', headerText: 'Shipped Date',
                    width: 150, format: 'yMd', textAlign: 'Right', allowResizing: false
                },
                { field: 'ShipCountry', headerText: 'Ship Country', minWidth: 100, width: 150 }
            ]
        });
    grid.appendTo('#Grid');
};
