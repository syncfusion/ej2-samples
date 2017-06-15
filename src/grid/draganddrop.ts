import { Grid, Page, Selection, RowDD } from '@syncfusion/ej2-grids';
import { orderData } from './datasource';

Grid.Inject(Page, Selection, RowDD);

/**
 * DragAndDrop Grid sample
 */
this.default = (): void => {
    let grid: Grid = new Grid(
        {
            dataSource: orderData.slice(0, 24),
            allowPaging: true,
            allowRowDragAndDrop: true,
            selectionSettings: { type: 'multiple' },
            rowDropSettings: { targetID: 'DestGrid' },
            pageSettings: { pageCount: 2 },
            width: '49%',
            columns: [
                { field: 'OrderID', headerText: 'Order ID', width: 120, textAlign: 'right' },
                { field: 'CustomerName', headerText: 'Customer Name', width: 135 },
                { field: 'OrderDate', headerText: 'Order Date', width: 130, format: 'yMd', textAlign: 'right' }
            ]
        });
    grid.appendTo('#Grid');

    let destGrid: Grid = new Grid(
        {
            dataSource: [],
            allowPaging: true,
            allowRowDragAndDrop: true,
            selectionSettings: { type: 'multiple' },
            rowDropSettings: { targetID: 'Grid' },
            pageSettings: { pageCount: 2 },
            width: '49%',
            columns: [
                { field: 'OrderID', headerText: 'Order ID', width: 120, textAlign: 'right' },
                { field: 'CustomerName', headerText: 'Customer Name', width: 135 },
                { field: 'OrderDate', headerText: 'Order Date', width: 130, format: 'yMd', textAlign: 'right' }
            ]
        });
    destGrid.appendTo('#DestGrid');
};