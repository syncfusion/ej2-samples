import { loadCultureFiles } from '../common/culture-loader';
import { Grid, Selection, Sort, Filter, Edit, Toolbar } from '@syncfusion/ej2-grids';
import { Query, DataManager } from '@syncfusion/ej2-data';
import { orderData } from './data-source';

Grid.Inject(Selection, Sort, Filter, Edit, Toolbar);

/**
 * Default Grid sample
 */
(window as any).default = (): void => {
    loadCultureFiles();
    let data: Object = new DataManager(orderData as JSON[]).executeLocal(new Query().take(15));
    let grid: Grid = new Grid(
        {
            dataSource: data,
            allowSorting: true,
            allowFiltering: true,
            filterSettings: { type: 'Excel' },
            toolbar: ['Add', 'Edit', 'Delete', 'Update', 'Cancel'],
            editSettings: { allowAdding: true, allowEditing: true, allowDeleting: true },
            columns: [
                { field: 'OrderID', headerText: 'Order ID', width: 180, textAlign: 'Right', isPrimaryKey: true, validationRules: { required: true, number: true } },
                { field: 'CustomerName', headerText: 'Customer Name', width: 150, validationRules: { required: true, minLength: 5 } },
                { field: 'OrderDate', headerText: 'Order Date', width: 130, format: 'yMd', textAlign: 'Right', editType: 'datepickeredit' },
                { field: 'Freight', width: 120, format: 'C2', textAlign: 'Right', editType: 'numericedit', validationRules: { required: true, min: 0 } },
                { field: 'ShippedDate', headerText: 'Shipped Date', width: 140, format: 'yMd', textAlign: 'Right', editType: 'datepickeredit' },
                { field: 'ShipCountry', headerText: 'Ship Country', width: 150, editType: 'dropdownedit' }
            ]
        });
    grid.appendTo('#Grid');
};
