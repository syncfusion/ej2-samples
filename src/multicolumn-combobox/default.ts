import { loadCultureFiles } from '../common/culture-loader';
/**
 * MultiColumn ComboBox Default functionality Sample
 */
import { MultiColumnComboBox, ColumnModel, ChangeEventArgs } from '@syncfusion/ej2-multicolumn-combobox';
import * as data from './dataSource.json';


(window as any).default = (): void => {
    loadCultureFiles();
    const columns: ColumnModel[] = [
        { field: 'Name', header: 'Name', width: 110 },
        { field: 'Price', header: 'Price', width: 70 },
        { field: 'Availability', header: 'Availability', width: 98 },    
        { field: 'Category', header: 'Category', width: 95 },
        { field: 'Rating', header: 'Rating', width: 60 }
    ];

    // Initialize multicolumn ComboBox component
    let multicolumnObj: MultiColumnComboBox = new MultiColumnComboBox({
        //set the local data to dataSource property
        dataSource: (data as any).products,
        //set column of the multicolumn combobox
        columns: columns,
        //set the fields of the multicolumn combobox
        fields: { text: 'Name', value: 'Category' },
        // set the height of the popup element
        popupHeight: '220px',
        popupWidth: '500px',
        // set the placeholder to multiColumn comboBox input element
        placeholder: 'Select any product',
        showClearButton: true,
        value: 'Electronics',
        text: 'Smartphone',
        change: valueChange
    });
    multicolumnObj.appendTo('#default');

    function valueChange(args: ChangeEventArgs): void {
        document.getElementById('value').innerHTML = args.itemData.value || 'null';
        document.getElementById('text').innerHTML = args.itemData.text || 'null';
    }
};