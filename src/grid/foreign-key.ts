import { Grid, Sort, Page, Filter, Edit, Toolbar, ForeignKey } from '@syncfusion/ej2-grids';
import { orderDetails, customerData } from './data-source';

Grid.Inject(Page, Sort, Filter, Edit, Toolbar, ForeignKey);

/**
 * Foreign key sample
 */

(window as any).default = (): void => {
    let grid: Grid = new Grid(
        {
            dataSource: orderDetails,
            allowPaging: true,
            allowSorting: true,
            allowFiltering: true,
            toolbar: ['Add', 'Edit', 'Delete', 'Update', 'Cancel'],
            filterSettings: { type: 'Menu' },
            editSettings: { allowEditing: true, allowAdding: true, allowDeleting: true },
            columns: [
                {
                    field: 'OrderID', width: 120, headerText: 'Order ID', isPrimaryKey: true, textAlign: 'Right',
                    validationRules: { required: true, number: true }
                },
                {
                    field: 'CustomerID', foreignKeyField: 'CustomerID', foreignKeyValue: 'ContactName', dataSource: customerData,
                    width: 150, headerText: 'Customer Name', validationRules: { required: true }
                },
                {
                    field: 'Freight', textAlign: 'Right', width: 150, editType: 'numericedit', format: 'C2'
                },
                { field: 'ShipName', headerText: 'Ship Name', width: 170 },
                { field: 'ShipCountry', headerText: 'Ship Country', editType: 'dropdownedit', width: 150 }
            ]
        });
    grid.appendTo('#Grid');
};