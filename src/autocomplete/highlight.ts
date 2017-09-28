/**
 * AutoComplete Highlight Search Sample
 */
import { AutoComplete, DropDownList, ChangeEventArgs, FilterType} from '@syncfusion/ej2-dropdowns';

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
    let atcObj: AutoComplete = new AutoComplete({
        dataSource: countries,
        fields: { value: 'name' },
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