import { loadCultureFiles } from '../common/culture-loader';
/**
 * MultiColumn ComboBox Keyboard functionality Sample
 */
import { MultiColumnComboBox, ColumnModel } from '@syncfusion/ej2-multicolumn-combobox';
import * as data from './dataSource.json';


(window as any).default = (): void => {
    loadCultureFiles();
    
    const columns: ColumnModel[] = [
        { field: 'ProductID', width: 100, header: 'Product ID'},
        { field: 'ProductName', width: 200, header: 'Product Name', },
        { field: 'UnitPrice', width: 90, header: 'UnitPrice' },
        { field: 'UnitsInStock', width: 120, header: 'Units In Stock' },
    ];

    // Initialize multicolumn ComboBox component
    let keyboardComboboxObj: MultiColumnComboBox = new MultiColumnComboBox({
        //set the local data to dataSource property
        dataSource: (data as any).productDetails,
        //set column of the multicolumn combobox
        columns: columns,
        //set the fields of the multicolumn combobox
        fields: { text: 'ProductName', value: 'ProductID' },
        //set the placeholder to multiColumn comboBox input element
        placeholder: 'Select any product',
        // set the height of the popup element
        popupHeight: '210px',
        popupWidth: '645px'
    });
    keyboardComboboxObj.appendTo('#keyboard');    
};