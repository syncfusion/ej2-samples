import { loadCultureFiles } from '../common/culture-loader';
import { Grid, Sort } from '@syncfusion/ej2-grids';
import { orderData } from './data-source';

Grid.Inject(Sort);
/**
 * Sticky Header Grid sample
 */
(window as any).default = (): void => {
    loadCultureFiles();
    let grid: Grid = new Grid(
        {
            dataSource: orderData.slice(0, 50),
            enableStickyHeader: true,
            allowSorting: true,
            columns: [
                { field: 'OrderID', headerText: 'Order ID', textAlign: 'Right', width: 120 },
                { field: 'OrderDate', headerText: 'Order Date', textAlign: 'Right', width: 135, format: 'yMd' },
                { field: 'Freight', headerText: 'Freight($)', textAlign: 'Right', width: 120, format: 'C2' },
                { field: 'ShippedDate', headerText: 'Shipped Date', textAlign: 'Right', width: 145, format: 'yMd' },
                { field: 'ShipCountry', headerText: 'Ship Country', width: 140 }
            ]
        });
    grid.appendTo('#Grid');
};