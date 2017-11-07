import { Grid, Edit, Page, CommandColumn  } from '@syncfusion/ej2-grids';
import { orderData } from './datasource';

/**
 * Command column sample
 */
Grid.Inject(Edit, Page, CommandColumn);

this.default = (): void => {
    let grid: Grid = new Grid(
        {
            dataSource: orderData,
            editSettings: { allowEditing: true, allowAdding: true, allowDeleting: true },
            allowPaging: true,
            pageSettings: {pageCount: 5},
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
                    width: 120, format: 'C2', validationRules: { required: true }
                },
                { field: 'ShipName', headerText: 'Ship Name', width: 170 },
                {
                    field: 'ShipCountry', headerText: 'Ship Country', editType: 'dropdownedit', width: 150,
                    edit: { params: { popupHeight: '300px' } }
                },
                { headerText: 'Manage Records', width: 160,
                    commands: [{ type: 'edit', buttonOption: { iconCss: ' e-icons e-edit', cssClass: 'e-flat' } },
                        { type: 'delete', buttonOption: { iconCss: 'e-icons e-delete', cssClass: 'e-flat' } },
                        { type: 'save', buttonOption: { iconCss: 'e-icons e-update', cssClass: 'e-flat' } },
                        { type: 'cancel', buttonOption: { iconCss: 'e-icons e-cancel-icon', cssClass: 'e-flat' } }]
                }
            ]
        });
    grid.appendTo('#Grid');
};