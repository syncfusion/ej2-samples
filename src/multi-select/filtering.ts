import { loadCultureFiles } from '../common/culture-loader';
/**
 * MultiSelect Filtering Sample
 */
import { MultiSelect, FilteringEventArgs } from '@syncfusion/ej2-dropdowns';
import {NumericTextBox} from '@syncfusion/ej2-inputs';
import { Query } from '@syncfusion/ej2-data';
import * as data from './dataSource.json';

(window as any).default = (): void => {
    loadCultureFiles();
    // initialize the MultiSelect component
    let listObj: MultiSelect = new MultiSelect({
        // set placeholder to MultiSelect input element
        placeholder: 'Select countries',
        // set the countries data to dataSource property
        dataSource: (data as any).countries,
        // bind the Query instance to query property
        query: new Query(),
        // map the appropriate columns to fields property
        fields: { text: 'Name', value: 'Code' },
        // set true for enable the filtering support.
        allowFiltering: true,
        debounceDelay :300,
        // bind the filtering event
        filtering: (e: FilteringEventArgs) => {
            let query: Query = new Query();
            // frame the query based on search string with filter type.
            query = (e.text !== '') ? query.where('Name', 'startswith', e.text, true) : query;
            // pass the filter data source, filter query to updateData method.
            e.updateData((data as any).countries, query);
        }
    });
    listObj.appendTo('#list');

    var numeric: NumericTextBox = new NumericTextBox({
        value: 300,
        min: 1,
        format:'n0',
        change: function (args) {
            listObj.debounceDelay = args.value;
        }
    });
    numeric.appendTo('#numeric');
};