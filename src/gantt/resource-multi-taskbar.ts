import { loadCultureFiles } from '../common/culture-loader';

import { multiTaskbarData, resources } from './data-source';

import { Gantt, Selection, DayMarkers, Toolbar, Edit, Resize, RowDD } from '@syncfusion/ej2-gantt';
import { CheckBox, Switch } from '@syncfusion/ej2-buttons';
/**
 *  ResourceView Gantt sample
 */
Gantt.Inject(Selection, DayMarkers, Toolbar, Edit, Resize, RowDD);
(window as any).default = (): void => {
    loadCultureFiles();
    let gantt: Gantt = new Gantt(
        {
            dataSource: multiTaskbarData,
            resources: resources,
            viewType: 'ResourceView',
            enableMultiTaskbar: true,
            showOverAllocation: true,
            taskFields: {
                id: 'TaskID',
                name: 'TaskName',
                startDate: 'StartDate',
                endDate: 'EndDate',
                duration: 'Duration',
                dependency: 'Predecessor',
                progress: 'Progress',
                resourceInfo: 'resources',
                work: 'work',
                expandState: 'isExpand',
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
            toolbar: ['Add', 'Edit', 'Update', 'Delete', 'Cancel', 'ExpandAll', 'CollapseAll'],
            labelSettings: {
                taskLabel: 'TaskName'
            },
            splitterSettings: {
                columnIndex: 2
            },
            allowResizing: true,
            allowSelection: true,
            highlightWeekends: true,
            treeColumnIndex: 1,
            height: '450px',
            projectStartDate: new Date('03/28/2019'),
            projectEndDate: new Date('05/18/2019')
        });
    gantt.appendTo('#ResourceMultiTaskbar');

    let taskbarDragDrop: Switch = new Switch({ value: 'allowTaskbarDragAndDrop', change: dragDropChange});
    taskbarDragDrop.appendTo('#checked');

    let taskbarOverlap: Switch = new Switch({ value: 'allowTaskbarOverlap',checked: true, change: overlapChange });
    taskbarOverlap.appendTo('#unchecked');

    function dragDropChange(args: any) {
        let gantt = (document.getElementsByClassName('e-gantt')[0] as any).ej2_instances[0];
        if (args.checked) {
            gantt.allowTaskbarDragAndDrop = true;
        } else {
            gantt.allowTaskbarDragAndDrop = false;
        }
    }
    function overlapChange(args: any) {
        let gantt = (document.getElementsByClassName('e-gantt')[0] as any).ej2_instances[0];
        if (args.checked) {
            gantt.allowTaskbarOverlap = true;
        } else {
            gantt.allowTaskbarOverlap = false;
        }
    }
};
