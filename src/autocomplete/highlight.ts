/**
 * AutoComplete Highlight Search Sample
 */
import { AutoComplete, DropDownList, ChangeEventArgs, FilterType} from '@syncfusion/ej2-dropdowns';

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

    // initialize AutoComplete component
    let atcObj: AutoComplete = new AutoComplete({
        // set the local data to dataSource property
        dataSource: countries,
        // map the appropriate columns to fields property
        fields: { value: 'Name' },
        // set the placeholder to AutoComplete input element
        placeholder: 'e.g. Australia',
        // enable the highlight property to highlight the matched character in suggestion list
        highlight: true
    });
    atcObj.appendTo('#country');

    // initialize DropDownList component
    let ddlObj: DropDownList = new DropDownList({
        // set the array of string data to dataSource property
        dataSource: ['Contains', 'StartsWith', 'EndsWith'],
        // set the value to select an item at initial rendering.
        text: 'Contains',
        // set the placeholder to DropDownList input element
        placeholder: 'Select a type',
        // set width size of DropDownList element.
        width: '150px',
        // bind change event to modify the filter type of AutoComplete element.
        change: (e: ChangeEventArgs) => {
            atcObj.filterType = <FilterType>e.itemData.value;
        }
    });
    ddlObj.appendTo('#filter-type');
};