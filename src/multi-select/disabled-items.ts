import { loadCultureFiles } from '../common/culture-loader';
import { MultiSelect, CheckBoxSelection } from '@syncfusion/ej2-dropdowns';
import * as data from './dataSource.json';

MultiSelect.Inject(CheckBoxSelection);

(window as any).default = (): void => {
    loadCultureFiles();

    // initialize MultiSelect component
    let defaultObject: MultiSelect = new MultiSelect({
        //set the data to dataSource property
        dataSource: (data as any).status,
        // set placeholder to MultiSelect input element
        placeholder: "Select Tags",
        // set true for enable the filtering support.
        allowFiltering: true,
        // map the appropriate columns to fields property
        fields: { value: 'ID', text: 'Text', disabled: 'State' },
    });

    // render initialized MultiSelect
    defaultObject.appendTo('#default');

    // initialize MultiSelect component
    let groupingObject: MultiSelect = new MultiSelect({
        //set the data to dataSource property
        dataSource: (data as any).groupingData,
        // set placeholder to MultiSelect input element
        placeholder: "Select Vegetables",
        // map the appropriate columns to fields property
        fields: { groupBy: 'Category', text: 'Vegetable', value: 'Id', disabled: 'State' },
        // set the type of mode for checkbox to visualized the checkbox added in li element.
        mode: 'CheckBox',
    });

    // render initialized MultiSelect
    groupingObject.appendTo('#grouping');

};