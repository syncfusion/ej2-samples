import { loadCultureFiles } from '../common/culture-loader';
import { TreeGrid, DetailRow } from '@syncfusion/ej2-treegrid';
import { textdata } from './data-source';
import { Internationalization } from '@syncfusion/ej2-base';

let instance: Internationalization = new Internationalization();

/**
 * Detail Row sample
 */

(window as DateFormat).format = (value: Date) => {
    return instance.formatDate(value, { skeleton: 'yMd', type: 'date' });
};

interface DateFormat extends Window {
    format?: Function;
}

TreeGrid.Inject(DetailRow);

(window as any).default = (): void => {
    loadCultureFiles();
    let treegrid: TreeGrid = new TreeGrid(
        {
            dataSource: textdata,
            childMapping: 'Children',
            treeColumnIndex: 0,
            detailTemplate: '#detailtemplate',
            height: 335,
            width: 'auto',
            columns: [
                { field: 'Name', headerText: 'First Name', width: '160' },
                { field: 'DOB', headerText: 'DOB', width: '85', type: 'date', format: 'yMd', textAlign: 'Right' },
                { field: 'Designation', headerText: 'Designation', width: '147' },
                { field: 'EmpID', headerText: 'EmployeeID', width: '125'},
                { field: 'Country', headerText: 'Country' , width: '148'},
            ]
        });
    treegrid.appendTo('#TreeGrid');
};
