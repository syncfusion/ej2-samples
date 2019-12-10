import { loadCultureFiles } from '../common/culture-loader';
import { Gantt, Selection, Filter, Sort, ColumnMenu, Resize } from '@syncfusion/ej2-gantt';
import { templateData, editingResources } from './data-source';

/**
 *  Column template Gantt sample
 */
Gantt.Inject(Selection, Filter, Sort, ColumnMenu, Resize );
(window as any).default = (): void => {
    loadCultureFiles();
    let gantt: Gantt = new Gantt(
        {
            dataSource: templateData,
            height: '450px',
            highlightWeekends: true,
            taskFields: {
                id: 'TaskID',
                name: 'TaskName',
                startDate: 'StartDate',
                endDate: 'EndDate',
                duration: 'Duration',
                progress: 'Progress',
                resourceInfo: 'resources',
                dependency: 'Predecessor',
                child: 'subtasks'
            },
            columns: [
                { field: 'TaskID', headerText: 'Task ID', textAlign: 'Left' },
                { field: 'TaskName', headerText: 'Task Name', width: '250' },
                { field: 'resources', headerText: 'Resources', width: '250', template: '#columnTemplate' },
                { field: 'StartDate', headerText: 'Start Date', width: '150' },
                { field: 'Duration', headerText: 'Duration', width: '150' },
                { field: 'Progress', headerText: 'Progress', width: '150' },
            ],
            treeColumnIndex: 1,
            labelSettings: {
                leftLabel: 'TaskName'
            },
            splitterSettings: {
                columnIndex: 3
            },
            rowHeight: 60,
            resourceNameMapping: 'resourceName',
            resourceIDMapping: 'resourceId',
            resources: editingResources,
            projectStartDate: new Date('03/24/2019'),
            projectEndDate: new Date('07/06/2019')
        });
    gantt.appendTo('#ColumnTemplate');
};
