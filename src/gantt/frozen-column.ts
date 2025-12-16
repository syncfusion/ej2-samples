import { loadCultureFiles } from '../common/culture-loader';
import { Gantt, Toolbar, Edit, Freeze, ColumnModel} from '@syncfusion/ej2-gantt';
import { ChangeEventArgs, DropDownList } from '@syncfusion/ej2-dropdowns';
import { frozenColumnsData, resourceCollection } from './data-source';
import { freezeDirection } from '@syncfusion/ej2-grids';
Gantt.Inject( Toolbar, Edit, Freeze);

(window as any).default = (): void => {
    loadCultureFiles();
    let leftColumns: { [key: string]: Object }[] = [
        { id: 'TaskID', name: 'Task ID' },
        { id: 'TaskName', name: 'Task Name' },
        { id: 'StartDate', name: 'Start Date' },
        { id: 'EndDate', name: 'End Date' },
        { id: 'Duration', name: 'Duration' },
        { id: 'Progress', name: 'Progress' },
        { id: 'Predecessor', name: 'Dependency'},
        { id: 'Resources', name: 'Assignee' },
        { id: 'Designation', name: 'Designation' },
        { id: 'Status', name: 'Status' },
    ]
 
    let directions: { [key: string]: Object }[] = [
        { id: 'Left', name: 'Left' },
        { id: 'Right', name: 'Right' },
        { id: 'Fixed', name: 'Fixed' },
        { id: 'None', name: 'None' },
    ];
    
    let ColumnsDropdown: DropDownList = new DropDownList({
        dataSource: leftColumns,
        value: 'TaskID',
        fields: {value: 'id', text: 'name'},
        change: (e: ChangeEventArgs)=>{
            let columnName: any = e.value;
            let column: ColumnModel = gantt.getColumnByField(columnName, gantt.columns as ColumnModel[]);
            let value: string = column.freeze === undefined ? 'None' : column.freeze;
            directionDropDown.value = value;
        }
    });

    let directionDropDown: DropDownList = new DropDownList({
        dataSource: directions,
        value: 'Left',
        fields: {value: 'id', text: 'name'},
        change: (e: ChangeEventArgs) => {
                let columnName: any = ColumnsDropdown.value;
                let columns : ColumnModel[] = gantt.getGanttColumns();
                let column = columns.find((col) => col.field === columnName);
                if (column) {
                    column.freeze = e.value === 'None' ? 'None' : e.value as freezeDirection;
                    gantt.columns = columns;
                }
            }
    });

    let gantt: Gantt = new Gantt({
        dataSource: frozenColumnsData,
        taskFields: {
            id: 'TaskID',
            name: 'TaskName',
            startDate: 'StartDate',
            endDate: 'EndDate',
            duration: 'Duration',
            progress: 'Progress',
            dependency:'Predecessor',
            parentID: 'ParentID',
            resourceInfo: 'Resources',
        },
        resources: resourceCollection,
        resourceFields: {
            id: 'resourceId',
            name: 'resourceName',
        },
        columns: [
            { field: 'TaskID', headerText: 'Task ID', freeze: 'Left', },
            { field: 'TaskName', headerText: 'Task Name', width: 150, freeze: 'Left'},
            { field: 'StartDate', headerText: 'Start Date', },
            { field: 'Duration', headerText: 'Duration',},
            { field: 'EndDate', headerText: 'End Date', },
            { field: 'Progress', headerText: 'Progress', },
            { field: 'Predecessor', headerText: 'Dependency' },
            { field: 'Resources', headerText: 'Assignee', freeze: 'Right' },
            { field: 'Designation', headerText: 'Designation' },
            { field: 'Status', headerText: 'Status', },
        
        ],
        treeColumnIndex: 1,
        splitterSettings: {
            position: "70%",
        },
        toolbar: [
            {
                align: 'Left',
                template: '<div class="left-label"><label>Columns:</label></div>'
            },
            {
                align: 'Left',
                type: 'Input',
                template: ColumnsDropdown
            },
            {
                align: 'Left',
                template: '<div class="right-label"><label>Freeze Direction:</label></div>'
            },
            {
                align: 'Left',
                type: 'Input',
                template: directionDropDown
            }
        ],
        timelineSettings: {
            showTooltip: true,
            topTier: {
                unit: 'Week',
                format: 'dd/MM/yyyy'
            },
            bottomTier: {
                unit: 'Day',
                count: 1
            }
        },
        labelSettings: {
            leftLabel: 'TaskName',
            taskLabel: 'Progress'
        },
        rowHeight:46,
        taskbarHeight:25,
        height: '650px',
        projectStartDate: new Date('02/27/2025'),
        projectEndDate: new Date('05/04/2025'),
    });
 
    gantt.appendTo('#frozenColumns');
};