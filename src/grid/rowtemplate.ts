
import { Grid, Page, Selection, Scroll } from '@syncfusion/ej2-grids';
import { employeeData } from './datasource';
import { Internationalization } from '@syncfusion/ej2-base';

let instance: Internationalization = new Internationalization();

Grid.Inject(Page, Selection, Scroll);
/**
 * row template Sample
 */
this.default = (): void => {
    let grid: Grid = new Grid({
        dataSource: employeeData,
        rowTemplate: '#rowtemplate',
        height: 335,
        width: 'auto',
        columns: [
            { headerText: 'Employee Image', width: 150, textAlign: 'center', field: 'OrderID' },
            { headerText: 'Employee Details', width: 300, field: 'EmployeeID', textAlign: 'left' }
        ]
    });
    grid.appendTo('#Grid');

};

(window as DateFormat).format = (value: Date) => {
    return instance.formatDate(value, { skeleton: 'yMd', type: 'date' });
};

interface DateFormat extends Window {
    format?: Function;
}