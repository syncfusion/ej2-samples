import { loadCultureFiles } from '../common/culture-loader';
import { DropDownList, ChangeEventArgs } from '@syncfusion/ej2-dropdowns';
import { Grid, Selection, GridLine } from '@syncfusion/ej2-grids';
import { employeeData } from './data-source';

Grid.Inject(Selection);

/**
 * Grid Lines sample
 */
(window as any).default = (): void => {
    loadCultureFiles();
    let lines: { [key: string]: Object }[] = [
        { id: 'Default', type: 'Default' },
        { id: 'Both', type: 'Both' },
        { id: 'None', type: 'None' },
        { id: 'Horizontal', type: 'Horizontal' },
        { id: 'Vertical', type: 'Vertical' }
    ];

    let grid: Grid = new Grid(
        {
            dataSource: employeeData,
            gridLines: 'Default',
            columns: [
                { field: 'EmployeeID', headerText: 'Employee ID', textAlign: 'Right', width: 140 },
                { field: 'FirstName', headerText: 'Name', width: 125 },
                { field: 'Title', headerText: 'Title', width: 180 },
                {
                    field: 'HireDate', headerText: 'Hire Date', textAlign: 'Right',
                    width: 135, format: { skeleton: 'yMd', type: 'date' }
                }
            ]
        });
    grid.appendTo('#Grid');

    let dropDownListObject: DropDownList = new DropDownList({
        dataSource: lines,
        fields: { text: 'type', value: 'id' },
        value: 'Default',
        change: (e: ChangeEventArgs) => {
            grid.gridLines = <GridLine>e.value;
            grid.dataBind();
            grid.refresh();
        },
    });
    dropDownListObject.appendTo('#ddlelement');

};
