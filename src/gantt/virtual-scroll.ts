import { loadCultureFiles } from '../common/culture-loader';
import { Gantt, Selection, VirtualScroll } from '@syncfusion/ej2-gantt';
import { virtualData } from './data-source';

/**
 * Virtual scroll sample
 */
Gantt.Inject(Selection, VirtualScroll);

(window as any).default = (): void => {
    loadCultureFiles();
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
        columns: [
            { field: 'TaskID' },
            { field: 'TaskName' },
            { field: 'StartDate' },
            { field: 'Duration' },
            { field: 'Progress' },
        ],
        allowSelection: true,
        gridLines: 'Both',
        height: '450px',
        splitterSettings: {
            columnIndex: 2
        },
        labelSettings: {
            taskLabel: 'Progress'
        },
    });
    gantt.appendTo('#VirtualScroll');
};