import { loadCultureFiles } from '../common/culture-loader';
import { Grid, Selection, RowDD, Group, Sort } from '@syncfusion/ej2-grids';
import { orderDetails } from './data-source';

Grid.Inject(Selection, RowDD, Group, Sort);

/**
 * DragAndDrop Grid sample
 */
(window as any).default = (): void => {
    loadCultureFiles();
    let grid: Grid = new Grid(
        {
            dataSource: orderDetails,
            allowRowDragAndDrop: true,
            allowGrouping: true,
            allowSorting: true,
            selectionSettings: { type: 'Multiple' },
            height: 400,
            columns: [
                { field: 'OrderID', headerText: 'Order ID', isPrimaryKey: true, width: 80, textAlign: 'Right' },
                { field: 'CustomerName', headerText: 'Customer Name', width: 170, textAlign: 'Left' },
                { field: 'OrderDate', headerText: 'Order Date', width: 100, format: 'yMd', textAlign: 'Right' },
                { field: 'Freight', headerText: 'Freight', width: 130, format: 'C2', textAlign: 'Right' },
                { field: 'ShipCity', headerText: 'Ship City', width: 130, textAlign: 'Left' },
                { field: 'ShipCountry', headerText: 'Ship Country', width: 130 }
            ]
        });
    grid.appendTo('#Grid');
};