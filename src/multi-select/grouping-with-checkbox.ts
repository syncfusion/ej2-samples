import { loadCultureFiles } from '../common/culture-loader';
/**
 * MultiSelect Checkbox Samples
 */
import { MultiSelect, CheckBoxSelection } from '@syncfusion/ej2-dropdowns';
import * as data from './dataSource.json';

MultiSelect.Inject(CheckBoxSelection);

(window as any).default = () => {
    loadCultureFiles();
    // initialize the MultiSelect component
    let checkList: MultiSelect = new MultiSelect({
    // set the country data to dataSource property
    dataSource: (data as any).vegetableData,
    // map the appropriate columns to fields property
    fields: { groupBy: 'Category', text: 'Vegetable', value: 'Id' },
    // set the type of mode for checkbox to visualized the checkbox added in li element.
    mode: 'CheckBox',
    // set the placeholder to MultiSelect input element
    placeholder: 'Select Vegatables',
    // set enableSelectionOrder as false
    enableSelectionOrder: false,
    // set true for enable the selectAll support.
    showSelectAll: true,
    // set the placeholder to MultiSelect filter input element
    filterBarPlaceholder: 'Search Vegetables',
    // set true for checkbox grouping support
    enableGroupCheckBox: true
    });
    checkList.appendTo('#checkbox');
};