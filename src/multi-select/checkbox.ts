import { loadCultureFiles } from '../common/culture-loader';
/**
 * MultiSelect Checkbox Samples
 */
import { MultiSelect, CheckBoxSelection } from '@syncfusion/ej2-dropdowns';
import { CheckBox, ChangeEventArgs } from '@syncfusion/ej2-buttons';
import * as data from './dataSource.json';

MultiSelect.Inject(CheckBoxSelection);

(window as any).default = (): void => {
    loadCultureFiles();
    // initialize the MultiSelect component
    let checkList: MultiSelect = new MultiSelect({
        // set the country data to dataSource property
        dataSource: (data as any).countries,
        // map the appropriate columns to fields property
        fields: { text: 'Name', value: 'Code' },
        // set the type of mode for checkbox to visualized the checkbox added in li element.
        mode: 'CheckBox',
        // set the placeholder to MultiSelect input element
        placeholder: 'Select countries',
        // set true for enable the selectAll support.
        showSelectAll: true,
        // set true for enable the dropdown icon.
        showDropDownIcon: true,
        // set the placeholder to MultiSelect filter input element
        filterBarPlaceholder: 'Search countries',
        // set the MultiSelect popup height
        popupHeight: '350px'

    });
    checkList.appendTo('#checkbox');
    // Initialize the CheckBox component
    let checkBoxObj: CheckBox = new CheckBox({
        // set true for enable the checked state at initial rendering
        checked: true,
        // set text value for check box element.
        label: 'Show Select All',
        // bind change event
        change: (args: ChangeEventArgs) => {
            // enable or disable the SelectAll in multiselect on CheckBox checked state
            checkList.showSelectAll = args.checked;
        }
    });
    checkBoxObj.appendTo('#selectall');
    // Initialize the CheckBox component
    checkBoxObj = new CheckBox({
        // set true for enable the checked state at initial rendering
        checked: true,
        // set text value for check box element.
        label: 'DropDown Button',
        // bind change event
        change: (args: ChangeEventArgs) => {
            // enable or disable the SelectAll in multiselect on CheckBox checked state
            checkList.showDropDownIcon = args.checked;
        }
    });
    checkBoxObj.appendTo('#dropicon');
    // Initialize the CheckBox component
    checkBoxObj = new CheckBox({
        // set true for enable the checked state at initial rendering
        checked: true,
        // set text value for check box element.
        label: 'Selection Reorder',
        // bind change event
        change: (args: ChangeEventArgs) => {
            // enable or disable the SelectAll in multiselect on CheckBox checked state
            checkList.enableSelectionOrder = args.checked;
        }
    });
    checkBoxObj.appendTo('#reorder');
};