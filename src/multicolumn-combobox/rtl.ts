import { loadCultureFiles } from '../common/culture-loader';
/**
 * MultiColumn ComboBox RTL Sample
 */
import { MultiColumnComboBox, ColumnModel } from '@syncfusion/ej2-multicolumn-combobox';
import * as data from './dataSource.json';

(window as any).default = (): void => {
    loadCultureFiles();

    const columns: ColumnModel[] = [
        { field: 'Eimg', header: 'Employee ID', width: 120 },
        { field: 'Name', header: 'Employee Name', width: 160 },
        { field: 'Designation', width: 150, header: 'Designation' },
        { field: 'Country', header: 'Country', width: 100 }
    ];

    // Initialize multicolumn ComboBox component
    let multicolumnObj: MultiColumnComboBox = new MultiColumnComboBox({
        //set the local data to dataSource property
        dataSource: (data as any).empList,
         //set column of the multicolumn combobox
        columns: columns,
        //set the fields of the multicolumn combobox
        fields: { text: 'Name', value: 'Designation' },
        //set the placeholder to multiColumn comboBox input element
        placeholder: 'Select an employee',
        // set the height of the popup element
        popupHeight: '230px',
        // set enableRtl tru to enable rtl
        enableRtl: true
    });
    multicolumnObj.appendTo('#rtl');
};