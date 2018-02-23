/**
 * MultiSelect Remote Data & Local Data Samples
 */
import { MultiSelect } from '@syncfusion/ej2-dropdowns';
import { Query, DataManager, ODataAdaptor } from '@syncfusion/ej2-data';


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

    // initialize MultiSelect component
    let listObj: MultiSelect = new MultiSelect({
        // bind the DataManager instance to dataSource property
        dataSource: new DataManager({
            url: 'https://js.syncfusion.com/demos/ejServices/Wcf/Northwind.svc/Customers',
            adaptor: new ODataAdaptor,
            crossDomain: true
        }),
        // bind the Query instance to query property
        query: new Query().select(['ContactName', 'CustomerID']).take(25),
        // map the appropriate columns to fields property
        fields: { text: 'ContactName', value: 'CustomerID' },
        // set the placeholder to MultiSelect input element
        placeholder: 'Select customer',
        // sort the resulted items
        sortOrder: 'Ascending'
    });
    listObj.appendTo('#remote');

    // initialize MultiSelect component
    let games: MultiSelect = new MultiSelect({
        // set the local data to dataSource property
        dataSource: countries,
        // map the appropriate columns to fields property
        fields: { text: 'Name', value: 'Code'},
        // set the placeholder to MultiSelect input element
        placeholder: 'Select countries',
    });
    games.appendTo('#local');
};