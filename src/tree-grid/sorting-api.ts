import { loadCultureFiles } from '../common/culture-loader';
import { Button } from '@syncfusion/ej2-buttons';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { TreeGrid, Sort, Page } from '@syncfusion/ej2-treegrid';
import { SortDirection } from '@syncfusion/ej2-grids';
import { sampleData } from './data-source';

TreeGrid.Inject(Sort, Page);
/**
 * Sorting sample
 */
(window as any).default = (): void => {
    loadCultureFiles();
    let columnsName: { [key: string]: Object }[] = [
        { id: 'taskID', name: 'Task ID' },
        { id: 'taskName', name: 'Task Name' },
        { id: 'progress', name: 'Progress' }
    ];
    let direction: { [key: string]: Object }[] = [
        { id: 'Ascending', name: 'Ascending' },
        { id: 'Descending', name: 'Descending' }
    ];
    let grid: TreeGrid = new TreeGrid(
        {
            dataSource: sampleData,
            height: 410,
            allowSorting: true,
            childMapping: 'subtasks',
            treeColumnIndex: 1,
            columns: [
                { field: 'taskID', headerText: 'Task ID', textAlign: 'Right', width: 80 },
                { field: 'taskName', headerText: 'Task Name', width: 200 },
                { field: 'startDate', headerText: 'Start Date', textAlign: 'Right', width: 100, format: { skeleton: 'yMd', type: 'date' } },
                { field: 'progress', headerText: 'Progress', textAlign: 'Right', width: 90 }
            ]
        });
    grid.appendTo('#Grid');

    let dropDownColumns: DropDownList = new DropDownList({
        dataSource: columnsName,
        fields: { text: 'name', value: 'id' },
        width:'135px',
        value: 'taskID'
    });
    dropDownColumns.appendTo('#columns');

    let dropDownDirection: DropDownList = new DropDownList({
        dataSource: direction,
        fields: { text: 'name', value: 'id' },
        width:'135px',
        value: 'Ascending'
    });
    dropDownDirection.appendTo('#direction');

    let sort: Button = new Button();
    sort.appendTo('#sort');

    let clear: Button = new Button();
    clear.appendTo('#clear');

    document.getElementById('sort').onclick = () => {
        let columnName: string = <string>dropDownColumns.value;
        let sortType: string = <string>dropDownDirection.value;
        grid.sortByColumn(columnName, <SortDirection>sortType, false);
    };
    document.getElementById('clear').onclick = () => {
        grid.clearSorting();
    };
};
