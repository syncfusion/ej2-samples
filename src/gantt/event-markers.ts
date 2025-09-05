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
            height: '650px',
            rowHeight:46,
            taskbarHeight:25,
            highlightWeekends: true,
            taskFields: {
                id: 'TaskID',
                name: 'TaskName',
                startDate: 'StartDate',
                endDate: 'EndDate',
                duration: 'Duration',
                progress: 'Progress',
                dependency: 'Predecessor',
                parentID: 'ParentId'
            },
            timelineSettings: {
                topTier: {
                    unit: 'Week',
                    format: 'EEE MMM dd'
                },
                bottomTier: {
                    unit: 'Day',
                    format: ''
                }
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
            eventMarkers: [
                {
                    day: new Date('04/07/2025'),
                    label: 'Research phase'               
                }, {
                    day: new Date('04/17/2025'),
                    label: 'Design phase'
                }, {
                    day: new Date('05/23/2025'),
                    label: 'Production phase'
                }, {
                    day: new Date('06/27/2025'),
                    label: 'Sales and marketing phase'
                }
            ],
            projectStartDate: new Date('03/23/2025'),
            projectEndDate: new Date('07/20/2025')
        });
    gantt.appendTo('#EventMarkers');
};
