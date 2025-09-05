import { loadCultureFiles } from '../common/culture-loader';

import { Gantt, Edit, Selection, Toolbar, DayMarkers, ContextMenuItem, ContextMenu, Resize, Sort,
    ContextMenuOpenEventArgs, ContextMenuClickEventArgs, IGanttData } from '@syncfusion/ej2-gantt';
import { ItemModel } from '@syncfusion/ej2-navigations';
import { EmitType } from '@syncfusion/ej2-base';
import { editingData, editingResources } from './data-source';

/**
 *  Context menu in Gantt sample
 */
Gantt.Inject(Edit, Selection, Toolbar, DayMarkers, ContextMenu, Resize, Sort);
let contextMenuOpen: EmitType<ContextMenuOpenEventArgs> = (args?: ContextMenuOpenEventArgs) => {
    let record: IGanttData = args.rowData;
    if (args.type !== 'Header' && record) {
        if (!record.hasChildRecords) {
            args.hideItems.push('Collapse the Row');
            args.hideItems.push('Expand the Row');
        } else {
            if (record.expanded) {
                args.hideItems.push('Expand the Row');
            } else {
                args.hideItems.push('Collapse the Row');
            }
        }
    }
};
(window as any).default = (): void => {
    loadCultureFiles();
    let contextMenuItems: (string | ItemModel)[] = ['AutoFitAll', 'AutoFit', 'TaskInformation', 'DeleteTask', 'Save', 'Cancel',
        'SortAscending', 'SortDescending', 'Add', 'DeleteDependency', 'Convert', 'Indent', 'Outdent',
        { text: 'Collapse the Row', target: '.e-content', id: 'collapserow' } as ItemModel,
        { text: 'Expand the Row', target: '.e-content', id: 'expandrow' } as ItemModel,
    ];
    let gantt: Gantt = new Gantt(
        {
            dataSource: editingData,
            dateFormat: 'MMM dd, y',
            taskFields: {
                id: 'TaskID',
                name: 'TaskName',
                startDate: 'StartDate',
                endDate: 'EndDate',
                duration: 'Duration',
                progress: 'Progress',
                dependency: 'Predecessor',
                parentID: 'ParentId',
                notes: 'info',
                resourceInfo: 'resources'
            },
            columns: [
                { field: 'TaskID', width: 80 },
                { field: 'TaskName', headerText: 'Job Name', width: '250', clipMode: 'EllipsisWithTooltip' },
                { field: 'StartDate' },
                { field: 'EndDate' },
                { field: 'Duration' },
                { field: 'Progress' },
                { field: 'Predecessor' },
                { field: 'resources' },
                { field: 'info' },
            ],
            editSettings: {
                allowAdding: true,
                allowEditing: true,
                allowDeleting: true,
                allowTaskbarEditing: true,
                showDeleteConfirmDialog: true
            },
            splitterSettings: {
                position: "35%"
            },
            allowResizing: true,
            allowSorting: true,
            enableContextMenu: true,
            contextMenuItems: contextMenuItems as ContextMenuItem[],
            contextMenuClick: (args?: ContextMenuClickEventArgs) => {
                let record: IGanttData = args.rowData;
                if (args.item.id === 'collapserow') {
                    gantt.collapseByID(Number(record.ganttProperties.taskId));
                }
                if (args.item.id === 'expandrow') {
                    gantt.expandByID(Number(record.ganttProperties.taskId));
                }
            },
            contextMenuOpen: contextMenuOpen,
            toolbar: ['Add', 'Edit', 'Update', 'Delete', 'Cancel', 'ExpandAll', 'CollapseAll'],
            allowSelection: true,
            gridLines: 'Both',
            height: '650px',
            rowHeight:46,
            taskbarHeight:25,
            treeColumnIndex: 1,
            resourceFields: {
                id: 'resourceId',
                name: 'resourceName'
            },
            resources: editingResources,
            highlightWeekends: true,
            timelineSettings: {
                topTier: {
                    unit: 'Week',
                    format: 'MMM dd, y',
                },
                bottomTier: {
                    unit: 'Day',
                },
            },
            labelSettings: {
                leftLabel: 'TaskName',
                rightLabel: 'resources'
            },
            editDialogFields: [
                { type: 'General', headerText: 'General' },
                { type: 'Dependency' },
                { type: 'Resources' },
                { type: 'Notes' },
            ],
            projectStartDate: new Date('03/25/2025'),
            projectEndDate: new Date('09/01/2025')
        });
    gantt.appendTo('#ContextMenu');
};
