import { Grid, Filter, Page, Selection, FilterType } from '@syncfusion/ej2-grids';
import { orderData } from './datasource';

Grid.Inject(Filter, Page, Selection);

/**
 * Filtering sample
 */
this.default = (): void => {
    let grid: Grid = new Grid(
        {
            dataSource: orderData,
            allowPaging: true,
            allowFiltering: true,
            filterSettings: { type: 'menu' },
            columns: [
                { field: 'OrderID', headerText: 'Order ID', width: 120, textAlign: 'right' },
                { field: 'CustomerName', headerText: 'Customer Name', width: 150 },
                { field: 'OrderDate', headerText: 'Order Date', width: 130, format: 'yMd', textAlign: 'right' },
                { field: 'Freight', width: 120, format: 'C2', textAlign: 'right' },
                { field: 'ShippedDate', headerText: 'Shipped Date', width: 130, format: 'yMd', textAlign: 'right' },
                { field: 'ShipCountry', allowFiltering: false, headerText: 'Ship Country', width: 150 }
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