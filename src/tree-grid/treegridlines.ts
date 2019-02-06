import { loadCultureFiles } from '../common/culture-loader';
import { DropDownList, ChangeEventArgs } from '@syncfusion/ej2-dropdowns';
import { TreeGrid, Page } from '@syncfusion/ej2-treegrid';
import { sampleData } from './data-source';

TreeGrid.Inject( Page );

/**
 * Showing Gridlines in TreeGrid sample
 */
(window as any).default = (): void => {
    loadCultureFiles();
    let lines: { [key: string]: Object }[] = [
        { id: 'Horizontal', type: 'Horizontal' },
        { id: 'Vertical', type: 'Vertical' },
        { id: 'Both', type: 'Both' },
        { id: 'None', type: 'None' }
    ];

    let treegrid: TreeGrid = new TreeGrid(
        {
            dataSource: sampleData,
            allowPaging: true,
            pageSettings: {pageSize: 10},
            childMapping: 'subtasks',
            treeColumnIndex: 1,
            gridLines: 'Vertical',
            columns: [
                { field: 'taskID', headerText: 'Task ID', textAlign: 'Right', width: 80 },
                { field: 'taskName', headerText: 'Task Name', width: 200 },
                { field: 'startDate', headerText: 'Start Date', textAlign: 'Right', width: 100, format: { skeleton: 'yMd', type: 'date' } },
                { field: 'duration', headerText: 'Duration', textAlign: 'Right', width: 90 },
                { field: 'progress', headerText: 'Progress', textAlign: 'Right', width: 90 }
            ]
        });
    treegrid.appendTo('#TreeGrid');
    let dropDownListObject: DropDownList = new DropDownList({
        dataSource: lines,
        popupWidth: '100%',
        width: 100,
        fields: { text: 'type', value: 'id' },
        value: 'Vertical',
        change: (e: ChangeEventArgs) => {
            let lines: any = <string>e.value;
            treegrid.gridLines = lines;
            treegrid.refresh();
        },
    });
    dropDownListObject.appendTo('#ddlelement');
};