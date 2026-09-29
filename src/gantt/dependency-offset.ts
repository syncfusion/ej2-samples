import { loadCultureFiles } from '../common/culture-loader';
import { Gantt, Edit, Selection, DayMarkers} from '@syncfusion/ej2-gantt';
import { leadLagOffsetData } from './data-source';

Gantt.Inject(Edit, Selection, DayMarkers);

(window as any).default = (): void => {
    loadCultureFiles();

    const gantt: Gantt = new Gantt({
        dataSource: leadLagOffsetData,
        taskFields: {
            id: 'TaskID',
            name: 'TaskName',
            startDate: 'StartDate',
            endDate: 'EndDate',
            duration: 'Duration',
            progress: 'Progress',
            dependency: 'Predecessor',
            parentID: 'ParentID'
        },
        allowSelection: true,
        editSettings: {
            allowAdding: true,
            allowEditing: true,
            allowDeleting: true,
            allowTaskbarEditing: true,
            showDeleteConfirmDialog: true
        },
        splitterSettings: {
            columnIndex: 3
        },
        labelSettings: {
            leftLabel: 'TaskName'
        },
        highlightWeekends: true,
        gridLines: 'Both',
        height: '650px',
        rowHeight: 46,
        taskbarHeight: 25,
        treeColumnIndex: 1,
        columns: [
            {
                field: 'TaskID',
                visible: false
            },
            {
                field: 'TaskName',
                headerText: 'Task Name',
                width: 200
            },
            {
                field: 'Predecessor',
                headerText: 'Dependency',
                width: 160
            },
            {
                field: 'StartDate',
                headerText: 'Start Date',
                width: 130
            },
            {
                field: 'Duration',
                headerText: 'Duration',
                width: 110
            },
            {
                field: 'Progress',
                headerText: 'Progress',
                width: 100
            }
        ],
        projectStartDate: new Date('01/01/2026')
    });

    gantt.appendTo('#DependencyOffset');
};