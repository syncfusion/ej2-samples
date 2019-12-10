import { loadCultureFiles } from '../common/culture-loader';
import { Gantt, Selection, Toolbar, Edit, Filter, DayMarkers  } from '@syncfusion/ej2-gantt';
import { projectNewData } from './data-source';

/**
 * Keyboard Interaction Gantt sample
 */

Gantt.Inject(Selection, Toolbar, Edit, Filter, DayMarkers );
(window as any).default = (): void => {
    loadCultureFiles();
    let gantt: Gantt = new Gantt(
        {
            dataSource: projectNewData,
            height: '450px',
            highlightWeekends: true,
            allowSelection: true,
            allowKeyboard: true,
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
                { field: 'TaskID', width: 70 },
                { field: 'TaskName', width: 250 },
                { field: 'StartDate' },
                { field: 'EndDate' },
                { field: 'Duration' },
                { field: 'Predecessor' },
                { field: 'Progress' },
            ],
            toolbar: ['Search'],
            editSettings: {
                allowAdding: true,
                allowEditing: true,
                allowDeleting: true,
            },
            labelSettings: {
                leftLabel: 'TaskName'
            },
            splitterSettings: {
                columnIndex: 2
            },
            projectStartDate: new Date('03/24/2019'),
            projectEndDate: new Date('07/06/2019')
        });
    gantt.appendTo('#KeyboardNavigation');
};
