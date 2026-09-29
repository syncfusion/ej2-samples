import { loadCultureFiles } from '../common/culture-loader';
import { Gantt, Edit, Selection, Toolbar, DependencyType} from '@syncfusion/ej2-gantt';
import { MultiSelect, CheckBoxSelection, MultiSelectChangeEventArgs } from '@syncfusion/ej2-dropdowns';
import { dependencyData } from './data-source';

Gantt.Inject(Edit, Selection, Toolbar);
MultiSelect.Inject(CheckBoxSelection);

/**
 * Dependency Types Gantt Sample
 */
(window as any).default = (): void => {
    loadCultureFiles();

    let allowedDependencyTypes: DependencyType[] = ['FS', 'SS', 'FF', 'SF'];
    const gantt: Gantt = new Gantt({
        dataSource: dependencyData,
        height: '650px',
        rowHeight: 46,
        taskbarHeight: 25,
        taskFields: {
            id: 'TaskID',
            name: 'TaskName',
            startDate: 'StartDate',
            endDate: 'EndDate',
            duration: 'Duration',
            progress: 'Progress',
            dependency: 'Predecessor',
            parentID: 'ParentID'
        },
        treeColumnIndex: 1,
        columns: [
            { field: 'TaskID', visible: false },
            {
                field: 'TaskName',
                headerText: 'Task Name',
                width: 200
            },
            {
                field: 'Predecessor',
                headerText: 'Dependency',
                width: 140
            },
            {
                field: 'StartDate',
                headerText: 'Start Date',
                width: 130
            },
            {
                field: 'Duration',
                headerText: 'Duration',
                width: 110
            },
            {
                field: 'Progress',
                headerText: 'Progress',
                width: 100
            }
        ],
        toolbar: ['Add', 'Edit', 'Update', 'Delete', 'Cancel', 'ExpandAll', 'CollapseAll'],
        editSettings: {
            allowAdding: true,
            allowEditing: true,
            allowDeleting: true,
            allowTaskbarEditing: true,
            showDeleteConfirmDialog: true
        },
        labelSettings: {
            leftLabel: 'TaskName'
        },
        splitterSettings: {
            columnIndex: 3
        },
        highlightWeekends: true,
        allowSelection: true,
        gridLines: 'Both',
        allowedDependencyTypes: allowedDependencyTypes,
        projectStartDate: new Date('01/01/2026')
    });
    gantt.appendTo('#DependencyTypes');

    const dependencyTypeObj: MultiSelect = new MultiSelect({
        dataSource: [
            { text: 'Finish to Start (FS)', value: 'FS' },
            { text: 'Start to Start (SS)', value: 'SS' },
            { text: 'Finish to Finish (FF)', value: 'FF' },
            { text: 'Start to Finish (SF)', value: 'SF' }
        ],
        fields: {
            text: 'text',
            value: 'value'
        },
        value: ['FS', 'SS', 'FF', 'SF'],
        mode: 'CheckBox',
        popupHeight: '220px',
        showDropDownIcon: true,
        showClearButton: false,
        width: '240px',
        change: (args: MultiSelectChangeEventArgs): void => {
            gantt.allowedDependencyTypes =
                args.value as DependencyType[];
            gantt.refresh();
        }
    });

    dependencyTypeObj.appendTo('#allowedDependencyType');
};