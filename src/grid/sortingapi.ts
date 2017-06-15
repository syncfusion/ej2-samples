import { Grid, Sort, Page, Selection, SortDirection } from '@syncfusion/ej2-grids';
import { orderData } from './datasource';

Grid.Inject(Sort, Page, Selection);
/**
 * Sorting sample
 */
this.default = (): void => {
    let grid: Grid = new Grid(
        {
            dataSource: orderData,
            allowPaging: true,
            allowSorting: true,
            columns: [
                { field: 'OrderID', headerText: 'Order ID', width: 120, textAlign: 'right' },
                { field: 'CustomerName', headerText: 'Customer Name', width: 160 },
                { field: 'OrderDate', headerText: 'Order Date', width: 130, format: 'yMd', textAlign: 'right' },
                { field: 'Freight', width: 120, format: 'C2', textAlign: 'right' }
            ],
            pageSettings: { pageCount: 2 }
        });
    grid.appendTo('#Grid');

    document.getElementById('sort').onclick = () => {
        let columnName: string = (document.getElementById('columns') as HTMLSelectElement).value;
        let sortType: string = (document.getElementById('sortdirection') as HTMLSelectElement).value;
        grid.sortColumn(columnName, <SortDirection>sortType, false);
    };
    document.getElementById('clear').onclick = () => {
        grid.clearSorting();
    };
};