import { loadCultureFiles } from '../common/culture-loader';
import { Gantt, Selection, VirtualScroll,Sort,Filter } from '@syncfusion/ej2-gantt';
import { virtualData } from './data-source';
import { DropDownList } from '@syncfusion/ej2-dropdowns';

/**
 * Virtual scroll sample
 */
Gantt.Inject(Selection, VirtualScroll,Sort,Filter);

(window as any).default = (): void => {
    loadCultureFiles();
    var indicatortypes = [
        { id: 'Shimmer', type: 'Shimmer' },
        { id: 'Spinner', type: 'Spinner' },
    ];
    let gantt: Gantt = new Gantt({
        dataSource: virtualData,
        treeColumnIndex: 1,
        taskFields: {
            id: 'TaskID',
            name: 'TaskName',
            startDate: 'StartDate',
            duration: 'Duration',
            progress: 'Progress',
            parentID: 'parentID'
        },
        enableVirtualization: true,
        allowSorting: true,
        allowFiltering: true,
        loadingIndicator: { indicatorType: 'Shimmer' },
        columns: [
            { field: 'TaskID' },
            { field: 'TaskName', width:'200px'},
            { field: 'StartDate',width: 170 },
            { field: 'Duration' },
            { field: 'Progress' },
        ],
        allowSelection: true,
        gridLines: 'Both',
        height: '650px',
        rowHeight:46,
        taskbarHeight:25,
        splitterSettings: {
            columnIndex: 2
        },
        labelSettings: {
            taskLabel: 'Progress'
        },
    });
    gantt.appendTo('#LoadingAnimation');
    let dropDownMode: DropDownList = new DropDownList({
        dataSource: indicatortypes,
        fields: { text: 'type', value: 'id' },
        value: 'Shimmer',
        width: '125px',
        change: function (e:any) {
            if (dropDownMode.value === 'Shimmer') {
                gantt.loadingIndicator.indicatorType = 'Shimmer';
                gantt.enableVirtualMaskRow = true ;
                gantt.refresh();
            } else {
                gantt.loadingIndicator.indicatorType = 'Spinner';
                gantt.enableVirtualMaskRow = false ;
                gantt.refresh();
            }
        },
    });
    dropDownMode.appendTo('#indicatorType');
};