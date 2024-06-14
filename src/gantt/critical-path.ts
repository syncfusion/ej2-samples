import { loadCultureFiles } from '../common/culture-loader';
import { Gantt, Selection, Toolbar, CriticalPath, Edit } from '@syncfusion/ej2-gantt';
import { projectNewData } from './data-source';

/**
 * Critical Path Gantt sample
 */

Gantt.Inject(Selection, Toolbar, CriticalPath, Edit);
(window as any).default = (): void => {
    loadCultureFiles();
    let gantt: Gantt = new Gantt(
        {
            dataSource: projectNewData,
            height: '450px',
            enableCriticalPath: true,
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
            editSettings: {
                allowAdding: true,
                allowEditing: true,
                allowDeleting: true,
                allowTaskbarEditing: true,
                showDeleteConfirmDialog: true
            },
            treeColumnIndex: 1,
            toolbar: ['Add','Edit','Delete','CriticalPath'],
            columns: [
                { field: 'TaskID', width: 80 },
                { field: 'TaskName',headerText: 'Name', width: 250 },
                { field: 'StartDate' },
                { field: 'EndDate' },
                { field: 'Duration' },
                { field: 'Predecessor' },
                { field: 'Progress' },
            ],
            labelSettings: {
                leftLabel: 'TaskName'
            },
            projectStartDate: new Date('03/24/2024'),
            projectEndDate: new Date('07/06/2024')
        });
    gantt.appendTo('#CriticalPath');
};
