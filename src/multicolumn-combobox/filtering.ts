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
        { field: 'Name', header: 'Name', width: 100 },
        { field: 'YearOfJoining', header: 'Year Of Joining', width: 120 },                      
        { field: 'Status', header: 'Status', width: 90 },
        { field: 'Location', header: 'Location', width: 100 },
        { field: 'Experience', header: 'Experience in Year', width: 150 }, 
    ];

    // Initialize multicolumn ComboBox component
    let multicolumnObj: MultiColumnComboBox = new MultiColumnComboBox({
        //set the local data to dataSource property
        dataSource: (data as any).workDetails,
        //set column of the multicolumn combobox
        columns: columns,
        //set the fields of the multicolumn combobox
        fields: { text: 'Name', value: 'Experience' },
        // set the placeholder to multiColumn comboBox input element
        placeholder: 'Select a name',
        // set the height of the popup element
        popupHeight: '230px',
        // bind the filtering event
        filtering: (e: FilteringEventArgs) => {
            let query: Query = new Query();
            // frame the query based on search string with filter type.
            query = (e.text !== '') ? query.where('Name', 'startswith', e.text, true) : query;
            // pass the filter data source, filter query to updateData method.
            e.updateData((data as any).workDetails, query);
        }
    });
    multicolumnObj.appendTo('#filtering');
};