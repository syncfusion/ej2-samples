import { loadCultureFiles } from '../common/culture-loader';
import { ComboBox } from '@syncfusion/ej2-dropdowns';
import * as data from './dataSource.json';

(window as any).default = (): void => {
    loadCultureFiles();

// initialize ComboBox component
let defaultObject: ComboBox = new ComboBox({
    //set the data to dataSource property
    dataSource: (data as any).status,
    // set placeholder to ComboBox input element
    placeholder: "Select Staus",
    // set true for enable the filtering support.
    allowFiltering: true,
    // map the appropriate columns to fields property
    fields: { value: 'ID', text: 'Text', disabled: 'State' },
});

// render initialized ComboBox
defaultObject.appendTo('#default');

// initialize ComboBox component
let groupingObject: ComboBox = new ComboBox({
    //set the data to dataSource property
    dataSource: (data as any).groupingData,
    // set placeholder to ComboBox input element
    placeholder: "Select Vegetable",
    // map the appropriate columns to fields property
    fields: { groupBy: 'Category', text: 'Vegetable', value: 'Id', disabled: 'State' },
});

// render initialized ComboBox
groupingObject.appendTo('#grouping');

};