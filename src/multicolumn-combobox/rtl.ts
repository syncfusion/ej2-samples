import { loadCultureFiles } from '../common/culture-loader';
/**
 * MultiColumn ComboBox RTL Sample
 */
import { MultiColumnComboBox, ColumnModel } from '@syncfusion/ej2-multicolumn-combobox';
import * as data from './dataSource.json';

(window as any).default = (): void => {
    loadCultureFiles();
    
    const columns: ColumnModel[] = [
        { field: 'Title', header: 'Title', width: 175 },
        { field: 'Author', header: 'Author', width: 140 },
        { field: 'Genre', header: 'Genre', width: 100 },
        { field: 'PublishedYear', header: 'Published Year', width: 120 },     
        { field: 'Price', header: 'Price', width: 80 }
    ];

    // Initialize multicolumn ComboBox component
    let multicolumnObj: MultiColumnComboBox = new MultiColumnComboBox({
        //set the local data to dataSource property
        dataSource: (data as any).bookDetails,
         //set column of the multicolumn combobox
        columns: columns,
        //set the fields of the multicolumn combobox
        fields: { text: 'Title', value: 'Author' },
        //set the placeholder to multiColumn comboBox input element
        placeholder: 'e.g. The Hobbit',
        // set the height of the popup element
        popupHeight: '210px',
        popupWidth: '640px',
        // set enableRtl tru to enable rtl
        enableRtl: true
    });
    multicolumnObj.appendTo('#rtl');
};