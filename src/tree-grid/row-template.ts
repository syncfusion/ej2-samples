import { loadCultureFiles } from '../common/culture-loader';
import { TreeGrid } from '@syncfusion/ej2-treegrid';
import { textdata } from './data-source';
import { Internationalization } from '@syncfusion/ej2-base';

let instance: Internationalization = new Internationalization();

/**
 * Default TreeGrid sample
 */

(window as DateFormat).format = (value: Date) => {
    return instance.formatDate(value, { skeleton: 'yMd', type: 'date' });
};

interface DateFormat extends Window {
    format?: Function;
}


(window as any).default = (): void => {
    loadCultureFiles();
    let treegrid: TreeGrid = new TreeGrid(
        {
            dataSource: textdata,
            childMapping: 'Children',
            treeColumnIndex: 0,
            rowTemplate: '#rowtemplate',
            height: 335,
            width: 'auto',
            rowHeight: 83,
            columns: [
                { field: 'EmpID', headerText: 'Employee ID', width: '180' },
                { field: 'Name', headerText: 'Employee Name' },
                { field: 'Address', headerText: 'Employee Details', width: '360' },
                { field: 'DOB', headerText: 'DOB' }
            ]
        });
    treegrid.appendTo('#TreeGrid');
};
