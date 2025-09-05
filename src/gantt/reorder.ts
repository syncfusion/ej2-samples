import { loadCultureFiles } from '../common/culture-loader';
import { DropDownList, ChangeEventArgs } from '@syncfusion/ej2-dropdowns';
import { ActionEventArgs } from '@syncfusion/ej2-grids';
import { Gantt, Selection, Reorder } from '@syncfusion/ej2-gantt';
import { Column} from '@syncfusion/ej2-treegrid';
import { projectNewData } from './data-source';

/**
 *  Reorder Gantt sample
 */
Gantt.Inject(Selection, Reorder);
(window as any).default = (): void => {
    loadCultureFiles();
    let columnNames: { [key: string]: Object }[] = [
        { id: 'TaskID', name: 'ID' },
        { id: 'TaskName', name: 'Name' },
        { id: 'StartDate', name: 'Start Date' },
        { id: 'EndDate', name: 'End Date' },
        { id: 'Duration', name: 'Duration' },
        { id: 'Progress', name: 'Progress' },
        { id: 'Predecessor', name: 'Dependency' }
    ];
    let columnsIndex: { [key: string]: Object }[] = [
        { id: '0', name: '1' },
        { id: '1', name: '2' },
        { id: '2', name: '3' },
        { id: '3', name: '4' },
        { id: '4', name: '5' },
        { id: '5', name: '6' },
        { id: '6', name: '7' }
    ];

    let gantt: Gantt = new Gantt(
        {
            dataSource: projectNewData,
            height: '650px',
            rowHeight:46,
            taskbarHeight:25,
            highlightWeekends: true,
            allowReordering: true,
            taskFields: {
                id: 'TaskID',
                name: 'TaskName',
                startDate: 'StartDate',
                endDate: 'EndDate',
                duration: 'Duration',
                progress: 'Progress',
                dependency: 'Predecessor',
                parentID: 'ParentId'
            },
            columns: [
                { field: 'TaskID', headerText: 'ID', width: 100 },
                { field: 'TaskName', headerText: 'Name', width: 250 },
                { field: 'StartDate' },
                { field: 'EndDate' },
                { field: 'Duration' },
                { field: 'Progress' },
                { field: 'Predecessor', headerText: 'Dependency' }
            ],
            treeColumnIndex: 1,
            labelSettings: {
                rightLabel: 'TaskName'
            },
            splitterSettings: {
                columnIndex: 4
            },
            actionComplete: (args: ActionEventArgs) => {
                if (args.requestType === 'reorder') {
                    let columnName: string = <string>dropDownColumn.value;
                    let index: number = gantt.treeGrid.getColumnIndexByField(columnName);
                    dropDownIndex.value = index.toString();
                }
            },
            projectStartDate: new Date('03/31/2025'),
            projectEndDate: new Date('07/20/2025')
        });
    gantt.appendTo('#ReorderColumn');

    let dropDownColumn: DropDownList = new DropDownList({
        dataSource: columnNames,
        fields: { text: 'name', value: 'id' },
        value: 'TaskID',
        change: (e: ChangeEventArgs) => {
            let columnName: string = <string>e.value;
            let index: number = gantt.treeGrid.getColumnIndexByField(columnName);
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
            gantt.reorderColumns(columnName, (<Column>gantt.treeGrid.columns[toColumnIndex]).field);
        }
    });
    dropDownIndex.appendTo('#columnIndex');

};
