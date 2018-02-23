import { DropDownList, ChangeEventArgs } from '@syncfusion/ej2-dropdowns';
import { Grid, SelectionType, Selection, SelectionMode } from '@syncfusion/ej2-grids';
import { employeeData } from './datasource';

Grid.Inject(Selection);
/**
 * Selection sample
 */
this.default = (): void => {
    let type: { [key: string]: Object }[] = [
        { id: 'Single', type: 'Single' },
        { id: 'Multiple', type: 'Multiple' }
    ];
    let mode: { [key: string]: Object }[] = [
        { id: 'Row', mode: 'Row' },
        { id: 'Cell', mode: 'Cell' },
        { id: 'Both', mode: 'Both' }
    ];

    let grid: Grid = new Grid(
        {
            dataSource: employeeData,
            allowSelection: true,
            selectionSettings: { type: 'Multiple' },
            enableHover: false,
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
            let mode: string = <string>e.value;
            grid.selectionSettings.mode = <SelectionMode>mode;
        }
    });
    dropDownMode.appendTo('#mode');
};
