import { loadCultureFiles } from '../common/culture-loader';
/**
 * MultiColumn ComboBox Grouping Sample
 */
import { MultiColumnComboBox, ColumnModel } from '@syncfusion/ej2-multicolumn-combobox';
import * as data from './dataSource.json';

(window as any).default = (): void => {
    loadCultureFiles();

    const columns: ColumnModel[] = [
        { field: 'OrderID', header: 'Order ID', width: 110 },
        { field: 'CustomerName', width: 130, header: 'Customer Name' },
        { field: 'Freight', header: 'Freight', width: 90 },
        { field: 'ShipPostalCode', header: 'Ship PostalCode', width: 160 },
        { field: 'ShipCountry', header: 'Ship Country', width: 140 }
    ];

    // Initialize multicolumn ComboBox component
    let multicolumnObj: MultiColumnComboBox = new MultiColumnComboBox({
        //set the local data to dataSource property
        dataSource: (data as any).orderDetails,
        //set column of the multicolumn combobox
        columns: columns,
        //set the fields of the multicolumn combobox
        fields: { text: 'CustomerName', value: 'OrderID', groupBy: 'ShipCountry' },
        // set the placeholder to MultiColumn ComboBox input element
        placeholder: 'Select a customer name',
        // set the height of the popup element
        popupHeight: '230px',
        allowSorting: false
    });
    multicolumnObj.appendTo('#grouping');
};