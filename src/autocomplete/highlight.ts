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
    let atcObj: AutoComplete = new AutoComplete({
        dataSource: countries,
        fields: { value: 'Name' },
        placeholder: 'e.g. Australia',
        highlight: true
    });
    atcObj.appendTo('#country');
    let ddlObj: DropDownList = new DropDownList({
        dataSource: ['Contains', 'StartsWith', 'EndsWith'],
        text: 'Contains',
        placeholder: 'Select a type',
        width: '150px',
        change: (e: ChangeEventArgs) => {
            atcObj.filterType = <FilterType>e.itemData;
        }
    });
    ddlObj.appendTo('#filter-type');
};