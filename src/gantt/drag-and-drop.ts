import { loadCultureFiles } from '../common/culture-loader';
import { Gantt, Selection, RowDD, Edit } from '@syncfusion/ej2-gantt';
import { projectNewData } from './data-source';

/**
 * Drag and Drop Gantt sample
 */

Gantt.Inject(Selection, RowDD, Edit);
(window as any).default = (): void => {
    loadCultureFiles();
    let gantt: Gantt = new Gantt(
        {
            dataSource: projectNewData,
            height: '450px',
            allowRowDragAndDrop: true,
            treeColumnIndex: 1,
            splitterSettings: {
                columnIndex: 3
            },
            selectionSettings: {
                type: 'Multiple'
            },
            columns: [
                { field: 'TaskID', headerText: 'ID', width: 80 },
                { field: 'TaskName', headerText: 'Name', width: 250 },
                { field: 'StartDate' },
                { field: 'EndDate' },
                { field: 'Duration' },
                { field: 'Progress' },
                { field: 'Predecessor', headerText: 'Dependency' }
            ],
            taskFields: {
                id: 'TaskID',
                name: 'TaskName',
                startDate: 'StartDate',
                endDate: 'EndDate',
                duration: 'Duration',
                progress: 'Progress',
                dependency: 'Predecessor',
                child: 'subtasks'
            },
            labelSettings: {
                leftLabel: 'TaskName'
            },
            projectStartDate: new Date('03/24/2019'),
            projectEndDate: new Date('07/06/2019')
        });
    gantt.appendTo('#DragAndDrop');
};
