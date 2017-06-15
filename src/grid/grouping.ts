import { Grid, Sort, Page, Selection, Group } from '@syncfusion/ej2-grids';
import { inventoryData } from './datasource';

Grid.Inject(Sort, Page, Selection, Group);

/**
 * Grouping sample
 */
this.default = (): void => {
    let grid: Grid = new Grid({
        dataSource: inventoryData,
        allowPaging: true,
        allowSorting: true,
        allowGrouping: true,
        groupSettings: {columns: ['Country']},
        height: 400,
        columns: [
            { field: 'Inventor', headerText: 'Inventor Name', width: 160 },
            { field: 'NumberofPatentFamilies', headerText: 'No of Patent Families', width: 195, textAlign: 'right' },
            { field: 'Country', headerText: 'Country', width: 120 },
            { field: 'Active', headerText: 'Active', width: 120 },
            { field: 'Mainfieldsofinvention', headerText: 'Main fields of invention', width: 200 },
        ],
        pageSettings: { pageCount: 5 }
    });
    grid.appendTo('#Grid');
};
