/**
 * MultiSelect Remote Data & Local Data Samples
 */
import { MultiSelect } from '@syncfusion/ej2-dropdowns';
import { Query, DataManager, ODataV4Adaptor } from '@syncfusion/ej2-data';


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


    let listObj: MultiSelect = new MultiSelect({
        dataSource: new DataManager({
            url: 'http://services.odata.org/V4/Northwind/Northwind.svc/Customers',
            adaptor: new ODataV4Adaptor,
            crossDomain: true
        }),
        query: new Query().select(['ContactName', 'CustomerID']).take(25),
        fields: { text: 'ContactName', value: 'CustomerID' },
        placeholder: 'Select customer',
        sortOrder: 'Ascending',
        actionBegin: () => {
            let element: HTMLElement[] = <HTMLElement[] & NodeListOf<Element>>
                document.querySelector('.control-section').querySelectorAll('.e-chips-close.e-icon');
            element[1].classList.remove('e-close-hooker');
            element[1].classList.add('e-spinner-icon');
            element[1].style.display = 'block';
        },
        actionComplete: () => {
            removeIcon();
        },
        actionFailure: () => {
            removeIcon();
        }
    });
    listObj.appendTo('#remote');

    let games: MultiSelect = new MultiSelect({
        dataSource: countries,
        fields: { text: 'Name', value: 'Code'},
        placeholder: 'Select countries',
    });
    games.appendTo('#local');
    function removeIcon(): void {
        let element: HTMLElement[] = <HTMLElement[] & NodeListOf<Element>>
            document.querySelector('.control-section').querySelectorAll('.e-chips-close.e-icon');
        element[1].classList.add('e-close-hooker');
        element[1].classList.remove('e-spinner-icon');
        element[1].style.display = 'none';
    }
};