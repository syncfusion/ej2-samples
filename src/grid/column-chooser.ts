import { loadCultureFiles } from '../common/culture-loader';
import { Grid, Page, Selection, Toolbar, ColumnChooser, Sort, Filter, Edit } from '@syncfusion/ej2-grids';
import { orderDetails } from './data-source';

Grid.Inject(Page, Selection, Toolbar, ColumnChooser, Sort, Filter, Edit);

/**
 * Column Chooser Grid sample
 */
(window as any).default = (): void => {
    loadCultureFiles();
    let grid: Grid = new Grid(
        {
            dataSource: orderDetails,
            showColumnChooser: true,
            allowPaging: true,
            allowSorting: true,
            allowFiltering: true,
            filterSettings: { type: 'Excel' },
            editSettings: { allowAdding: true, allowEditing: true, allowDeleting: true },
            toolbar: ['Add', 'Edit', 'Delete', 'Update', 'Cancel', 'ColumnChooser'],
            columns: [
                { field: 'OrderID', headerText: 'Order ID', width: 120, textAlign: 'Right', isPrimaryKey: true, showInColumnChooser: false, validationRules: { required: true, number: true } },
                { field: 'CustomerName', headerText: 'Customer Name', width: 150, showInColumnChooser: false, validationRules: { required: true, minLength: 5 } },
                { field: 'OrderDate', headerText: 'Order Date', width: 130, format: 'yMd', textAlign: 'Right', editType: 'datepickeredit' },
                { field: 'Freight', width: 120, format: 'C2', textAlign: 'Right', editType: 'numericedit', validationRules: { required: true, min: 0 } },
                { field: 'ShippedDate', headerText: 'Shipped Date', width: 140, format: 'yMd', textAlign: 'Right', editType: 'datepickeredit' },
                { field: 'ShipCountry', visible: false, headerText: 'Ship Country', width: 150, editType: 'dropdownedit' },
                { field: 'ShipCity', visible: false, headerText: 'Ship City', width: 150 }
            ]
        });
    grid.appendTo('#Grid');
};
