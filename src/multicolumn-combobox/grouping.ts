import { loadCultureFiles } from '../common/culture-loader';
/**
 * MultiColumn ComboBox Grouping Sample
 */
import { MultiColumnComboBox, ColumnModel } from '@syncfusion/ej2-multicolumn-combobox';
import * as data from './dataSource.json';

(window as any).default = (): void => {
    loadCultureFiles();
    
    const columns: ColumnModel[] = [
        { field: 'Name', header: 'Name', width: 110 },
        { field: 'Price', header: 'Price', width: 70 },
        { field: 'Availability', header: 'Availability', width: 98 },    
        { field: 'Category', header: 'Category', width: 95 },
        { field: 'Rating', header: 'Rating', width: 70 }  
    ];

    // Initialize multicolumn ComboBox component
    let multicolumnObj: MultiColumnComboBox = new MultiColumnComboBox({
        //set the local data to dataSource property
        dataSource: (data as any).products,
        //set column of the multicolumn combobox
        columns: columns,
        //set the fields of the multicolumn combobox
        fields: { text: 'Name', value: 'Name', groupBy: 'Category' },
        // set the placeholder to MultiColumn ComboBox input element
        placeholder: 'e.g. Laptop',
        // set the height of the popup element
        popupHeight: '210px',
        popupWidth: '420px',
        allowSorting: false
    });
    multicolumnObj.appendTo('#grouping');
};