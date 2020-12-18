import { loadCultureFiles } from '../common/culture-loader';
import { DropDownList, ChangeEventArgs } from '@syncfusion/ej2-dropdowns';
import { CheckBox } from '@syncfusion/ej2-buttons';
import { Grid, SelectionType, Selection } from '@syncfusion/ej2-grids';
import { employeeData } from './data-source';

Grid.Inject(Selection);
/**
 * Selection sample
 */
(window as any).default = (): void => {
    loadCultureFiles();
    let type: { [key: string]: Object }[] = [
        { id: 'Single', type: 'Single' },
        { id: 'Multiple', type: 'Multiple' }
    ];
    let mode: { [key: string]: Object }[] = [
        { id: 'Row', mode: 'Row' },
        { id: 'Cell', mode: 'Cell' },
        { id: 'Both', mode: 'Both' }
    ];

    let selecting: any = (e: any) => {
        if (grid.selectionSettings.allowColumnSelection) {
            e.cancel = true;
        }
    };

    let grid: Grid = new Grid(
        {
            dataSource: employeeData,
            allowSelection: true,
            selectionSettings: { type: 'Multiple' },
            enableHover: false,
            rowSelecting : selecting,
            cellSelecting: selecting,
            columns: [
                { field: 'EmployeeID', headerText: 'Employee ID', textAlign: 'Right', width: 135 },
                { field: 'FirstName', headerText: 'Name', width: 125 },
                { field: 'Title', headerText: 'Title', width: 180 },
                {
                    field: 'HireDate', headerText: 'Hire Date', textAlign: 'Right',
                    width: 135, format: { skeleton: 'yMd', type: 'date' }
                }
            ]
        });
    grid.appendTo('#Grid');

    let dropDownType: DropDownList = new DropDownList({
        dataSource: type,
        fields: { text: 'type', value: 'id' },
        value: 'Multiple',
        change: (e: ChangeEventArgs) => {
            let type: string = <string>e.value;
            grid.selectionSettings.type = <SelectionType>type;
        }
    });
    dropDownType.appendTo('#type');

    let dropDownMode: DropDownList = new DropDownList({
        dataSource: mode,
        fields: { text: 'mode', value: 'id' },
        value: 'Row',
        change: (e: ChangeEventArgs) => {
            let mode: any = e.value;
            grid.selectionSettings.mode = mode ;
        }
    });
    dropDownMode.appendTo('#mode');

    // enable/disable Column Selection
    let columnSelection: CheckBox = new CheckBox({
        change: ( e: any) => {
            grid.clearSelection();
            if (e.checked) {
                grid.selectionSettings.allowColumnSelection = true;
                dropDownMode.enabled = false;
            } else {
                grid.selectionSettings.allowColumnSelection = false;
                dropDownMode.enabled = true;
            }
        }
    });
    columnSelection.appendTo('#columnSelection');

};
