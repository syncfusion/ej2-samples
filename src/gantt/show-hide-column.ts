import { loadCultureFiles } from '../common/culture-loader';
import { DropDownList, ChangeEventArgs } from '@syncfusion/ej2-dropdowns';
import { Button } from '@syncfusion/ej2-buttons';
import { Column} from '@syncfusion/ej2-grids';
import { Gantt, Selection } from '@syncfusion/ej2-gantt';
import { projectNewData } from './data-source';

/**
 *  Hide/Show columns support in Gantt sample
 */
Gantt.Inject(Selection);
(window as any).default = (): void => {
    loadCultureFiles();
    let columnsName: { [key: string]: Object }[] = [
        { id: 'TaskID', name: 'ID' },
        { id: 'StartDate', name: 'Start Date' },
        { id: 'EndDate', name: 'End Date' },
        { id: 'Duration', name: 'Duration' },
        { id: 'Predecessor', name: 'Dependency' },
        { id: 'Progress', name: 'Progress' }
    ];

    let gantt: Gantt = new Gantt(
        {
            dataSource: projectNewData,
            height: '650px',
            rowHeight:46,
            taskbarHeight:25,
            highlightWeekends: true,
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
            treeColumnIndex: 1,
            labelSettings: {
                leftLabel: 'TaskName'
            },
            splitterSettings: {
                columnIndex: 3
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
            projectStartDate: new Date('03/26/2025'),
            projectEndDate: new Date('07/20/2025')
        });
    gantt.appendTo('#ShowHideColumn');

    let dropDownListObject: DropDownList = new DropDownList({
        dataSource: columnsName,
        fields: { text: 'name', value: 'id' },
        value: 'TaskID',
        change: (e: ChangeEventArgs) => {
            let columnName: string = <string>e.value;
            let column: Column = gantt.treeGrid.grid.getColumnByField(columnName);
            if (column.visible === undefined || column.visible) {
                show.disabled = true;
                hide.disabled = false;
            } else {
                hide.disabled = true;
                show.disabled = false;
            }
        }
    });
    dropDownListObject.appendTo('#ddlelement');

    let show: Button = new Button({ disabled: true });
    show.appendTo('#show');

    let hide: Button = new Button();
    hide.appendTo('#hide');

    let hiddenColumns: HTMLTextAreaElement = document.getElementById('hiddencolumns') as HTMLTextAreaElement;
    document.getElementById('show').addEventListener('click', () => {
        let dropValue: string = <string>dropDownListObject.value;
        let columnName: string = gantt.treeGrid.getColumnByField(dropValue).headerText;
        gantt.showColumn(columnName);
        show.disabled = true;
        hide.disabled = false;
        hiddenColumns.value = hiddenColumns.value.replace(columnName + '\n', '');
    });
    document.getElementById('hide').addEventListener('click', () => {
        let dropValue: string = <string>dropDownListObject.value;
        let columnName: string =  gantt.treeGrid.getColumnByField(dropValue).headerText;
        gantt.hideColumn(columnName);
        hide.disabled = true;
        show.disabled = false;
        hiddenColumns.value = hiddenColumns.value + columnName + '\n';
    });

};
