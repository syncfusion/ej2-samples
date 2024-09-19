import { loadCultureFiles } from '../common/culture-loader';
import { Grid, Page, Toolbar, Edit, Sort, Filter } from '@syncfusion/ej2-grids';
import { orderDetails } from './data-source';

Grid.Inject(Page, Toolbar, Edit, Sort, Filter);
/**
 * Checkbox Selection API sample
 */
(window as any).default = (): void => {
    loadCultureFiles();
    let grid: Grid = new Grid(
        {
            dataSource: orderDetails,
            allowPaging: true,
            allowSelection: true,
            selectionSettings: { persistSelection: true },
            editSettings: {allowDeleting: true},
            toolbar: ['Delete'],
            allowFiltering: true,
            filterSettings: { type: 'Excel' },
            enableHover: false,
            allowSorting: true,
            columns: [
                { type: 'checkbox', width: 50 },
                { field: 'OrderID', isPrimaryKey: true, headerText: 'Order ID', textAlign: 'Right', width: 180 },
                { field: 'CustomerName', headerText: 'Customer Name', width: 150 },
                { field: 'OrderDate', headerText: 'Order Date', width: 150, format: 'yMd', textAlign: 'Right' },
                { field: 'Freight', headerText: 'Freight', width: 130, format: 'C2', textAlign: 'Right' },
                { field: 'ShipCountry', headerText: 'Ship Country', width: 130 }
            ],
            pageSettings: { pageCount: 2 }
        });
    grid.appendTo('#Grid');
};