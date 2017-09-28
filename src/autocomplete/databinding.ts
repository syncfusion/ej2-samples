/**
 * AutoComplete Remote-Data & Local-Data Samples
 */
import { AutoComplete } from '@syncfusion/ej2-dropdowns';
import { Query, DataManager, ODataV4Adaptor } from '@syncfusion/ej2-data';
import { CheckBox, ChangeEventArgs } from '@syncfusion/ej2-buttons';

this.default = () => {
    let countries: { [key: string]: Object; }[] = [
        { name: 'Australia', code: 'AU' },
        { name: 'Bermuda', code: 'BM' },
        { name: 'Canada', code: 'CA' },
        { name: 'Cameroon', code: 'CM' },
        { name: 'Denmark', code: 'DK' },
        { name: 'France', code: 'FR' },
        { name: 'Finland', code: 'FI' },
        { name: 'Germany', code: 'DE' },
        { name: 'Greenland', code: 'GL' },
        { name: 'Hong Kong', code: 'HK' },
        { name: 'India', code: 'IN' },
        { name: 'Italy', code: 'IT' },
        { name: 'Japan', code: 'JP' },
        { name: 'Mexico', code: 'MX' },
        { name: 'Norway', code: 'NO' },
        { name: 'Poland', code: 'PL' },
        { name: 'Switzerland', code: 'CH' },
        { name: 'United Kingdom', code: 'GB' },
        { name: 'United States', code: 'US' }
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
        filterType: 'StartsWith',
        actionBegin: () => {
            let spinner: HTMLElement = <HTMLElement>document.querySelector('.e-spinner-icon');
            if (!spinner) {
                loader = <HTMLElement>document.querySelectorAll('.e-clear-icon')[1];
                loader.classList.remove('e-clear-icon');
                loader.classList.add('e-spinner-icon');
                loader.classList.add('e-input-group-icon');
            }
        },
        actionComplete: () => {
            removeIcon();
        },
        actionFailure: () => {
            removeIcon();
        }
    });
    atcObj1.appendTo('#products');
    let atcObj2: AutoComplete = new AutoComplete({
        dataSource: countries,
        fields: { value: 'name' },
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
    function removeIcon(): void {
        loader.classList.remove('e-spinner-icon');
        loader.classList.remove('e-input-group-icon');
        loader.classList.add('e-clear-icon');
    }
};