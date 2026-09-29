import { loadCultureFiles } from '../common/culture-loader';
import { Gantt, Selection, Toolbar, Filter } from '@syncfusion/ej2-gantt';
import { hierarchyCheckboxData } from './data-source';
import { DropDownList, ChangeEventArgs } from '@syncfusion/ej2-dropdowns';

/**
 * Hierarchy Checkbox Selection Gantt sample
 */

Gantt.Inject(Selection, Toolbar, Filter);
(window as any).default = (): void => {
    loadCultureFiles();
    let gantt: Gantt = new Gantt(
        {
            dataSource: hierarchyCheckboxData,
            height: '650px',
            hierarchyCheckboxMode: 'hierarchy',
            rowHeight: 46,
            allowFiltering: true,
            taskbarHeight: 25,
            highlightWeekends: true,
            allowSelection: true,
            treeColumnIndex: 2,
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
            selectionSettings: {
                mode: 'Row',
                type: 'Multiple',
                enableToggle: false
            },
            allowResizing: true,
            columns: [
                { field: 'CheckBox', headerText: '', showCheckbox: true, width: 70, allowFiltering: false},
                { field: 'TaskID', width: 110, visible: false },
                { field: 'TaskName', width: 190 },
                { field: 'StartDate' },
                { field: 'EndDate' },
                { field: 'Duration' },
                { field: 'Predecessor' },
                { field: 'Progress' }
            ],
            toolbar: ['Search'],
            enableHover: true,
            labelSettings: {
                leftLabel: 'TaskName'
            },
            splitterSettings: {
                columnIndex: 3
            },
            projectStartDate: new Date('03/26/2025'),
            projectEndDate: new Date('07/20/2025')
        });
    gantt.appendTo('#HierarchyCheckbox');

    let selectionModeList: DropDownList = new DropDownList({
        dataSource: [
            { id: 'self', type: 'self' },
            { id: 'hierarchy', type: 'hierarchy' },
            { id: 'filteredHierarchy', type: 'filteredHierarchy' }
        ],
        width: '125px',
        popupWidth: '100px',
        value: 'hierarchy',
        change: (e: ChangeEventArgs) => {
            let mode: any = <string>e.value;
            gantt.hierarchyCheckboxMode = mode;
            gantt.refresh();
        },
        fields: { text: 'type', value: 'id' }
    });
    selectionModeList.appendTo('#mode');

};
