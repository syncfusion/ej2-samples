import { loadCultureFiles } from '../common/culture-loader';
import { Grid, Toolbar, Edit, Page, Sort } from '@syncfusion/ej2-grids';
import { orderData } from './data-source';

/**
 * Batch Editing sample
 */
Grid.Inject(Edit, Toolbar, Page, Sort);

(window as any).default = (): void => {
    loadCultureFiles();
    let grid: Grid = new Grid(
        {
            dataSource: orderData,
            editSettings: { allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Batch' },
            allowPaging: true,
            pageSettings: { pageCount: 5 },
            toolbar: ['Add', 'Delete', 'Update', 'Cancel'],
            allowSorting: true,
            columns: [
                {
                    field: 'OrderID', isPrimaryKey: true, headerText: 'Order ID', textAlign: 'Right',
                    validationRules: { required: true, number: true }, width: 120
                },
                {
                    field: 'CustomerID', headerText: 'Customer ID',
                    validationRules: { required: true, minLength: 5 }, width: 140
                },
                {
                    field: 'Freight', headerText: 'Freight', textAlign: 'Right', editType: 'numericedit',
                    width: 120, format: 'C2', validationRules: { required: true, min: 0, number: true }
                },
                {
                    field: 'OrderDate', headerText: 'Order Date', editType: 'datepickeredit', format: 'yMd',
                    width: 170
                },
                {
                    field: 'ShipCountry', headerText: 'Ship Country', editType: 'dropdownedit', width: 150,
                    edit: { params: { popupHeight: '300px' } }
                }],
        });
    grid.appendTo('#Grid'); 
};