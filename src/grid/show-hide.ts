import { DropDownList, ChangeEventArgs } from '@syncfusion/ej2-dropdowns';
import { Button } from '@syncfusion/ej2-buttons';
import { Grid, Page, Selection, Column, Sort, Filter } from '@syncfusion/ej2-grids';
import { categoryData } from './data-source';

Grid.Inject(Page, Selection, Sort, Filter);
/**
 * Show Hide sample
 */
(window as any).default = (): void => {
    let columnsName: { [key: string]: Object }[] = [
        { id: 'CategoryName', name: 'Category Name' },
        { id: 'ProductName', name: 'Product Name' },
        { id: 'UnitsInStock', name: 'Units In Stock' },
        { id: 'Discontinued', name: 'Discontinued' }
    ];

    let grid: Grid = new Grid({
        dataSource: categoryData,
        allowPaging: true,
        pageSettings: { pageCount: 2 },
        allowSorting: true,
        allowFiltering: true,
        filterSettings: { type: 'Excel' },
        columns: [
            { field: 'CategoryName', headerText: 'Category Name', width: 160 },
            { field: 'ProductName', headerText: 'Product Name', width: 170 },
            { field: 'UnitsInStock', headerText: 'Units In Stock', width: 170, textAlign: 'Right' },
            {
                field: 'Discontinued', headerText: 'Discontinued', width: 150, textAlign: 'Center', type: 'boolean',
                displayAsCheckBox: true
            }
        ]
    });
    grid.appendTo('#Grid');

    let dropDownListObject: DropDownList = new DropDownList({
        dataSource: columnsName,
        fields: { text: 'name', value: 'id' },
        value: 'CategoryName',
        change: (e: ChangeEventArgs) => {
            let columnName: string = <string>e.value;
            let column: Column = grid.getColumnByField(columnName);
            if (column.visible === undefined || column.visible) {
                show.disabled = true;
                hide.disabled = false;
            } else {
                hide.disabled = true;
                show.disabled = false;
            }
        }
    });
    dropDownListObject.appendTo('#ddlelement');

    let show: Button = new Button({ disabled: true });
    show.appendTo('#show');

    let hide: Button = new Button();
    hide.appendTo('#hide');

    let hiddenColumns: HTMLTextAreaElement = document.getElementById('hiddencolumns') as HTMLTextAreaElement;
    document.getElementById('show').addEventListener('click', () => {
        let columnName: string = <string>dropDownListObject.value;
        let column: Column = grid.getColumnByField(columnName);
        grid.showHider.show(column.headerText, 'headerText');
        show.disabled = true;
        hide.disabled = false;
        hiddenColumns.value = hiddenColumns.value.replace(column.headerText + '\n', '');
    });
    document.getElementById('hide').addEventListener('click', () => {
        let columnName: string = <string>dropDownListObject.value;
        let column: Column = grid.getColumnByField(columnName);
        if (grid.getHeaderTable().querySelectorAll('th.e-hide').length === 3) {
            alert('Atleast one Column should be visible');
        } else {
            grid.showHider.hide(column.headerText, 'headerText');
            hide.disabled = true;
            show.disabled = false;
            hiddenColumns.value = hiddenColumns.value + column.headerText + '\n';
        }
    });
};