import { loadCultureFiles } from '../common/culture-loader';
import { Grid, Page, Selection, Toolbar, ColumnChooser, Sort } from '@syncfusion/ej2-grids';
import { orderDetails } from './data-source';

Grid.Inject(Page, Selection, Toolbar, ColumnChooser, Sort);

/**
 * Column Chooser Grid sample
 */
(window as any).default = (): void => {
    loadCultureFiles();
    let grid: Grid = new Grid(
        {
            dataSource: orderDetails,
            showColumnChooser: true,
            allowPaging: true,
            allowSorting: true,
            toolbar: ['ColumnChooser'],
            columns: [
                { field: 'OrderID', headerText: 'Order ID', width: 120, textAlign: 'Right' },
                { field: 'CustomerName', headerText: 'Customer Name', width: 150, showInColumnChooser: false },
                { field: 'OrderDate', headerText: 'Order Date', width: 130, format: 'yMd', textAlign: 'Right' },
                { field: 'Freight', width: 120, format: 'C2', textAlign: 'Right' },
                { field: 'ShippedDate', headerText: 'Shipped Date', width: 140, format: 'yMd', textAlign: 'Right' },
                { field: 'ShipCountry', visible: false, headerText: 'Ship Country', width: 150 },
                { field: 'ShipCity', visible: false, headerText: 'Ship City', width: 150 }
            ]
        });
    grid.appendTo('#Grid');
};
