import { loadCultureFiles } from '../common/culture-loader';
/**
 * DropDownList Filtering Sample
 */
import { DropDownList, FilteringEventArgs } from '@syncfusion/ej2-dropdowns';
import {NumericTextBox} from '@syncfusion/ej2-inputs';
import { Query } from '@syncfusion/ej2-data';
import * as data from './dataSource.json';

(window as any).default = (): void => {
    loadCultureFiles();
    // initialize DropDownList component
    let dropDownListObj: DropDownList = new DropDownList({
        // set the placeholder to DropDownList input element
        placeholder: 'Select a country',
        // set the placeholder to filter search box input element
        filterBarPlaceholder: 'Search',
        //set the local data to dataSource property
        dataSource: (data as any).countries,
        // map the appropriate columns to fields property
        fields: { text: 'Name', value: 'Code' },
        // set the height of the popup element
        popupHeight: '250px',
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
    dropDownListObj.appendTo('#country');
    var numeric: NumericTextBox = new NumericTextBox({
        value: 300,
        min: 1,
        format:'n0',
        change: function (args) {
            dropDownListObj.debounceDelay = args.value;
        }
    });
    numeric.appendTo('#numeric');
};