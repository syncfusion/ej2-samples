import { loadCultureFiles } from '../common/culture-loader';
/**
 * MultiSelect Checkbox Samples
 */
import { MultiSelect, CheckBoxSelection } from '@syncfusion/ej2-dropdowns';
import { NumericTextBox } from '@syncfusion/ej2-inputs';
import { Button } from '@syncfusion/ej2-buttons';
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
        // set maximum selection length in Multiselect.
        maximumSelectionLength: 3,
        // set true for enable the dropdown icon.
        showDropDownIcon: true,
        // set the placeholder to MultiSelect filter input element
        filterBarPlaceholder: 'Search countries',
        // set the MultiSelect popup height
        popupHeight: '350px'

    });
    checkList.appendTo('#checkbox');
    // Render the Numeric Textbox
    let numeric: NumericTextBox = new NumericTextBox({
        value: 3,
        min: 1,
        format: 'n0',
        max: (data as any).countries.length
    });
    numeric.appendTo('#maxsel');
    // Render Button control in properties panel
    let buttonApply: Button = new Button();
    buttonApply.appendTo('#buttonApply');

    // After clicking apply button- 'min', 'max' and 'increment step' details will be received from properties panel
    // and set it to Numeric Textbox.
    document.getElementById('buttonApply').onclick = (): void => {
        let maxsel: number = parseFloat((document.getElementById('maxsel') as HTMLInputElement).value);
        checkList.value = null;
        checkList.maximumSelectionLength = maxsel;
    };
};