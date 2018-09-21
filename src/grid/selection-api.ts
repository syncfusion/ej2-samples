import { NumericTextBox } from '@syncfusion/ej2-inputs';
import { Button } from '@syncfusion/ej2-buttons';
import { Grid, Selection, Page } from '@syncfusion/ej2-grids';
import { inventoryData } from './data-source';

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
            selectionSettings: { type: 'Multiple' },
            enableHover: false,
            columns: [
                { field: 'Inventor', headerText: 'Inventor Name', width: 180 },
                { field: 'NumberofPatentFamilies', headerText: 'No of Patent Families', width: 195, textAlign: 'Right' },
                { field: 'Country', headerText: 'Country', width: 120 },
                { field: 'Active', headerText: 'Active', width: 130}
            ],
            pageSettings: { pageCount: 2 }
        });
    grid.appendTo('#Grid');
    let start: NumericTextBox = new NumericTextBox({
        format: '##',
        min: 0,
        max: 11
    });

    start.appendTo('#start');
    let to: NumericTextBox = new NumericTextBox({
        min: 0,
        max: 11,
        format: '##'
    });
    to.appendTo('#to');

    let select: Button = new Button();
    select.appendTo('#select');

    let clear: Button = new Button();
    clear.appendTo('#clear');

    document.getElementById('select').onclick = () => {
        let startRow: number = start.value;
        let toRow: number = to.value;
        grid.selectionModule.selectRowsByRange(startRow, toRow);
    };
    document.getElementById('clear').onclick = () => {
        grid.clearSelection();
    };
};