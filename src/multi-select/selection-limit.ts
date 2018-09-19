/**
 * MultiSelect Checkbox Samples
 */
import { MultiSelect, CheckBoxSelection } from '@syncfusion/ej2-dropdowns';
import { NumericTextBox } from '@syncfusion/ej2-inputs';
import { Button } from '@syncfusion/ej2-buttons';

MultiSelect.Inject(CheckBoxSelection);

this.default = () => {

    let countries: { [key: string]: Object; }[] = [
        { Name: 'Australia', Code: 'AU' },
        { Name: 'Bermuda', Code: 'BM' },
        { Name: 'Canada', Code: 'CA' },
        { Name: 'Cameroon', Code: 'CM' },
        { Name: 'Denmark', Code: 'DK' },
        { Name: 'France', Code: 'FR' },
        { Name: 'Finland', Code: 'FI' },
        { Name: 'Germany', Code: 'DE' },
        { Name: 'Greenland', Code: 'GL' },
        { Name: 'Hong Kong', Code: 'HK' },
        { Name: 'India', Code: 'IN' },
        { Name: 'Italy', Code: 'IT' },
        { Name: 'Japan', Code: 'JP' },
        { Name: 'Mexico', Code: 'MX' },
        { Name: 'Norway', Code: 'NO' },
        { Name: 'Poland', Code: 'PL' },
        { Name: 'Switzerland', Code: 'CH' },
        { Name: 'United Kingdom', Code: 'GB' },
        { Name: 'United States', Code: 'US' }
    ];

    // initialize the MultiSelect component
    let checkList: MultiSelect = new MultiSelect({
        // set the country data to dataSource property
        dataSource: countries,
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
        max: countries.length
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