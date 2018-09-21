import { Grid, Page, Selection } from '@syncfusion/ej2-grids';
import { inventoryData } from './data-source';

Grid.Inject(Page, Selection);
/**
 * Auto wrap sample
 */
this.default = (): void => {
    let grid: Grid = new Grid(
        {
            dataSource: inventoryData,
            allowPaging: true,
            allowTextWrap: true,
            columns: [
                { field: 'Inventor', headerText: 'Inventor Name', width: 140 },
                { field: 'NumberofPatentFamilies', headerText: 'No of Patent Families', width: 185, textAlign: 'Right' },
                { field: 'Country', headerText: 'Country', width: 120 },
                { field: 'Active', headerText: 'Active', width: 130 },
                { field: 'Mainfieldsofinvention', headerText: 'Main fields of invention', width: 180 },
            ],
            pageSettings: { pageCount: 5 }
        });
    grid.appendTo('#Grid');
};

