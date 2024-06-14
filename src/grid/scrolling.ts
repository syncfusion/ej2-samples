import { loadCultureFiles } from '../common/culture-loader';
import { Grid, Page, Selection, Sort, Filter, Edit, Toolbar } from '@syncfusion/ej2-grids';
import { orderData } from './data-source';

Grid.Inject(Page, Selection, Sort, Filter, Edit, Toolbar);

/**
 * scroll Grid sample
 */
(window as any).default = (): void => {
    loadCultureFiles();
    let grid: Grid = new Grid(
        {
            dataSource: orderData.slice(0, 100),
            height: 410,
            width: 'auto',
            allowSorting: true,
            allowFiltering: true,
            filterSettings: { type: 'Excel' },
            toolbar: ['Add', 'Edit', 'Delete', 'Update', 'Cancel'],
            editSettings: { allowAdding: true, allowEditing: true, allowDeleting: true },
            columns: [
                { field: 'OrderID', headerText: 'Order ID', width: 120, textAlign: 'Right', isPrimaryKey: true, validationRules: { required: true, number: true } },
                { field: 'CustomerName', headerText: 'Customer Name', width: 160, validationRules: { required: true, minLength: 5 } },
                { field: 'OrderDate', headerText: 'Order Date', width: 130, format: 'yMd', textAlign: 'Right', editType: 'datepickeredit' },
                { field: 'Freight', width: 120, format: 'C', textAlign: 'Right', editType: 'numericedit', validationRules: { required: true, min: 0 } },
                { field: 'ShippedDate', headerText: 'Shipped Date', width: 140, format: 'yMd', textAlign: 'Right', editType: 'datepickeredit' },
                { field: 'ShipName', headerText: 'Ship Name', width: '170' },
                { field: 'ShipAddress', headerText: 'Ship Address', width: '170' },
                { field: 'ShipCity', headerText: 'Ship City', width: '150' },
                { field: 'ShipCountry', headerText: 'Ship Country', width: 150, editType: 'dropdownedit' }
            ]
        });
    grid.appendTo('#Grid');
};