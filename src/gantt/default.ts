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
            labelSettings: {
                leftLabel: 'TaskName'
            },
            eventMarkers: [
                {
                    day: new Date('04/09/2019'),
                    label: 'Research phase'
                }, {
                    day: new Date('04/30/2019'),
                    label: 'Design phase'
                }, {
                    day: new Date('05/23/2019'),
                    label: 'Production phase'
                }, {
                    day: new Date('06/20/2019'),
                    label: 'Sales and marketing phase'
                }
            ],
            projectStartDate: new Date('03/24/2019'),
            projectEndDate: new Date('07/06/2019')
        });
    gantt.appendTo('#DefaultFunctionalities');
};
