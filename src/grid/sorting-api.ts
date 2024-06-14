import { loadCultureFiles } from '../common/culture-loader';
import { Button } from '@syncfusion/ej2-buttons';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { Grid, Sort, Page, Selection, SortDirection, Filter, Edit, Toolbar } from '@syncfusion/ej2-grids';
import { orderData } from './data-source';

Grid.Inject(Sort, Page, Selection, Filter, Edit, Toolbar);
/**
 * Sorting sample
 */
(window as any).default = (): void => {
    loadCultureFiles();
    let columnsName: { [key: string]: Object }[] = [
        { id: 'OrderID', name: 'Order ID' },
        { id: 'CustomerName', name: 'Customer Name' },
        { id: 'OrderDate', name: 'Order Date' },
        { id: 'Freight', name: 'Freight' }
    ];
    let direction: { [key: string]: Object }[] = [
        { id: 'Ascending', name: 'Ascending' },
        { id: 'Descending', name: 'Descending' }
    ];
    let grid: Grid = new Grid(
        {
            dataSource: orderData,
            allowPaging: true,
            allowSorting: true,
            allowFiltering: true,
            filterSettings: { type: 'Excel' },
            toolbar: ['Add', 'Edit', 'Delete', 'Update', 'Cancel'],
            editSettings: { allowAdding: true, allowEditing: true, allowDeleting: true },
            columns: [
                { field: 'OrderID', headerText: 'Order ID', width: 120, textAlign: 'Right', isPrimaryKey: true, validationRules: { required: true, number: true } },
                { field: 'CustomerName', headerText: 'Customer Name', width: 160, validationRules: { required: true, minLength: 5 } },
                { field: 'OrderDate', headerText: 'Order Date', width: 130, format: 'yMd', textAlign: 'Right', editType: 'datepickeredit' },
                { field: 'Freight', width: 120, format: 'C2', textAlign: 'Right', editType: 'numericedit', validationRules: { required: true, min: 0 } }
            ],
            pageSettings: { pageCount: 2 }
        });
    grid.appendTo('#Grid');

    let dropDownColumns: DropDownList = new DropDownList({
        dataSource: columnsName,
        fields: { text: 'name', value: 'id' },
        value: 'OrderID'
    });
    dropDownColumns.appendTo('#columns');

    let dropDownDirection: DropDownList = new DropDownList({
        dataSource: direction,
        fields: { text: 'name', value: 'id' },
        value: 'Ascending'
    });
    dropDownDirection.appendTo('#direction');

    let sort: Button = new Button();
    sort.appendTo('#sort');

    let clear: Button = new Button();
    clear.appendTo('#clear');

    document.getElementById('sort').onclick = () => {
        let columnName: string = <string>dropDownColumns.value;
        let sortType: string = <string>dropDownDirection.value;
        grid.sortColumn(columnName, <SortDirection>sortType, false);
    };
    document.getElementById('clear').onclick = () => {
        grid.clearSorting();
    };
};
