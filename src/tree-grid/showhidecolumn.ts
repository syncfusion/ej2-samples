import { loadCultureFiles } from '../common/culture-loader';
import { DropDownList, ChangeEventArgs } from '@syncfusion/ej2-dropdowns';
import { Button } from '@syncfusion/ej2-buttons';
import { TreeGrid, Column, Page} from '@syncfusion/ej2-treegrid';
import { sampleData } from './data-source';

TreeGrid.Inject(Page);

/**
 * Show or Hide Columns TreeGrid sample
 */
(window as any).default = (): void => {
    loadCultureFiles();
    let columnsName: { [key: string]: Object }[] = [
        { id: 'taskID', name: 'Task ID' },
        { id: 'startDate', name: 'Start Date' },
        { id: 'duration', name: 'Duration' },
        { id: 'progress', name: 'Progress' }
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
                { field: 'startDate', headerText: 'Start Date', textAlign: 'Right', width: 105, format: { skeleton: 'yMd', type: 'date' } },
                { field: 'duration', headerText: 'Duration', textAlign: 'Right', width: 80 },
                { field: 'progress', headerText: 'Progress', textAlign: 'Right', width: 80 }
            ]
        });
    treegrid.appendTo('#TreeGrid');
    let dropDownListObject: DropDownList = new DropDownList({
        dataSource: columnsName,
        fields: { text: 'name', value: 'id' },
        width:'125px',
        value: 'taskID',
        change: (e: ChangeEventArgs) => {
            let columnName: string = <string>e.value;
            let column: Column = treegrid.getColumnByField(columnName);
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
        let columnName: string = <string>dropDownListObject.value;
        let column: Column = treegrid.getColumnByField(columnName);
        treegrid.showColumns(column.headerText, 'headerText');
        show.disabled = true;
        hide.disabled = false;
        hiddenColumns.value = hiddenColumns.value.replace(column.headerText + '\n', '');
    });
    document.getElementById('hide').addEventListener('click', () => {
        let columnName: string = <string>dropDownListObject.value;
        let column: Column = treegrid.getColumnByField(columnName);
        if (treegrid.getHeaderTable().querySelectorAll('th.e-hide').length === 3) {
            alert('Atleast one Column should be visible');
        } else {
            treegrid.hideColumns(column.headerText, 'headerText');
            hide.disabled = true;
            show.disabled = false;
            hiddenColumns.value = hiddenColumns.value + column.headerText + '\n';
        }
    });
};