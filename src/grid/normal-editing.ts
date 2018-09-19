import { Grid, Edit, Toolbar, Page } from '@syncfusion/ej2-grids';
import { orderDataSource } from './data-source';

/**
 * Batch Editing sample
 */
Grid.Inject(Edit, Toolbar, Page);

this.default = (): void => {
    let grid: Grid = new Grid(
        {
            dataSource: orderDataSource,
            editSettings: { allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Normal' },
            allowPaging: true,
            pageSettings: { pageCount: 5 },
            toolbar: ['Add', 'Edit', 'Delete', 'Update', 'Cancel'],
            columns: [
                {
                    field: 'OrderID', isPrimaryKey: true, headerText: 'Order ID', textAlign: 'Right',
                    validationRules: { required: true }, width: 120
                },
                {
                    field: 'CustomerID', headerText: 'Customer ID',
                    validationRules: { required: true }, width: 140
                },
                {
                    field: 'Freight', headerText: 'Freight', textAlign: 'Right', editType: 'numericedit',
                    width: 120, format: 'C2', validationRules: { required: true }
                },
                {
                    field: 'OrderDate', headerText: 'Order Date', editType: 'datetimepickeredit',
                    width: 170, format: { type: 'dateTime', format: 'M/d/y hh:mm a' },
                },
                {
                    field: 'ShipCountry', headerText: 'Ship Country', editType: 'dropdownedit', width: 150,
                    edit: { params: { popupHeight: '300px' } }
                }],
        });
    grid.appendTo('#Grid');
};