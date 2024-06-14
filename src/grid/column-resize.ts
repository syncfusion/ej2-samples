import { loadCultureFiles } from '../common/culture-loader';
import { Grid, Selection, Resize, Sort, Filter, Edit, Toolbar } from '@syncfusion/ej2-grids';
import { orderDetails } from './data-source';

Grid.Inject(Selection, Resize, Sort, Filter, Edit, Toolbar);

/**
 * Column resize Grid sample
 */
(window as any).default = (): void => {
    loadCultureFiles();
    let grid: Grid = new Grid(
        {
            dataSource: orderDetails,
            allowResizing: true,
            allowSorting: true,
            height: 400,
            width: 850,
            autoFit: true,
            allowFiltering: true,
            filterSettings: { type: 'Excel' },
            toolbar: ['Add', 'Edit', 'Delete', 'Update', 'Cancel'],
            editSettings: { allowAdding: true, allowEditing: true, allowDeleting: true },
            columns: [
                { field: 'OrderID', headerText: 'Order ID', minWidth: 100, width: 150, maxWidth: 200, textAlign: 'Right', isPrimaryKey: true, validationRules: { required: true, number: true } },
                { field: 'CustomerName', headerText: 'Customer Name', minWidth: 100, width: 150, validationRules: { required: true, minLength: 5 } },
                { field: 'Freight', width: 120, format: 'C2', minWidth: 100, textAlign: 'Right', editType: 'numericedit', validationRules: { required: true, min: 0 } },
                {
                    field: 'ShippedDate', headerText: 'Shipped Date',
                    width: 150, format: 'yMd', textAlign: 'Right', allowResizing: false, editType: 'datepickeredit'
                },
                { field: 'ShipCountry', headerText: 'Ship Country', minWidth: 100, width: 150, editType: 'dropdownedit' }
            ]
        });
    grid.appendTo('#Grid');
};
