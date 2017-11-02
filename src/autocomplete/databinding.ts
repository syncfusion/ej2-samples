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
    let atcObj1: AutoComplete = new AutoComplete({
        dataSource: new DataManager({
            url: 'http://services.odata.org/V4/Northwind/Northwind.svc/Products',
            adaptor: new ODataV4Adaptor,
            crossDomain: true
        }),
        suggestionCount: 5,
        query: new Query().select(['ProductID', 'ProductName']),
        fields: { value: 'ProductName' },
        placeholder: 'e.g. Alice Mutton',
        sortOrder: 'Ascending',
        autofill: true,
        filterType: 'StartsWith'
    });
    atcObj1.appendTo('#products');
    let atcObj2: AutoComplete = new AutoComplete({
        dataSource: countries,
        fields: { value: 'Name' },
        placeholder: 'e.g. Australia',
        sortOrder: 'Ascending',
        filterType: 'StartsWith',
        autofill: true
    });
    atcObj2.appendTo('#country');

    let checkBoxObj: CheckBox = new CheckBox({
        checked: true,
        label: 'Autofill',
        change: (args: ChangeEventArgs) => {
            atcObj1.autofill = args.checked;
            atcObj2.autofill = args.checked;
        }
    });
    checkBoxObj.appendTo('#checkAutofill');
};