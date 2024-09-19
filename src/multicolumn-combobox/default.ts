import { loadCultureFiles } from '../common/culture-loader';
/**
 * MultiColumn ComboBox Default functionality Sample
 */
import { MultiColumnComboBox, ColumnModel, ChangeEventArgs } from '@syncfusion/ej2-multicolumn-combobox';
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
        fields: { text: 'Name', value: 'Department' },
        // set the height of the popup element
        popupHeight: '230px',
        // set the placeholder to multiColumn comboBox input element
        placeholder: 'Select a name',
        showClearButton: true,
        value: 'HR',
        text: 'John Smith',
        change: valueChange
    });
    multicolumnObj.appendTo('#default');

    function valueChange(args: ChangeEventArgs): void {
        document.getElementById('value').innerHTML = args.itemData.value || 'null';
        document.getElementById('text').innerHTML = args.itemData.text || 'null';
    }
};