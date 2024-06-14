import { loadCultureFiles } from '../common/culture-loader';
import { Grid, Selection, Toolbar, Sort, Filter, Edit } from '@syncfusion/ej2-grids';
import { Query, DataManager } from '@syncfusion/ej2-data';
import { data } from './data-source';
import { ClickEventArgs } from '@syncfusion/ej2-navigations';

Grid.Inject(Selection, Toolbar, Sort, Filter, Edit);

/**
 * Row height sample
 */
(window as any).default = (): void => {
    loadCultureFiles();
    let gridData: Object = new DataManager(data as JSON[]).executeLocal(new Query().take(30));
    let grid: Grid = new Grid(
        {
            dataSource: gridData,
            allowSorting: true,
            allowFiltering: true,
            filterSettings: { type: 'Excel' },
            editSettings: { allowAdding: true, allowEditing: true, allowDeleting: true },
            toolbar: ['Add', 'Edit', 'Delete', 'Update', 'Cancel',
                { prefixIcon: 'e-small-icon', id: 'big', align: 'Right', tooltipText: 'Row-height-big' },
                { prefixIcon: 'e-medium-icon', id: 'medium', align: 'Right', tooltipText: 'Row-height-medium' },
                { prefixIcon: 'e-big-icon', id: 'small', align: 'Right', tooltipText: 'Row-height-small' }
                ],
            columns: [
                { field: 'OrderID', headerText: 'Order ID', width: 120, textAlign: 'Right', isPrimaryKey: true, validationRules: { required: true, number: true } },
                { field: 'CustomerName', headerText: 'Customer Name', width: 150, validationRules: { required: true, minLength: 5 } },
                { field: 'OrderDate', headerText: 'Order Date', width: 130, format: 'yMd', textAlign: 'Right', editType: 'datepickeredit' },
                { field: 'Freight', width: 120, format: 'C2', textAlign: 'Right', editType: 'numericedit', validationRules: { required: true, min: 0 } },
                { field: 'ShippedDate', headerText: 'Shipped Date', width: 140, format: 'yMd', textAlign: 'Right', editType: 'datepickeredit' },
                { field: 'ShipCountry', headerText: 'Ship Country', width: 150, editType: 'dropdownedit' }
            ],
            height: 400,
            rowHeight: 20,
            toolbarClick: (args: ClickEventArgs) => {
                if (args.item.id === 'small') {
                    grid.rowHeight = 20;
                }
                if (args.item.id === 'medium') {
                    grid.rowHeight = 40;
                }
                if (args.item.id === 'big') {
                    grid.rowHeight = 60;
                }
            }
        });
    grid.appendTo('#Grid');
};