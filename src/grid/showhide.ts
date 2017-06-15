import { Grid, Page, Selection, Column } from '@syncfusion/ej2-grids';
import { categoryData } from './datasource';

Grid.Inject(Page, Selection);
/**
 * Show Hide sample
 */
this.default = (): void => {
    let grid: Grid = new Grid({
        dataSource: categoryData,
        allowPaging: true,
        pageSettings: { pageCount: 2 },
        columns: [
            { field: 'CategoryName', headerText: 'Category Name', width: 160 },
            { field: 'ProductName', headerText: 'Product Name', width: 170 },
            { field: 'UnitsInStock', headerText: 'Units In Stock', width: 170, textAlign: 'right' },
            {
                field: 'Discontinued', headerText: 'Discontinued', width: 150, textAlign: 'center', type: 'boolean',
                displayAsCheckBox: true
            }
        ]
    });
    grid.appendTo('#Grid');

    let show: HTMLButtonElement = document.getElementById('show') as HTMLInputElement;
    let hide: HTMLButtonElement = document.getElementById('hide') as HTMLInputElement;
    let hiddenColumns: HTMLTextAreaElement = document.getElementById('hiddencolumns') as HTMLTextAreaElement;
    let drop: HTMLSelectElement = document.getElementById('drop') as HTMLSelectElement;
    show.onclick = () => {
        let columnName: string = drop.value;
        let column: Column = grid.getColumnByField(columnName);
        grid.showHider.show(column.headerText, 'headerText');
        show.disabled = true;
        hide.disabled = false;
        let textArea: string = hiddenColumns.value;
        hiddenColumns.value = textArea.replace(column.headerText + '\n', '');
    };
    hide.onclick = () => {
        let columnName: string = drop.value;
        let column: Column = grid.getColumnByField(columnName);
        if (grid.getHeaderTable().querySelectorAll('th.e-hide').length === 3) {
            alert('Atleast one Column should be visible');
        } else {
            grid.showHider.hide(column.headerText, 'headerText');
            hide.disabled = true;
            show.disabled = false;
            let textArea: string = hiddenColumns.value;
            hiddenColumns.value = textArea === '' ?
                column.headerText + '\n' : textArea + column.headerText + '\n';
        }
    };
    drop.onchange = () => {
        let columnName: string = drop.value;
        let column: Column = grid.getColumnByField(columnName);
        if (column.visible === undefined || column.visible) {
            show.disabled = true;
            hide.disabled = false;
        } else {
            hide.disabled = true;
            show.disabled = false;
        }
    };
};