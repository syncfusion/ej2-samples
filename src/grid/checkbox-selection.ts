import { Grid, Page, Toolbar, Edit } from '@syncfusion/ej2-grids';
import { inventoryData } from './data-source';

Grid.Inject(Page, Toolbar, Edit);
/**
 * Checkbox Selection API sample
 */
this.default = (): void => {
    let grid: Grid = new Grid(
        {
            dataSource: inventoryData,
            allowPaging: true,
            allowSelection: true,
            selectionSettings: { persistSelection: true },
            editSettings: {allowDeleting: true},
            toolbar: ['Delete'],
            enableHover: false,
            columns: [
                { type: 'checkbox', width: 50 },
                { field: 'Inventor', isPrimaryKey: true, headerText: 'Inventor Name', width: 180 },
                { field: 'NumberofPatentFamilies', headerText: 'No of Patent Families', width: 195, textAlign: 'Right' },
                { field: 'Country', headerText: 'Country', width: 120 },
                { field: 'Active', headerText: 'Active', width: 130}
            ],
            pageSettings: { pageCount: 2 }
        });
    grid.appendTo('#Grid');
};