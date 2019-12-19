import { loadCultureFiles } from '../common/culture-loader';

import { Gantt, Selection, DayMarkers } from '@syncfusion/ej2-gantt';
import { editingData, editingResources } from './data-source';

/**
 * Editing Gantt sample
 */
Gantt.Inject(Selection, DayMarkers);
(window as any).default = (): void => {
    loadCultureFiles();
    let gantt: Gantt = new Gantt(
        {
            dataSource: editingData,
            dateFormat: 'MMM dd, y',
            taskFields: {
                id: 'TaskID',
                name: 'TaskName',
                startDate: 'StartDate',
                endDate: 'EndDate',
                duration: 'Duration',
                progress: 'Progress',
                dependency: 'Predecessor',
                child: 'subtasks',
                notes: 'info',
                resourceInfo: 'resources'
            },
            allowSelection: true,
            height: '450px',
            treeColumnIndex: 1,
            resourceNameMapping: 'resourceName',
            resourceIDMapping: 'resourceId',
            resources: editingResources,
            highlightWeekends: true,
            columns: [
                { field: 'TaskID', width: 60 },
                { field: 'TaskName', headerText: 'Job Name', width: '150', clipMode: 'EllipsisWithTooltip' },
                { field: 'resources', width: '250' },
                { field: 'StartDate' },
                { field: 'Duration' },
                { field: 'Progress' },
                { field: 'Predecessor' }
            ],
            labelSettings: {
                leftLabel: 'TaskName',
                rightLabel: 'resources'
            },
            splitterSettings: {
                columnIndex: 3
            },
            projectStartDate: new Date('03/25/2019'),
            projectEndDate: new Date('07/28/2019')
        });
    gantt.appendTo('#resource');
};
