import { loadCultureFiles } from '../common/culture-loader';
/**
 * MultiColumn ComboBox Grouping Sample
 */
import { MultiColumnComboBox, ColumnModel } from '@syncfusion/ej2-multicolumn-combobox';
import * as data from './dataSource.json';

(window as any).default = (): void => {
    loadCultureFiles();

    const columns: ColumnModel[] = [
        { field: 'Name', header: 'Name', width: 90 },
        { field: 'Position', header: 'Position', width: 85 },
        { field: 'Department', header: 'Department', width: 98 }, 
        { field: 'PhoneNo', header: 'Phone No', width: 105 },    
        { field: 'Location', header: 'Location', width: 98 } 
    ];

    // Initialize multicolumn ComboBox component
    let multicolumnObj: MultiColumnComboBox = new MultiColumnComboBox({
        //set the local data to dataSource property
        dataSource: (data as any).employeeData,
        //set column of the multicolumn combobox
        columns: columns,
        //set the fields of the multicolumn combobox
        fields: { text: 'Name', value: 'Department', groupBy: 'Position' },
        // set the placeholder to MultiColumn ComboBox input element
        placeholder: 'Select a name',
        // set the height of the popup element
        popupHeight: '230px',
        allowSorting: false
    });
    multicolumnObj.appendTo('#grouping');
};