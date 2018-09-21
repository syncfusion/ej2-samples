import { Grid, Resize, Sort, Group, Filter, ColumnMenu, Page } from '@syncfusion/ej2-grids';
import { orderDetails } from './data-source';

Grid.Inject(Resize, Sort, Group, Filter, ColumnMenu, Page);

/**
 * Column menu in grid sample
 */
this.default = (): void => {
    let grid: Grid = new Grid(
        {
            dataSource: orderDetails,
            allowGrouping: true,
            allowSorting: true,
            allowFiltering: true,
            filterSettings: { type: 'CheckBox' },
            allowPaging: true,
            groupSettings: { showGroupedColumn: true },
            showColumnMenu: true,
            columns: [
                { field: 'OrderID', headerText: 'Order ID', width: 200, textAlign: 'Right', showInColumnChooser: false },
                { field: 'CustomerName', headerText: 'Customer Name' },
                { field: 'Freight', format: 'C2', textAlign: 'Right', editType: 'numericedit' },
                { field: 'ShipName', headerText: 'Ship Name', width: 300 },
                { field: 'ShipCountry', visible: false, headerText: 'Ship Country', width: 200 },
                { field: 'ShipCity', headerText: 'Ship City', width: 200 }
            ]
        });
    grid.appendTo('#Grid');
};
