/**
 * resource.ts file
 */
import { loadCultureFiles } from '../common/culture-loader';
/**
 * resource.ts file
 */
import { splitTasksData } from './data-source';

import { Gantt, Selection, DayMarkers, Toolbar, Edit, ContextMenu } from '@syncfusion/ej2-gantt';

Gantt.Inject(Selection, DayMarkers, Toolbar, Edit, ContextMenu);
(window as any).default = (): void => {
    loadCultureFiles();
    let gantt: Gantt = new Gantt(
        {
            dataSource: splitTasksData,
            taskFields: {
                id: 'TaskID',
                name: 'TaskName',
                startDate: 'StartDate',
                endDate: 'EndDate',
                duration: 'Duration',
                progress: 'Progress',
                dependency: 'Predecessor',
                child: 'subtasks',
                segments: 'Segments'
            },
            editSettings: {
                allowAdding: true,
                allowEditing: true,
                allowDeleting: true,
                allowTaskbarEditing: true,
                showDeleteConfirmDialog: true
            },
            columns: [
                { field: 'TaskID', width: 80 },
                { field: 'TaskName', headerText: 'Job Name', width: '250', clipMode: 'EllipsisWithTooltip' },
                { field: 'StartDate' },
                { field: 'EndDate' },
                { field: 'Duration' },
                { field: 'Progress' },
                { field: 'Predecessor' }
            ],
            toolbar: ['Add', 'Edit', 'Update', 'Delete', 'Cancel', 'ExpandAll', 'CollapseAll'],
            enableContextMenu: true,
            allowSelection: true,
            height: '450px',
            treeColumnIndex: 1,
            highlightWeekends: true,
            splitterSettings: {
                columnIndex: 2
            },
            labelSettings: {
                leftLabel: 'TaskName',
                taskLabel: '${Progress}%'
            },
            projectStartDate: new Date('01/30/2019'),
            projectEndDate: new Date('03/04/2019')
        });
    gantt.appendTo('#SplitTasks');
};