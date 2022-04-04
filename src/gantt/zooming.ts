import { loadCultureFiles } from '../common/culture-loader';

import { Gantt, Toolbar } from '@syncfusion/ej2-gantt';
import { zoomingData } from './data-source';

/**
 * Zooming Gantt sample
 */
Gantt.Inject(Toolbar);
(window as any).default = (): void => {
    loadCultureFiles();
    let gantt: Gantt = new Gantt(
        {
            dataSource: zoomingData,
            height: '450px',
            treeColumnIndex: 1,
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
            columns: [
                { field: 'TaskID', width: 80 },
                { field: 'TaskName', width: 250 },
                { field: 'StartDate' },
                { field: 'EndDate' },
                { field: 'Duration' },
                { field: 'Predecessor' },
                { field: 'Progress' },
            ],
            toolbar: ['ZoomIn', 'ZoomOut', 'ZoomToFit'],
            labelSettings: {
                leftLabel: 'TaskName'
            },
            splitterSettings: {
                columnIndex: 2
            },
            projectStartDate: new Date('03/24/2019'),
            projectEndDate: new Date('04/28/2019')
        });
    gantt.appendTo('#Zooming');
};
