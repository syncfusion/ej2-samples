import { loadCultureFiles } from '../common/culture-loader';
import { Gantt, Sort, SortDirection, DayMarkers, Selection  } from '@syncfusion/ej2-gantt';
import { Button } from '@syncfusion/ej2-buttons';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { editingData } from './data-source';

/**
 * Sorting API Gantt sample
 */

Gantt.Inject(Sort, DayMarkers, Selection  );
(window as any).default = (): void => {
    loadCultureFiles();
    let gantt: Gantt = new Gantt(
        {
            dataSource: editingData,
            height: '650px',
            rowHeight:46,
            taskbarHeight:25,
            highlightWeekends: true,
            allowSelection: true,
            allowSorting: true,
            treeColumnIndex: 1,
            taskFields: {
                id: 'TaskID',
                name: 'TaskName',
                startDate: 'StartDate',
                endDate: 'EndDate',
                duration: 'Duration',
                progress: 'Progress',
                dependency: 'Predecessor',
                parentID:'ParentId'
            },
            columns: [
                { field: 'TaskID', visible:false ,headerText: 'ID', width: 80 },
                { field: 'TaskName', headerText: 'TaskName', width: 250 },
                { field: 'StartDate', headerText: 'StartDate' },
                { field: 'EndDate', headerText: 'EndDate' },
                { field: 'Duration', headerText: 'Duration' },
                { field: 'Progress', headerText: 'Progress' },
            ],
            labelSettings: {
                leftLabel: 'TaskName'
            },
            splitterSettings: {
                columnIndex: 2
            },
            projectStartDate: new Date('03/26/2025'),
            projectEndDate: new Date('09/01/2025'),
        });
    gantt.appendTo('#SortingAPI');

    let dropDownColumnList: DropDownList = new DropDownList({
        dataSource: [
            { id: 'TaskName', type: 'TaskName' },
            { id: 'StartDate', type: 'StartDate' },
            { id: 'EndDate', type: 'EndDate' },
            { id: 'Duration', type: 'Duration' },
            { id: 'Progress', type: 'Progress' }
        ],
        popupWidth: '150px',
        value: 'TaskName',
        fields: { text: 'type', value: 'id' },
    });
    dropDownColumnList.appendTo('#columns');

    let dropDownDirectionList: DropDownList = new DropDownList({
        dataSource: [
            { id: 'Ascending', type: 'Ascending' },
            { id: 'Descending', type: 'Descending' },
        ],
        popupWidth: '150px',
        value: 'Ascending',
        fields: { text: 'type', value: 'id' },
    });
    dropDownDirectionList.appendTo('#direction');

    let sort: Button = new Button();
    sort.appendTo('#sort');
    let clear: Button = new Button();
    clear.appendTo('#clear');
    document.getElementById('sort').onclick = () => {
        let columnName: string = <string>dropDownColumnList.value;
        let sortType: SortDirection = <SortDirection>dropDownDirectionList.value;
        gantt.sortModule.sortColumn(columnName, sortType, false);
    };
    document.getElementById('clear').onclick = () => {
        gantt.clearSorting();
    };
};
