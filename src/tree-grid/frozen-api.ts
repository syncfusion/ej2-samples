import { loadCultureFiles } from '../common/culture-loader';
import { TreeGrid, Freeze, Sort } from '@syncfusion/ej2-treegrid';
import { freezeDirection, Column} from '@syncfusion/ej2-grids'
import { DropDownList, ChangeEventArgs } from '@syncfusion/ej2-dropdowns';
import { Dialog } from '@syncfusion/ej2-popups';
import { sampleData } from './data-source';


TreeGrid.Inject(Freeze, Sort);

/**
 * Grid frozen rows and columns sample
 */
(window as any).default = (): void => {
    loadCultureFiles();
    let treegrid: TreeGrid = new TreeGrid(
        {
            dataSource: sampleData,
            height: 410,
            childMapping: 'subtasks',
            treeColumnIndex: 1,
            allowSorting: true,
            allowSelection: false,
            columns: [
                { field: 'taskID', headerText: 'Task ID', textAlign: 'Right', width: 100,freeze: 'Left'  },
                { field: 'taskName', headerText: 'Task Name', width: 250 },
                { field: 'startDate', headerText: 'Start Date', width: 130, textAlign: 'Right',
                    type: 'date', format: { type: 'dateTime', format: 'dd/MM/yyyy' } },
                { field: 'endDate', headerText: 'End Date', width: 150, textAlign: 'Right',
                    type: 'date', format: { type: 'dateTime', format: 'dd/MM/yyyy' } },
                { field: 'duration', headerText: 'Duration', textAlign: 'Right', width: 130 },
                { field: 'progress', headerText: 'Progress', textAlign: 'Right', width: 130 },
                { field: 'priority', headerText: 'Priority', textAlign: 'Left', width: 160 },
                { field: 'designation', headerText: 'Designation', textAlign: 'Left', width: 190 },
                { field: 'employeeID', headerText: 'EmployeeID', textAlign: 'Left', width: 120 },
                { field: 'approved', headerText: 'Approved', width: 140, displayAsCheckBox: true, textAlign: 'Left',freeze: 'Right' }
            ]
        });
    treegrid.appendTo('#TreeGrid');

    let alertDialogObj: Dialog = new Dialog({
        header: 'Frozen',
        content: 'Atleast one Column should be Movable',
        showCloseIcon: false,
        target: '.control-section',
        buttons: [{
            click: alertDlgBtnClick, buttonModel: { content: 'OK', isPrimary: true }
        }],
        width: '300px',
        visible: false,
        animationSettings: { effect: 'None' }
    });
    alertDialogObj.appendTo('#alertDialog');
    function alertDlgBtnClick(): void {
        alertDialogObj.hide();
    }

    let columnNames: { [key: string]: Object }[] = [
        { id: 'taskID', name: 'Task ID' },
        { id: 'taskName', name: 'Task Name' },
        { id: 'startDate', name: 'Start Date' },
        { id: 'endDate', name: 'End Date' },
        { id: 'duration', name: 'Duration' },
        { id: 'progress', name: 'Progress' },
        { id: 'priority', name: 'Priority' },
        { id: 'designation', name: 'Designation' },
        { id: 'employeeID', name: 'EmployeeID' },
        { id: 'approved', name: 'Approved' }
    ];
    let directions: { [key: string]: Object }[] = [
        { id: 'Left', name: 'Left' },
        { id: 'Right', name: 'Right' },
        { id: 'Center', name: 'Center' }
    ];
    let refresh: boolean = true;
    let columnChange: DropDownList = new DropDownList({
        dataSource: columnNames,
        fields: { text: 'name', value: 'id' },
        value: 'taskName',
        change: (e: ChangeEventArgs) => {
            let columnName: any = e.value;
            let column: Column = treegrid.grid.getColumnByField(columnName);
            let value: string = column.freeze === undefined ? 'Center' : column.freeze;
            refresh = dropDownDirection.value === value;
            dropDownDirection.value = value;

        }
    });
    columnChange.appendTo('#column');

    let dropDownDirection: DropDownList = new DropDownList({
        dataSource: directions,
        fields: { text: 'name', value: 'id' },
        value: 'Left',
        change: (e: ChangeEventArgs) => {
            if (refresh) {
                let value: string = 'Left';
                let columnName: any = columnChange.value;
                let mvblColumns: Column[] = treegrid.grid.getMovableColumns();
                if (mvblColumns.length === 1 && columnName === mvblColumns[0].field && e.value !== mvblColumns[0].freeze) {
                    alertDialogObj.show();
                    refresh = false;
                    value = 'Center';
                    dropDownDirection.refresh();
                } else {
                    treegrid.grid.getColumnByField(columnName).freeze = e.value === 'Center' ? undefined : e.value as freezeDirection;
                    treegrid.grid.refreshColumns();
                }
            }
            refresh = true;
        }
    });
    dropDownDirection.appendTo('#FreezeDirection');
};
