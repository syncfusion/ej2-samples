import { loadCultureFiles } from '../common/culture-loader';
import { Gantt, Selection, DayMarkers  } from '@syncfusion/ej2-gantt';
import { projectNewData } from './data-source';

/**
 * Local data Gantt sample
 */

Gantt.Inject(Selection, DayMarkers );
(window as any).default = (): void => {
    loadCultureFiles();
    let gantt: Gantt = new Gantt(
        {
            dataSource: projectNewData,
            height: '450px',
            highlightWeekends: true,
            allowSelection: true,
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
            labelSettings: {
                leftLabel: 'TaskName'
            },
            splitterSettings: {
                position: "35%"
            },
            projectStartDate: new Date('03/24/2024'),
            projectEndDate: new Date('07/06/2024')
        });
    gantt.appendTo('#LocalData');
};
