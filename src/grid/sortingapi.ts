import { Button } from '@syncfusion/ej2-buttons';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { Grid, Sort, Page, Selection, SortDirection } from '@syncfusion/ej2-grids';
import { orderData } from './datasource';

Grid.Inject(Sort, Page, Selection);
/**
 * Sorting sample
 */
this.default = (): void => {
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
            columns: [
                { field: 'OrderID', headerText: 'Order ID', width: 120, textAlign: 'Right' },
                { field: 'CustomerName', headerText: 'Customer Name', width: 160 },
                { field: 'OrderDate', headerText: 'Order Date', width: 130, format: 'yMd', textAlign: 'Right' },
                { field: 'Freight', width: 120, format: 'C2', textAlign: 'Right' }
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
