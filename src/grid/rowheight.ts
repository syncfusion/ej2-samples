import { Grid, Selection, Page } from '@syncfusion/ej2-grids';
import { Query, DataManager } from '@syncfusion/ej2-data';
import { data } from './datasource';

Grid.Inject(Selection, Page);

/**
 * Row height sample
 */
this.default = (): void => {
    let gridData: Object = new DataManager(data).executeLocal(new Query().take(20));
    let grid: Grid = new Grid(
        {
            dataSource: gridData,
            allowPaging: true,
            columns: [
                { field: 'OrderID', headerText: 'Order ID', width: 80, textAlign: 'right' },
                { field: 'CustomerName', headerText: 'Customer Name', width: 170 },
                { field: 'OrderDate', headerText: 'Order Date', width: 135, format: 'yMd', textAlign: 'right' },
                { field: 'Freight', width: 160, format: 'C2', textAlign: 'right' }
            ],
            pageSettings: { pageCount: 2, pageSize: 10 },
            rowHeight: 50
        });
    grid.appendTo('#Grid');
};