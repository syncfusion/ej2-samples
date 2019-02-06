import { loadCultureFiles } from '../common/culture-loader';
import { Button } from '@syncfusion/ej2-buttons';
import { NumericTextBox } from '@syncfusion/ej2-inputs';
import { TreeGrid, Page } from '@syncfusion/ej2-treegrid';
import { sampleData } from './data-source';

TreeGrid.Inject( Page );

/**
 * Selection API TreeGrid sample
 */
(window as any).default = (): void => {
    loadCultureFiles();
    let treegrid: TreeGrid = new TreeGrid(
        {
            dataSource: sampleData,
            allowPaging: true,
            pageSettings: {pageSize: 10},
            allowSelection: true,
            selectionSettings: { type: 'Multiple'},
            childMapping: 'subtasks',
            treeColumnIndex: 1,
            columns: [
                { field: 'taskID', headerText: 'Task ID', textAlign: 'Right', width: 80 },
                { field: 'taskName', headerText: 'Task Name', width: 200 },
                { field: 'startDate', headerText: 'Start Date', textAlign: 'Right', width: 100, format: { skeleton: 'yMd', type: 'date' } },
                { field: 'duration', headerText: 'Duration', textAlign: 'Right', width: 90 },
                { field: 'progress', headerText: 'Progress', textAlign: 'Right', width: 90 }
            ]
        });
    treegrid.appendTo('#TreeGrid');
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
        let rows: number[] = [];
        for ( let i: number = startRow ; i <= toRow ; i++ ) {
            rows.push(i);
        }
        treegrid.selectRows(rows);
    };
    document.getElementById('clear').onclick = () => {
        treegrid.clearSelection();
    };
};