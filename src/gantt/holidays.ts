import { loadCultureFiles } from '../common/culture-loader';
import { Gantt, Selection, DayMarkers } from '@syncfusion/ej2-gantt';
import { projectNewData } from './data-source';

/**
 * Default Gantt sample
 */

Gantt.Inject(Selection, DayMarkers);
(window as any).default = (): void => {
    loadCultureFiles();
    let gantt: Gantt = new Gantt(
        {
            dataSource: projectNewData,
            height: '450px',
            highlightWeekends: true,
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
            treeColumnIndex: 1,
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
            holidays: [
                {
                    from: new Date('04/04/2024'),
                    to: new Date('04/04/2024'),
                    label: 'Local Holiday'
                }, {
                    from: new Date('04/19/2024'),
                    to: new Date('04/19/2024'),
                    label: 'Good Friday'
                }, {
                    from: new Date('04/30/2024'),
                    to: new Date('04/30/2024'),
                    label: 'Release Holiday'
                },
            ],
            projectStartDate: new Date('03/24/2024'),
            projectEndDate: new Date('07/06/2024')
        });
    gantt.appendTo('#Holidays');
};
