import { loadCultureFiles } from '../common/culture-loader';
import { CheckBox } from '@syncfusion/ej2-buttons';
import { Grid, Sort, Page, Selection, SortEventArgs, Filter, Edit, Toolbar } from '@syncfusion/ej2-grids';
import { orderData } from './data-source';

Grid.Inject(Sort, Page, Selection, Filter, Edit, Toolbar);
/**
 * Sorting sample
 */
(window as any).default = (): void => {
    loadCultureFiles();
    let grid: Grid = new Grid(
        {
            dataSource: orderData,
            allowPaging: true,
            pageSettings: { pageCount: 2 },
            allowSorting: true,
            allowFiltering: true,
            filterSettings: { type: 'Excel' },
            toolbar: ['Add', 'Edit', 'Delete', 'Update', 'Cancel'],
            editSettings: { allowAdding: true, allowEditing: true, allowDeleting: true },
            columns: [
                { field: 'OrderID', headerText: 'Order ID', width: 120, textAlign: 'Right', isPrimaryKey: true, validationRules: { required: true, number: true } },
                { field: 'CustomerName', headerText: 'Customer Name', width: 150, validationRules: { required: true, minLength: 5 } },
                { field: 'OrderDate', headerText: 'Order Date', width: 140, format: 'yMd', textAlign: 'Right', editType: 'datepickeredit' },
                { field: 'Freight', width: 150, format: 'C2', textAlign: 'Right', editType: 'numericedit', validationRules: { required: true, min: 0 } },
                { field: 'ShipCountry', headerText: 'Ship Country', width: 150, editType: 'dropdownedit' }
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
