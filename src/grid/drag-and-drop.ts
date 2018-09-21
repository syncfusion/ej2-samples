import { Grid, Page, Selection, RowDD } from '@syncfusion/ej2-grids';
import { orderDetails } from './data-source';

Grid.Inject(Page, Selection, RowDD);

/**
 * DragAndDrop Grid sample
 */
this.default = (): void => {
    let grid: Grid = new Grid(
        {
            dataSource: orderDetails,
            allowPaging: true,
            allowRowDragAndDrop: true,
            selectionSettings: { type: 'Multiple' },
            rowDropSettings: { targetID: 'DestGrid' },
            pageSettings: { pageCount: 2 },
            width: '49%',
            columns: [
                { field: 'OrderID', headerText: 'Order ID', width: 120, textAlign: 'Right' },
                { field: 'CustomerName', headerText: 'Customer Name', width: 135 },
                { field: 'OrderDate', headerText: 'Order Date', width: 130, format: 'yMd', textAlign: 'Right' }
            ]
        });
    grid.appendTo('#Grid');

    let destGrid: Grid = new Grid(
        {
            dataSource: [],
            allowPaging: true,
            allowRowDragAndDrop: true,
            selectionSettings: { type: 'Multiple' },
            rowDropSettings: { targetID: 'Grid' },
            pageSettings: { pageCount: 2 },
            width: '49%',
            columns: [
                { field: 'OrderID', headerText: 'Order ID', width: 120, textAlign: 'Right' },
                { field: 'CustomerName', headerText: 'Customer Name', width: 135 },
                { field: 'OrderDate', headerText: 'Order Date', width: 130, format: 'yMd', textAlign: 'Right' }
            ]
        });
    destGrid.appendTo('#DestGrid');
};