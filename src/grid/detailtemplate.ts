
import { Grid, Page, Selection, DetailRow } from '@syncfusion/ej2-grids';
import { employeeData } from './datasource';
import { Internationalization } from '@syncfusion/ej2-base';

let instance: Internationalization = new Internationalization();

Grid.Inject(Page, Selection, DetailRow);
/**
 * Detail row template Sample
 */
this.default = (): void => {
    let grid: Grid = new Grid({
        dataSource: employeeData,
        detailTemplate: '#detailtemplate',
        height: 335,
        width: 'auto',
        columns: [
            { field: 'FirstName', headerText: 'First Name', width: 110 },
            { field: 'LastName', headerText: 'Last Name', width: 110 },
            { field: 'Title', headerText: 'Title', width: 150 },
            { field: 'Country', headerText: 'Country', width: 110 }
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