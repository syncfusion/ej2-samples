/**
 * DropDownList Filtering Sample
 */
import { DropDownList, FilteringEventArgs } from '@syncfusion/ej2-dropdowns';
import { Query } from '@syncfusion/ej2-data';

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
    let dropDownListObj: DropDownList = new DropDownList({
        placeholder: 'Select a country',
        filterBarPlaceholder: 'Search',
        dataSource: countries,
        fields: { text: 'Name', value: 'Code' },
        popupHeight: '250px',
        allowFiltering: true,
        filtering: (e: FilteringEventArgs) => {
            let query: Query = new Query();
            query = (e.text !== '') ? query.where('Name', 'startswith', e.text, true) : query;
            e.updateData(countries, query);
        }
    });
    dropDownListObj.appendTo('#country');
};