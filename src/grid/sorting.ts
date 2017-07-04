import { Grid, Sort, Page, Selection, SortEventArgs } from '@syncfusion/ej2-grids';
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
            pageSettings: { pageCount: 2 },
            allowSorting: true,
            columns: [
                { field: 'OrderID', headerText: 'Order ID', width: 120, textAlign: 'right' },
                { field: 'CustomerName', headerText: 'Customer Name', width: 170 },
                { field: 'OrderDate', headerText: 'Order Date', width: 130, format: 'yMd', textAlign: 'right' },
                { field: 'Freight', width: 120, format: 'C2', textAlign: 'right' },
                { field: 'ShipCountry', headerText: 'Ship Country', width: 150 }
            ],
            actionComplete: sort,
            sortSettings: { columns: [{ field: 'OrderDate', direction: 'ascending' }, { field: 'Freight', direction: 'descending' }] }
        });
    grid.appendTo('#Grid');

    let orderID: HTMLInputElement = document.getElementById('OrderID') as HTMLInputElement;
    let customerName: HTMLInputElement = document.getElementById('CustomerName') as HTMLInputElement;
    let orderDate: HTMLInputElement = document.getElementById('OrderDate') as HTMLInputElement;
    let freight: HTMLInputElement = document.getElementById('Freight') as HTMLInputElement;
    let shipCountry: HTMLInputElement = document.getElementById('ShipCountry') as HTMLInputElement;

    orderID.onclick = () => {
        if (orderID.checked) {
            grid.sortColumn('OrderID', 'ascending', true);
        } else {
            grid.removeSortColumn('OrderID');
        }
    };
    customerName.onclick = () => {
        if (customerName.checked) {
            grid.sortColumn('CustomerName', 'ascending', true);
        } else {
            grid.removeSortColumn('CustomerName');
        }
    };
    orderDate.onclick = () => {
        if (orderDate.checked) {
            grid.sortColumn('OrderDate', 'ascending', true);
        } else {
            grid.removeSortColumn('OrderDate');
        }
    };
    freight.onclick = () => {
        if (freight.checked) {
            grid.sortColumn('Freight', 'ascending', true);
        } else {
            grid.removeSortColumn('Freight');
        }
    };
    shipCountry.onclick = () => {
        if (shipCountry.checked) {
            grid.sortColumn('ShipCountry', 'ascending', true);
        } else {
            grid.removeSortColumn('ShipCountry');
        }
    };
    function sort(args: SortEventArgs): void {
        if (args.requestType === 'sorting') {
            for (let columns of grid.getColumns()) {
                for (let sortcolumns of grid.sortSettings.columns) {
                    if (sortcolumns.field === columns.field) {
                        (document.getElementById(sortcolumns.field) as HTMLInputElement).checked = true;
                        break;
                    } else {
                        (document.getElementById(columns.field) as HTMLInputElement).checked = false;
                    }
                }
            }
        }
    }
};

