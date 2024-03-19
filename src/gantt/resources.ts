/**
 * resource.ts file
 */
import { loadCultureFiles } from '../common/culture-loader';
/**
 * resource.ts file
 */
import { resourceData, resourceResources } from './data-source';

import { Gantt, Selection, DayMarkers, Toolbar, Edit } from '@syncfusion/ej2-gantt';

Gantt.Inject(Selection, DayMarkers, Toolbar, Edit);
(window as any).default = (): void => {
    loadCultureFiles();
    let gantt: Gantt = new Gantt(
        {
            dataSource: resourceData,
            taskFields: {
                id: 'TaskID',
                name: 'TaskName',
                startDate: 'StartDate',
                duration: 'Duration',
                progress: 'Progress',
                dependency: 'Predecessor',
                resourceInfo: 'resources',
                work: 'work',
                child: 'subtasks',
                type: 'taskType'
            },
            taskType:'FixedWork',
            editSettings: {
                allowAdding: true,
                allowEditing: true,
                allowDeleting: true,
                allowTaskbarEditing: true,
                showDeleteConfirmDialog: true
            },
            resources: resourceResources,
            resourceFields: {
                id: 'resourceId',
                name: 'resourceName',
                unit: 'unit'
            },
            workUnit: 'Hour',
            toolbar: ['Add', 'Edit', 'Update', 'Delete', 'Cancel', 'ExpandAll', 'CollapseAll'],
            allowSelection: true,
            height: '450px',
            treeColumnIndex: 1,
            highlightWeekends: true,
            columns: [
                { field: 'TaskID', visible: false },
                { field: 'TaskName', headerText: 'Task Name', width: '180' },
                { field: 'resources', headerText: 'Resources', width: '160' },
                { field: 'work', width: '110' },
                { field: 'Duration', width: '100' },
                { field: 'taskType', headerText: 'Task Type', width: '110' }
            ],
            editDialogFields: [
                { type: 'General', headerText: 'General' },
                { type: 'Dependency' },
                { type: 'Resources' }
            ],
            labelSettings: {
                rightLabel: 'resources'
            },
            splitterSettings: {
                columnIndex: 5.1
            },
            projectStartDate: new Date('03/28/2019'),
            projectEndDate: new Date('07/28/2019')
        });
    gantt.appendTo('#resource');
};
