import { loadCultureFiles } from '../common/culture-loader';
import { Grid, Page, Selection, Resize, Sort, Filter, Edit, Toolbar } from '@syncfusion/ej2-grids';
import { orderData } from './data-source';

Grid.Inject(Page, Selection, Resize, Sort, Filter, Edit, Toolbar);
/**
 * Stacked header Sample
 */
(window as any).default = (): void => {
    loadCultureFiles();
    let grid: Grid = new Grid(
        {
            dataSource: orderData,
            allowPaging: true,
            allowResizing: true,
            pageSettings: { pageCount: 5 },
            allowSorting: true,
            allowFiltering: true,
            filterSettings: { type: 'Excel' },
            toolbar: ['Add', 'Edit', 'Delete', 'Update', 'Cancel'],
            editSettings: { allowAdding: true, allowEditing: true, allowDeleting: true },
            columns: [
                { field: 'OrderID', headerText: 'Order ID', textAlign: 'Right', width: 120, minWidth: 10, isPrimaryKey: true, validationRules: { required: true, number: true } },
                {
                    headerText: 'Order Details', columns: [
                        { field: 'OrderDate', headerText: 'Order Date', textAlign: 'Right', width: 135, format: 'yMd', minWidth: 10, editType: 'datepickeredit' },
                        { field: 'Freight', headerText: 'Freight($)', textAlign: 'Right', width: 120, format: 'C2', minWidth: 10, editType: 'numericedit', validationRules: { required: true, min: 0 } },
                    ]
                },
                {
                    headerText: 'Ship Details', columns: [
                        { field: 'ShippedDate', headerText: 'Shipped Date', textAlign: 'Right', width: 145, format: 'yMd', minWidth: 10, editType: 'datepickeredit'},
                        { field: 'ShipCountry', headerText: 'Ship Country', width: 140, minWidth: 10, editType: 'dropdownedit' },
                    ]
                }
            ]
        });
    grid.appendTo('#Grid');
};