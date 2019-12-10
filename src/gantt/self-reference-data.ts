import { loadCultureFiles } from '../common/culture-loader';
import { Gantt, Selection, DayMarkers  } from '@syncfusion/ej2-gantt';
import { selfData } from './data-source';

/**
 * Self reference Gantt sample
 */

Gantt.Inject(Selection, DayMarkers );
(window as any).default = (): void => {
    loadCultureFiles();
    let gantt: Gantt = new Gantt(
        {
            dataSource: selfData,
            height: '450px',
            highlightWeekends: true,
            allowSelection: true,
            treeColumnIndex: 1,
            taskFields: {
                id: 'taskID',
                name: 'taskName',
                startDate: 'startDate',
                endDate: 'endDate',
                duration: 'duration',
                progress: 'progress',
                dependency: 'predecessor',
                parentID: 'parentID'
            },
            columns: [
                { field: 'taskID', width: 60 },
                { field: 'taskName', width: 250 },
                { field: 'startDate' },
                { field: 'endDate' },
                { field: 'duration' },
                { field: 'predecessor' },
                { field: 'progress' },
            ],
            labelSettings: {
                leftLabel: 'taskName'
            },
            splitterSettings: {
                columnIndex: 2
            },
            projectStartDate: new Date('01/28/2019'),
            projectEndDate: new Date('03/10/2019')
        });
    gantt.appendTo('#SelfData');
};
