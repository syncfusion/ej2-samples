import { loadCultureFiles } from '../common/culture-loader';
import { AutoComplete } from '@syncfusion/ej2-dropdowns';
import * as data from './dataSource.json';

(window as any).default = (): void => {
    loadCultureFiles();

// initialize AutoComplete component
let defaultObject: AutoComplete = new AutoComplete({
    //set the data to dataSource property
    dataSource: (data as any).status,
    // set placeholder to AutoComplete input element
    placeholder: "Select Status",
    // map the appropriate columns to fields property
    fields: { value: 'Status', disabled: 'State' },
});

// render initialized AutoComplete
defaultObject.appendTo('#default');

// initialize AutoComplete component
let groupingObject: AutoComplete = new AutoComplete({
    //set the data to dataSource property
    dataSource: (data as any).groupingData,
    // set placeholder to AutoComplete input element
    placeholder: "Select Vegetable",
    // map the appropriate columns to fields property
    fields: { groupBy: 'Category', value: 'Vegetable', disabled: 'State' },
});

// render initialized AutoComplete
groupingObject.appendTo('#grouping');

};