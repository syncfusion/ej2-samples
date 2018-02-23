import { CheckBox } from '@syncfusion/ej2-buttons';
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
                { field: 'OrderID', headerText: 'Order ID', width: 120, textAlign: 'Right' },
                { field: 'CustomerName', headerText: 'Customer Name', width: 170 },
                { field: 'OrderDate', headerText: 'Order Date', width: 130, format: 'yMd', textAlign: 'Right' },
                { field: 'Freight', width: 120, format: 'C2', textAlign: 'Right' },
                { field: 'ShipCountry', headerText: 'Ship Country', width: 150 }
            ],
            actionComplete: sort,
            sortSettings: { columns: [{ field: 'OrderDate', direction: 'Ascending' }, { field: 'Freight', direction: 'Descending' }] }
        });
    grid.appendTo('#Grid');

    let orderID: CheckBox = new CheckBox();
    orderID.appendTo('#OrderID');

    let customerName: CheckBox = new CheckBox();
    customerName.appendTo('#CustomerName');

    let orderDate: CheckBox = new CheckBox({ checked: true });
    orderDate.appendTo('#OrderDate');

    let freight: CheckBox = new CheckBox({ checked: true });
    freight.appendTo('#Freight');

    let shipCountry: CheckBox = new CheckBox();
    shipCountry.appendTo('#ShipCountry');

    document.getElementById('OrderID').onclick = () => {
        if (orderID.checked) {
            grid.sortColumn('OrderID', 'Ascending', true);
        } else {
            grid.removeSortColumn('OrderID');
        }
    };
    document.getElementById('CustomerName').onclick = () => {
        if (customerName.checked) {
            grid.sortColumn('CustomerName', 'Ascending', true);
        } else {
            grid.removeSortColumn('CustomerName');
        }
    };
    document.getElementById('OrderDate').onclick = () => {
        if (orderDate.checked) {
            grid.sortColumn('OrderDate', 'Ascending', true);
        } else {
            grid.removeSortColumn('OrderDate');
        }
    };
    document.getElementById('Freight').onclick = () => {
        if (freight.checked) {
            grid.sortColumn('Freight', 'Ascending', true);
        } else {
            grid.removeSortColumn('Freight');
        }
    };
    document.getElementById('ShipCountry').onclick = () => {
        if (shipCountry.checked) {
            grid.sortColumn('ShipCountry', 'Ascending', true);
        } else {
            grid.removeSortColumn('ShipCountry');
        }
    };
    function sort(args: SortEventArgs): void {
        if (args.requestType === 'sorting') {
            for (let columns of grid.getColumns()) {
                for (let sortcolumns of grid.sortSettings.columns) {
                    if (sortcolumns.field === columns.field) {
                        check(sortcolumns.field, true); break;
                    } else {
                        check(columns.field, false);
                    }
                }
            }
        }
    }
    function check(field: string, state: boolean): void {
        switch (field) {
            case 'OrderID':
                orderID.checked = state; break;
            case 'CustomerName':
                customerName.checked = state; break;
            case 'OrderDate':
                orderDate.checked = state; break;
            case 'Freight':
                freight.checked = state; break;
            case 'ShipCountry':
                shipCountry.checked = state;
        }
    }
};
