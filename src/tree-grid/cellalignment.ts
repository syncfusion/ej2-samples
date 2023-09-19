import { loadCultureFiles } from '../common/culture-loader';
import { DropDownList, ChangeEventArgs } from '@syncfusion/ej2-dropdowns';
import { TreeGrid, Page } from '@syncfusion/ej2-treegrid';
import { sampleData } from './data-source';

TreeGrid.Inject( Page );

/**
 * Cell Alignment TreeGrid sample
 */
(window as any).default = (): void => {
    loadCultureFiles();
    let columnNames: { [key: string]: Object }[] = [
        { id: 'taskID', name: 'Task ID' },
        { id: 'duration', name: 'Duration' },
        { id: 'startDate', name: 'Start Date' },
        { id: 'progress', name: 'Progress' },
    ];

    let alignment: { [key: string]: Object }[] = [
        { id: 'Right', name: 'Right' },
        { id: 'Left', name: 'Left' },
        { id: 'Center', name: 'Center' },
        { id: 'Justify', name: 'Justify' }
    ];
    let treegrid: TreeGrid = new TreeGrid(
        {
            dataSource: sampleData,
            allowPaging: true,
            height: 350,
            pageSettings: {pageSize: 10},
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
    setTimeout(() => {
        let dropDownColumn: DropDownList = new DropDownList({
            dataSource: columnNames,
            popupWidth: '100%',
            fields: { text: 'name', value: 'id' },
            value: 'taskID',
            change: (e: ChangeEventArgs) => {
                let columnName: string = <string>e.value;
                let alignment: any = treegrid.getColumnByField(columnName).textAlign;
                dropDownAlign.value = alignment;
            }
        });
        dropDownColumn.appendTo('#columns');

        let dropDownAlign: DropDownList = new DropDownList({
            dataSource: alignment,
            fields: { text: 'name', value: 'id' },
            value: 'Right',
            change: (e: ChangeEventArgs) => {
                let alignment: any = e.value;
                let columnName: string = <string>dropDownColumn.value;
                treegrid.getColumnByField(columnName).textAlign = alignment;
                treegrid.refreshColumns();
            }
        });
        dropDownAlign.appendTo('#alignment');
    }, 2);
};
