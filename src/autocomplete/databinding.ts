/**
 * AutoComplete Remote-Data & Local-Data Samples
 */
import { AutoComplete } from '@syncfusion/ej2-dropdowns';
import { Query, DataManager, ODataV4Adaptor } from '@syncfusion/ej2-data';
import { CheckBox, ChangeEventArgs } from '@syncfusion/ej2-buttons';

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
    let loader: HTMLElement;
    // initialize AutoComplete component
    let atcObj1: AutoComplete = new AutoComplete({
        // bind the DataManager instance to dataSource property
        dataSource: new DataManager({
            url: 'http://services.odata.org/V4/Northwind/Northwind.svc/Products',
            adaptor: new ODataV4Adaptor,
            crossDomain: true
        }),
        // set the count for displays the suggestion items.
        suggestionCount: 5,
        // bind the Query instance to query property
        query: new Query().select(['ProductID', 'ProductName']),
        // map the appropriate columns to fields property
        fields: { value: 'ProductName' },
        // set the placeholder to AutoComplete input element
        placeholder: 'e.g. Alice Mutton',
        // sort the resulted items
        sortOrder: 'Ascending',
        // enable the autofill property to fill a first matched value in input when press a down key
        autofill: true,
        // set the filterType to searching operation
        filterType: 'StartsWith'
    });
    atcObj1.appendTo('#products');

    // initialize AutoComplete component
    let atcObj2: AutoComplete = new AutoComplete({
        //set the local data to dataSource property
        dataSource: countries,
        // map the appropriate columns to fields property
        fields: { value: 'Name' },
        // set the placeholder to AutoComplete input element
        placeholder: 'e.g. Australia',
        // sort the resulted items
        sortOrder: 'Ascending',
        // set the filterType to searching operation
        filterType: 'StartsWith',
        // enable the autofill property to fill a first matched value in input when press a down key
        autofill: true
    });
    atcObj2.appendTo('#country');

    // initialize check box component
    let checkBoxObj: CheckBox = new CheckBox({
        // set true for enable the checked state at initial rendering
        checked: true,
        // set text value for check box element.
        label: 'Autofill',
        // bind change event
        change: (args: ChangeEventArgs) => {
            // enable or disable the autofill in remote data AutoComplete based on CheckBox checked state
            atcObj1.autofill = args.checked;
            // enable or disable the autofill in local data AutoComplete based on CheckBox checked state
            atcObj2.autofill = args.checked;
        }
    });
    checkBoxObj.appendTo('#checkAutofill');
};