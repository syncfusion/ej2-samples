import { Grid, Page } from '@syncfusion/ej2-grids';
import { productData } from './datasource';

Grid.Inject(Page);

/**
 * Hover sample
 */
this.default = (): void => {
    let grid: Grid = new Grid({
        dataSource: productData,
        allowPaging: true,
        allowSelection: false,
        enableHover: true,
        columns: [
            { field: 'ProductID', headerText: 'Product ID', width: 130, textAlign: 'right' },
            { field: 'ProductName', headerText: 'Product Name', width: 170 },
            { field: 'UnitPrice', headerText: 'Unit Price', width: 135, textAlign: 'right', format: 'C2' },
            { field: 'UnitsInStock', headerText: 'Units In Stock', width: 160, textAlign: 'right' },
            {
                field: 'Discontinued', headerText: 'Discontinued', width: 150, textAlign: 'center',
                type: 'boolean', displayAsCheckBox: true
            },
        ],
        pageSettings: { pageCount: 5 }
    });
    grid.appendTo('#Grid');
};
