
import { Grid, Page, Selection, DetailRow, Sort } from '@syncfusion/ej2-grids';
import { employeeData } from './data-source';
import { Internationalization } from '@syncfusion/ej2-base';

let instance: Internationalization = new Internationalization();

Grid.Inject(Page, Selection, DetailRow, Sort);
/**
 * Detail row template Sample
 */


(window as DateFormat).format = (value: Date) => {
    return instance.formatDate(value, { skeleton: 'yMd', type: 'date' });
};

interface DateFormat extends Window {
    format?: Function;
}

(window as any).default = (): void => {
    let grid: Grid = new Grid({
        dataSource: employeeData,
        detailTemplate: '#detailtemplate',
        allowSorting: true,
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