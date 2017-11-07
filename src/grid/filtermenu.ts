import { Grid, Filter, Page, Selection, FilterType } from '@syncfusion/ej2-grids';
import { orderData } from './datasource';

Grid.Inject(Filter, Page, Selection);

/**
 * Filtering sample
 */
this.default = (): void => {
    let grid: Grid = new Grid(
        {
            dataSource: orderData.slice(0, 200),
            allowPaging: true,
            allowFiltering: true,
            filterSettings: { type: 'menu' },
            columns: [
                { field: 'OrderID', headerText: 'Order ID', width: 120, textAlign: 'right' },
                { field: 'CustomerName', headerText: 'Customer Name', width: 150 },
                { field: 'OrderDate', headerText: 'Order Date', width: 130, format: 'yMd', textAlign: 'right' },
                { field: 'Freight', width: 120, format: 'C2', textAlign: 'right' }
            ],
            pageSettings: { pageCount: 5 }
        });
    grid.appendTo('#Grid');

    let drop: HTMLSelectElement = document.getElementById('drop') as HTMLSelectElement;
    drop.onchange = () => {
        let dropSelectedValue: FilterType = <FilterType>drop.value;
        grid.filterSettings.type = dropSelectedValue;
    };
};