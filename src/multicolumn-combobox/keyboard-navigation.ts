import { loadCultureFiles } from '../common/culture-loader';
/**
 * MultiColumn ComboBox Keyboard functionality Sample
 */
import { MultiColumnComboBox, ColumnModel } from '@syncfusion/ej2-multicolumn-combobox';
import * as data from './dataSource.json';


(window as any).default = (): void => {
    loadCultureFiles();

    const columns: ColumnModel[] = [
        { field: 'OrderID', header: 'Order ID', width: 110 },
        { field: 'CustomerID', width: 130, header: 'Customer ID' },
        { field: 'Freight', header: 'Freight', width: 90 },
        { field: 'ShipCountry', header: 'Ship Country', width: 140 }
    ];

    // Initialize multicolumn ComboBox component
    let keyboardComboboxObj: MultiColumnComboBox = new MultiColumnComboBox({
        //set the local data to dataSource property
        dataSource: (data as any).orderDetails,
        //set column of the multicolumn combobox
        columns: columns,
        //set the fields of the multicolumn combobox
        fields: { text: 'OrderID', value: 'CustomerID' },
        //set the placeholder to multiColumn comboBox input element
        placeholder: 'Select an order ID',
        // set the height of the popup element
        popupHeight: '230px'
    });
    keyboardComboboxObj.appendTo('#keyboard');    
};