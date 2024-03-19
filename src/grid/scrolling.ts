import { loadCultureFiles } from '../common/culture-loader';
import { Grid, Page, Selection, Sort } from '@syncfusion/ej2-grids';
import { orderData } from './data-source';

Grid.Inject(Page, Selection, Sort);

/**
 * scroll Grid sample
 */
(window as any).default = (): void => {
    loadCultureFiles();
    let grid: Grid = new Grid(
        {
            dataSource: orderData.slice(0, 100),
            height: 410,
            width: 'auto',
            allowSorting: true,
            columns: [
                { field: 'OrderID', headerText: 'Order ID', width: 120, textAlign: 'Right' },
                { field: 'CustomerName', headerText: 'Customer Name', width: 160 },
                { field: 'OrderDate', headerText: 'Order Date', width: 130, format: 'yMd', textAlign: 'Right' },
                { field: 'Freight', width: 120, format: 'C', textAlign: 'Right', editType:'numericedit' },
                { field: 'ShippedDate', headerText: 'Shipped Date', width: 140, format: 'yMd', textAlign: 'Right' },
                { field: 'ShipName', headerText: 'Ship Name', width: '170' },
                { field: 'ShipAddress', headerText: 'Ship Address', width: '170' },
                { field: 'ShipCity', headerText: 'Ship City', width: '150' },
                { field: 'ShipCountry', headerText: 'Ship Country', width: 150 }
            ]
        });
    grid.appendTo('#Grid');
};