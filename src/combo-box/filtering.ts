import { loadCultureFiles } from '../common/culture-loader';
/**
 * ComboBox Filtering Samples
 */
import { ComboBox, FilteringEventArgs } from '@syncfusion/ej2-dropdowns';
import { Query } from '@syncfusion/ej2-data';
import * as data from './dataSource.json';

(window as any).default = (): void => {
    loadCultureFiles();
    // initialize ComboBox component
    let comboBoxObj: ComboBox = new ComboBox({
        //set the local data to dataSource property
        dataSource: (data as any).countries,
        // map the appropriate columns to fields property
        fields: { text: 'Name', value: 'Code' },
        // set the placeholder to ComboBox input element
        placeholder: 'Select a country',
        // set the height of the popup element
        popupHeight: '270px',
        // set true for enable the filtering support.
        allowFiltering: true,
        // bind the filtering event
        filtering: (e: FilteringEventArgs) => {
            let query: Query = new Query();
            // frame the query based on search string with filter type.
            query = (e.text !== '') ? query.where('Name', 'startswith', e.text, true) : query;
            // pass the filter data source, filter query to updateData method.
            e.updateData((data as any).countries, query);
        }
    });
    comboBoxObj.appendTo('#country');
};