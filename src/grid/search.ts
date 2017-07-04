import { Grid, Page, Selection } from '@syncfusion/ej2-grids';
import { categoryData } from './datasource';
import { KeyboardEventArgs } from '@syncfusion/ej2-base';

Grid.Inject(Page, Selection);

/**
 * Search Grid sample
 */
this.default = (): void => {
    let grid: Grid = new Grid(
        {
            dataSource: categoryData,
            allowPaging: true,
            columns: [
                { field: 'CategoryName', headerText: 'Category Name', width: 160 },
                { field: 'ProductName', headerText: 'Product Name', width: 170 },
                { field: 'QuantityPerUnit', headerText: 'Quantity Per Unit', width: 170, textAlign: 'right' },
                { field: 'UnitsInStock', headerText: 'Units In Stock', width: 170, textAlign: 'right' },
                {
                    field: 'Discontinued', headerText: 'Discontinued', width: 150,
                    textAlign: 'center', displayAsCheckBox: true, type: 'boolean'
                }
            ],
            pageSettings: { pageCount: 5 }
        });
    grid.appendTo('#Grid');
    let searchKey: HTMLInputElement = document.getElementById('txt') as HTMLInputElement;
    document.getElementById('btn').onclick = () => {
        grid.search(searchKey.value);
    };

    searchKey.onkeyup = (e: KeyboardEventArgs) => {
        if (e.keyCode === 13) {
            grid.search(searchKey.value);
        }
    };
};
