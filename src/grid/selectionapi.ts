import { Grid, Selection, Page } from '@syncfusion/ej2-grids';
import { inventoryData } from './datasource';

Grid.Inject(Selection, Page);
/**
 * Selection API sample
 */
this.default = (): void => {
    let grid: Grid = new Grid(
        {
            dataSource: inventoryData,
            allowPaging: true,
            allowSelection: true,
            selectionSettings: { type: 'multiple' },
            enableHover: false,
            columns: [
                { field: 'Inventor', headerText: 'Inventor Name', width: 180 },
                { field: 'NumberofPatentFamilies', headerText: 'No of Patent Families', width: 195, textAlign: 'right' },
                { field: 'Country', headerText: 'Country', width: 120 },
                { field: 'Active', headerText: 'Active', width: 130}
            ],
            pageSettings: { pageCount: 2 }
        });
    grid.appendTo('#Grid');
    let start: HTMLInputElement = document.getElementById('start') as HTMLInputElement;
    let to: HTMLInputElement = document.getElementById('to') as HTMLInputElement;
    document.getElementById('select').onclick = () => {
        let startRow: number = parseInt(start.value, 10);
        let toRow: number = parseInt(to.value, 10);
        grid.selectionModule.selectRowsByRange(startRow, toRow);
    };
    document.getElementById('clear').onclick = () => {
        grid.clearSelection();
    };
};