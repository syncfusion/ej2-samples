import { Grid, SelectionType, Selection, SelectionMode } from '@syncfusion/ej2-grids';
import { employeeData } from './datasource';

Grid.Inject(Selection);
/**
 * Selection sample
 */
this.default = (): void => {
    let grid: Grid = new Grid(
        {
            dataSource: employeeData,
            allowSelection: true,
            selectionSettings: { type: 'multiple' },
            enableHover: false,
            columns: [
                { field: 'EmployeeID', headerText: 'Employee ID', textAlign: 'right', width: 135 },
                { field: 'FirstName', headerText: 'Name', width: 125 },
                { field: 'Title', headerText: 'Title', width: 180 },
                {
                    field: 'HireDate', headerText: 'Hire Date', textAlign: 'right',
                    width: 135, format: { skeleton: 'yMd', type: 'date' }
                }
            ]
        });
    grid.appendTo('#Grid');

    document.getElementById('type').onchange = () => {
        let type: string = (document.getElementById('type') as HTMLSelectElement).value;
        grid.selectionSettings.type = <SelectionType>type;
    };
    document.getElementById('mode').onchange = () => {
        let mode: string = (document.getElementById('mode') as HTMLSelectElement).value;
        grid.selectionSettings.mode = <SelectionMode>mode;
    };
};
