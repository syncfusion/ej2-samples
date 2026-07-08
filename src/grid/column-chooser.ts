import { loadCultureFiles } from '../common/culture-loader';
import { Grid, Page, Selection, Toolbar, ColumnChooser, Sort, Filter, Edit } from '@syncfusion/ej2-grids';
import { OrderedData } from './data-source';
import { CheckBox, ChangeEventArgs } from '@syncfusion/ej2-buttons';

Grid.Inject(Page, Selection, Toolbar, ColumnChooser, Sort, Filter, Edit);

/**
 * Column Chooser Grid sample
 */
(window as any).default = (): void => {
    loadCultureFiles();
    let grid: Grid = new Grid(
        {
            dataSource: OrderedData,
            showColumnChooser: true,
            allowPaging: true,
            allowSorting: true,
            allowFiltering: true,
            filterSettings: { type: 'CheckBox' },
            clipMode: 'EllipsisWithTooltip',
            columnChooserSettings: {
                mode: 'Immediate',
            },
            editSettings: { allowAdding: true, allowEditing: true, allowDeleting: true },
            toolbar: ['Add', 'Edit', 'Delete', 'Update', 'Cancel', 'ColumnChooser'],
            columns: [
                { field: 'OrderID', headerText: 'Order ID', width: 120, textAlign: 'Right', isPrimaryKey: true, showInColumnChooser: false, validationRules: { required: true, number: true } },
                { field: 'CustomerName', headerText: 'Customer Name', width: 150, showInColumnChooser: false, validationRules: { required: true, minLength: 5 } },
                { field: 'OrderDate', headerText: 'Order Date', width: 130, format: 'yMd', textAlign: 'Right', editType: 'datepickeredit', validationRules: { required: true } },
                { field: 'Freight', width: 120, format: 'C2', textAlign: 'Right', editType: 'numericedit', validationRules: { required: true, min: 0 } },
                { field: 'ShippedDate', headerText: 'Shipped Date', width: 140, format: 'yMd', textAlign: 'Right', editType: 'datepickeredit', validationRules: { required: true } },
                { field: 'ShipCountry', headerText: 'Ship Country', width: 150, editType: 'dropdownedit' }
            ]
        });
    grid.appendTo('#Grid');

    let checkbox: CheckBox = new CheckBox({
        label: 'Immediate Column Chooser Mode', labelPosition: 'After', change: (e: ChangeEventArgs) => {
            if (e.checked) {
                grid.columnChooserSettings.mode = 'Immediate';
            } else {
                grid.columnChooserSettings.mode = 'Default';
            }
        }, checked: true
    });
    checkbox.appendTo('#columnChooserMode');
};
