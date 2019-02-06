import { loadCultureFiles } from '../common/culture-loader';
import { Grid, Page, Selection, Toolbar } from '@syncfusion/ej2-grids';
import { categoryData } from './data-source';

Grid.Inject(Page, Selection, Toolbar);

/**
 * Search Grid sample
 */
(window as any).default = (): void => {
    loadCultureFiles();
    let grid: Grid = new Grid(
        {
            dataSource: categoryData,
            allowPaging: true,
            toolbar: ['Search'],
            columns: [
                { field: 'CategoryName', headerText: 'Category Name', width: 160 },
                { field: 'ProductName', headerText: 'Product Name', width: 170 },
                { field: 'QuantityPerUnit', headerText: 'Quantity Per Unit', width: 170, textAlign: 'Right' },
                { field: 'UnitsInStock', headerText: 'Units In Stock', width: 170, textAlign: 'Right' },
                {
                    field: 'Discontinued', headerText: 'Discontinued', width: 150,
                    textAlign: 'Center', displayAsCheckBox: true, type: 'boolean'
                }
            ],
            pageSettings: { pageCount: 5 }
        });
    grid.appendTo('#Grid');
};
