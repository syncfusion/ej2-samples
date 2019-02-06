import { loadCultureFiles } from '../common/culture-loader';
import { DropDownList, ChangeEventArgs } from '@syncfusion/ej2-dropdowns';
import { ActionEventArgs } from '@syncfusion/ej2-grids';
import { TreeGrid, Reorder, Column, Page} from '@syncfusion/ej2-treegrid';
import { sampleData } from './data-source';

TreeGrid.Inject(Reorder, Page);

/**
 * Reorder TreeGrid sample
 */
(window as any).default = (): void => {
    loadCultureFiles();
    let columnNames: { [key: string]: Object }[] = [
        { id: 'taskID', name: 'Task ID' },
        { id: 'taskName', name: 'Task Name' },
        { id: 'startDate', name: 'Start Date' },
        { id: 'duration', name: 'Duration' },
        { id: 'progress', name: 'Progress' }
    ];
    let columnsIndex: { [key: string]: Object }[] = [
        { id: '0', name: '1' },
        { id: '1', name: '2' },
        { id: '2', name: '3' },
        { id: '3', name: '4' },
        { id: '4', name: '5' }
    ];

    let treegrid: TreeGrid = new TreeGrid(
        {
            dataSource: sampleData,
            allowReordering: true,
            allowPaging: true,
            pageSettings: { pageSize: 8 },
            childMapping: 'subtasks',
            treeColumnIndex: 1,
            columns: [
                { field: 'taskID', headerText: 'Task ID', textAlign: 'Right', width: 80 },
                { field: 'taskName', headerText: 'Task Name', width: 200 },
                {
                    field: 'startDate', headerText: 'Start Date', textAlign: 'Right',
                    width: 105, format: { skeleton: 'yMd', type: 'date' }
                },
                { field: 'duration', headerText: 'Duration', width: 80, textAlign: 'Right' },
                { field: 'progress', headerText: 'Progress', width: 80, textAlign: 'Right' }
            ],
            actionComplete: (args: ActionEventArgs) => {
                if (args.requestType === 'reorder') {
                    let columnName: string = <string>dropDownColumn.value;
                    let index: number = treegrid.getColumnIndexByField(columnName);
                    dropDownIndex.value = index.toString();
                }

            }
        });
    treegrid.appendTo('#Grid');
    let dropDownColumn: DropDownList = new DropDownList({
        dataSource: columnNames,
        fields: { text: 'name', value: 'id' },
        value: 'taskID',
        change: (e: ChangeEventArgs) => {
            let columnName: string = <string>e.value;
            let index: number = treegrid.getColumnIndexByField(columnName);
            dropDownIndex.value = index.toString();

        }
    });
    dropDownColumn.appendTo('#columns');

    let dropDownIndex: DropDownList = new DropDownList({
        dataSource: columnsIndex,
        fields: { text: 'name', value: 'id' },
        value: '0',
        change: (e: ChangeEventArgs) => {
            let columnName: string = <string>dropDownColumn.value;
            let toColumnIndex: number = <number>e.value;
            treegrid.reorderColumns(columnName, (<Column>treegrid.columns[toColumnIndex]).field);
        }
    });
    dropDownIndex.appendTo('#columnIndex');
};