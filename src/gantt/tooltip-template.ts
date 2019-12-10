import { loadCultureFiles } from '../common/culture-loader';
import { Gantt, Selection, DayMarkers  } from '@syncfusion/ej2-gantt';
import { tooltipData, editingResources } from './data-source';

/**
 * Tooltip Template Gantt sample
 */

Gantt.Inject(Selection, DayMarkers );
(window as any).default = (): void => {
    loadCultureFiles();
    let gantt: Gantt = new Gantt(
        {
            dataSource: tooltipData,
            height: '450px',
            highlightWeekends: true,
            allowSelection: true,
            renderBaseline: true,
            treeColumnIndex: 1,
            taskFields: {
                id: 'TaskID',
                name: 'TaskName',
                startDate: 'StartDate',
                endDate: 'EndDate',
                duration: 'Duration',
                progress: 'Progress',
                dependency: 'Predecessor',
                resourceInfo: 'resources',
                baselineStartDate: 'BaselineStartDate',
                baselineEndDate: 'BaselineEndDate',
                child: 'subtasks'
            },
            columns: [
                { field: 'TaskID', width: 60 },
                { field: 'TaskName', width: 250 },
                { field: 'StartDate' },
                { field: 'EndDate' },
                { field: 'Duration' },
                { field: 'Predecessor' },
                { field: 'Progress' },
                { field: 'BaselineStartDate' },
                { field: 'BaselineEndDate' },
                { field: 'resources' },
            ],
            resourceNameMapping: 'resourceName',
            resourceIDMapping: 'resourceId',
            resources: editingResources,
            tooltipSettings: {
                showTooltip: true,
                taskbar: '#taskbarTooltip',
                baseline: '#baselineTooltip',
            },
            labelSettings: {
                leftLabel: 'TaskName',
                rightLabel: 'resources'
            },
            splitterSettings: {
                columnIndex: 2
            },
            projectStartDate: new Date('03/24/2019'),
            projectEndDate: new Date('05/04/2019')
        });
    gantt.appendTo('#TooltipTemplate');
};
