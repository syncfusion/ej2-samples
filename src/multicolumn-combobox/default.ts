import { loadCultureFiles } from '../common/culture-loader';
/**
 * MultiColumn ComboBox Default functionality Sample
 */
import { MultiColumnComboBox, ColumnModel, ChangeEventArgs } from '@syncfusion/ej2-multicolumn-combobox';
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
    let multicolumnObj: MultiColumnComboBox = new MultiColumnComboBox({
        //set the local data to dataSource property
        dataSource: (data as any).orderDetails,
        //set column of the multicolumn combobox
        columns: columns,
        //set the fields of the multicolumn combobox
        fields: { text: 'ShipCountry', value: 'OrderID' },
        // set the height of the popup element
        popupHeight: '230px',
        // set the placeholder to multiColumn comboBox input element
        placeholder: 'Select the country',
        showClearButton: true,
        value: '1001',
        text: 'France',
        change: valueChange
    });
    multicolumnObj.appendTo('#default');

    function valueChange(args: ChangeEventArgs): void {
        document.getElementById('value').innerHTML = args.itemData.value || 'null';
        document.getElementById('text').innerHTML = args.itemData.text || 'null';
    }
};