import { loadCultureFiles } from '../common/culture-loader';
import { Gantt, Edit, Selection } from '@syncfusion/ej2-gantt';
import {infiniteTimelineScrollData } from './data-source';
/**
 * Editing Gantt sample
 */
Gantt.Inject(Edit, Selection);
(window as any).default = (): void => {
    loadCultureFiles();
    let gantt: Gantt = new Gantt(
        {
            dataSource: infiniteTimelineScrollData,
            enableInfiniteTimelineScroll: true,
            taskFields: {
                id: 'TaskID',
                name: 'TaskName',
                startDate: 'StartDate',
                duration: 'Duration',
                progress: 'Progress',
                dependency: 'Predecessor',
                child: 'subtasks'
            },
            editSettings: {
                allowAdding: true,
                allowEditing: true,
                allowDeleting: true,
                allowTaskbarEditing: true,
                showDeleteConfirmDialog: true
            },
            rowHeight: 46,
            allowSelection: true,
            gridLines: 'Both',
            height: '650px',
            treeColumnIndex: 1,
            highlightWeekends: true,
            timelineSettings: {
                topTier: {
                    unit: 'Week',
                    format: 'MMM dd, y'
                },
                bottomTier: {
                    unit: 'Day'
                },
                viewStartDate: new Date('12/29/2025'),
                viewEndDate: new Date('04/05/2026')
            },
            columns: [
                { field: 'TaskID', width: 80 },
                { field: 'TaskName', headerText: 'Job Name', width: 250, clipMode: 'EllipsisWithTooltip' },
                { field: 'StartDate' },
                { field: 'Duration' },
                { field: 'Progress' },
                { field: 'Predecessor' }
            ],
            labelSettings: {
                leftLabel: 'TaskID',
                rightLabel: 'TaskName',
                taskLabel: '${Progress}%'
            },
            splitterSettings : {
                columnIndex: 3
            },
        });
    gantt.appendTo('#InfiniteScroll');
};
