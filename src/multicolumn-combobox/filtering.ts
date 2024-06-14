import { loadCultureFiles } from '../common/culture-loader';
/**
 * MultiColumn ComboBox Filtering Sample
 */
import { MultiColumnComboBox, ColumnModel, FilteringEventArgs } from '@syncfusion/ej2-multicolumn-combobox';
import { Query } from '@syncfusion/ej2-data';
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
        // set the placeholder to multiColumn comboBox input element
        placeholder: 'Select a country',
        // set the height of the popup element
        popupHeight: '200px',
        // bind the filtering event
        filtering: (e: FilteringEventArgs) => {
            let query: Query = new Query();
            // frame the query based on search string with filter type.
            query = (e.text !== '') ? query.where('ShipCountry', 'startswith', e.text, true) : query;
            // pass the filter data source, filter query to updateData method.
            e.updateData((data as any).orderDetails, query);
        }
    });
    multicolumnObj.appendTo('#filtering');
};