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
            toolbar: ['ZoomIn', 'ZoomOut', 'ZoomToFit'],
            labelSettings: {
                leftLabel: 'TaskName'
            },
            projectStartDate: new Date('03/24/2019'),
            projectEndDate: new Date('04/28/2019')
        });
    gantt.appendTo('#Zooming');
};
