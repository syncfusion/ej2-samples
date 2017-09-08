import { Grid, Toolbar, Edit, Page } from '@syncfusion/ej2-grids';
import { orderData } from './datasource';

/**
 * Batch Editing sample
 */
Grid.Inject(Edit, Toolbar, Page);

this.default = (): void => {
    let grid: Grid = new Grid(
        {
            dataSource: orderData,
            editSettings: { allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'batch' },
            allowPaging: true,
            pageSettings: {pageCount: 5},
            toolbar: ['add', 'edit', 'delete', 'update', 'cancel'],
            columns: [
                {
                    field: 'OrderID', isPrimaryKey: true, headerText: 'Order ID', textAlign: 'right',
                    validationRules: { required: true }, width: 120
                },
                {
                    field: 'CustomerID', headerText: 'Customer ID',
                    validationRules: { required: true }, width: 140
                },
                {
                    field: 'Freight', headerText: 'Freight', textAlign: 'right', editType: 'numericedit',
                    width: 120, format: 'C2'
                },
                { field: 'ShipCity', headerText: 'Ship City', width: 170 },
                {
                    field: 'ShipCountry', headerText: 'Ship Country', editType: 'dropdownedit', width: 150,
                    edit: { params: { popupHeight: '300px' } }
                }],
        });
    grid.appendTo('#Grid');
};