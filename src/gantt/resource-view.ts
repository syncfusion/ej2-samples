import { loadCultureFiles } from '../common/culture-loader';

import { resourcesData, resourceCollection } from './data-source';

import { Gantt, Selection, DayMarkers, Toolbar, Edit, Resize } from '@syncfusion/ej2-gantt';

import { ClickEventArgs } from '@syncfusion/ej2-navigations';

/**
 *  ResourceView Gantt sample
 */
Gantt.Inject(Selection, DayMarkers, Toolbar, Edit, Resize);
(window as any).default = (): void => {
    loadCultureFiles();
    let gantt: Gantt = new Gantt(
        {
            dataSource: resourcesData,
            resources: resourceCollection,
            viewType: 'ResourceView',
            showOverAllocation: true,
            taskFields: {
                id: 'TaskID',
                name: 'TaskName',
                startDate: 'StartDate',
                endDate: 'EndDate',
                duration: 'Duration',
                progress: 'Progress',
                dependency: 'Predecessor',
                resourceInfo: 'resources',
                work: 'work',
                child: 'subtasks'
            },
            resourceFields: {
                id: 'resourceId',
                name: 'resourceName',
                unit: 'resourceUnit',
                group: 'resourceGroup'
            },
            editSettings: {
                allowAdding: true,
                allowEditing: true,
                allowDeleting: true,
                allowTaskbarEditing: true,
                showDeleteConfirmDialog: true
            },
            columns: [
                { field: 'TaskID', visible: false },
                { field: 'TaskName', headerText: 'Name', width: 250 },
                { field: 'work', headerText: 'Work' },
                { field: 'Progress' },
                { field: 'resourceGroup', headerText: 'Group' },
                { field: 'StartDate' },
                { field: 'Duration' },
            ],
            toolbar: ['Add', 'Edit', 'Update', 'Delete', 'Cancel', 'ExpandAll', 'CollapseAll',
            { text: 'Show/Hide Overallocation', tooltipText: 'Show/Hide Overallocation', id: 'showhidebar' }],
            toolbarClick: (args: ClickEventArgs) => {
                if (args.item.id === 'showhidebar') {
                    gantt.showOverAllocation = gantt.showOverAllocation ? false : true;
                }
            },
            labelSettings: {
                rightLabel: 'resources',
                taskLabel: 'Progress'
            },
            splitterSettings: {
                columnIndex: 3
            },
            allowResizing: true,
            allowSelection: true,
            highlightWeekends: true,
            treeColumnIndex: 1,
            height: '450px',
            projectStartDate: new Date('03/28/2019'),
            projectEndDate: new Date('05/18/2019')
        });
    gantt.appendTo('#ResourceView');
};
