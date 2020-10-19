import { loadCultureFiles } from '../common/culture-loader';
import { DropDownList, ChangeEventArgs } from '@syncfusion/ej2-dropdowns';
import { TreeGrid, Page } from '@syncfusion/ej2-treegrid';
import { sampleData } from './data-source';

TreeGrid.Inject( Page );

/**
 * Selection TreeGrid sample
 */
(window as any).default = (): void => {
    loadCultureFiles();
    let type: { [key: string]: Object }[] = [
        { id: 'Single', type: 'Single' },
        { id: 'Multiple', type: 'Multiple' }
    ];
    let mode: { [key: string]: Object }[] = [
        { id: 'Row', mode: 'Row' },
        { id: 'Cell', mode: 'Cell' },
    ];
    let cellmode: { [key: string]: Object }[] = [
        { id: 'Flow', mode: 'Flow' },
        { id: 'Box', mode: 'Box' }
    ];
    let treegrid: TreeGrid = new TreeGrid(
        {
            dataSource: sampleData,
            allowPaging: true,
            pageSettings: {pageSize: 10},
            allowSelection: true,
            selectionSettings: { type: 'Multiple'},
            childMapping: 'subtasks',
            height: 350,
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
    let dropDownType: DropDownList = new DropDownList({
        dataSource: type,
        fields: { text: 'type', value: 'id' },
        value: 'Multiple',
        change: (e: ChangeEventArgs) => {
            let type: any = <string>e.value;
            let mode: any = <string>dropDownMode.value;
            treegrid.selectionSettings.type = type;
            if ( type === 'Multiple' && mode === 'Cell' ) {
                document.getElementById('cellselection').style.display = 'table-row';
            } else {
                document.getElementById('cellselection').style.display = 'none';
            }
        }
    });
    dropDownType.appendTo('#type');

    let dropDownMode: DropDownList = new DropDownList({
        dataSource: mode,
        fields: { text: 'mode', value: 'id' },
        value: 'Row',
        change: (e: ChangeEventArgs) => {
            let mode: any = e.value;
            let type: any = <string>dropDownType.value;
            treegrid.selectionSettings.mode = mode;
            if ( type === 'Multiple' && mode === 'Cell' ) {
                document.getElementById('cellselection').style.display = 'table-row';
            } else {
                document.getElementById('cellselection').style.display = 'none';
            }
        }
    });
    dropDownMode.appendTo('#mode');
    let dropDownCellMode: DropDownList = new DropDownList({
        dataSource: cellmode,
        fields: { text: 'mode', value: 'id' },
        value: 'Flow',
        change: (e: ChangeEventArgs) => {
            let cellmode: any = <string>e.value;
            treegrid.selectionSettings.cellSelectionMode = cellmode;
        }
    });
    dropDownCellMode.appendTo('#cellmode');
};