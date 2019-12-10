import { loadCultureFiles } from '../common/culture-loader';
import { Gantt, Filter, Toolbar, DayMarkers, Selection } from '@syncfusion/ej2-gantt';
import { projectNewData } from './data-source';
import { ClickEventArgs } from '@syncfusion/ej2-navigations';

/**
 * Toolbar Template Gantt sample
 */

Gantt.Inject(Filter, Toolbar, DayMarkers, Selection);
(window as any).default = (): void => {
    loadCultureFiles();
    let gantt: Gantt = new Gantt(
        {
            dataSource: projectNewData,
            height: '450px',
            highlightWeekends: true,
            allowSelection: true,
            allowFiltering: true,
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
            labelSettings: {
                leftLabel: 'TaskName'
            },
            splitterSettings: {
                columnIndex: 2
            },
            toolbar: ['ExpandAll', 'CollapseAll',
                { text: 'Quick Filter', tooltipText: 'Quick Filter', id: 'Quick Filter', prefixIcon: 'e-quickfilter' },
                { text: 'Clear Filter', tooltipText: 'Clear Filter', id: 'Clear Filter' }
            ],
            toolbarClick: (args: ClickEventArgs) => {
                if (args.item.text === 'Quick Filter') {
                    gantt.filterByColumn('TaskName', 'startswith', 'Identify');
                }
                if (args.item.text === 'Clear Filter') {
                    gantt.clearFiltering();
                }
            },
            projectStartDate: new Date('03/24/2019'),
            projectEndDate: new Date('07/06/2019')
        });
    gantt.appendTo('#ToolbarTemplate');
};
