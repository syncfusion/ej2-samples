/**
 * MultiSelect Filtering Sample
 */
import { MultiSelect, FilteringEventArgs } from '@syncfusion/ej2-dropdowns';
import { Query } from '@syncfusion/ej2-data';
import { EmitType } from '@syncfusion/ej2-base';

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
    let targetElement: HTMLElement;
    let popupElement: HTMLElement;
    let spinnerElement: HTMLElement;
    let onFiltering: EmitType<FilteringEventArgs> = debounce(
        (e: FilteringEventArgs) => {
            let query: Query = new Query();
            query = (e.text !== '') ? query.where('Name', 'startswith', e.text, true) : query;
            e.updateData(countries, query);
        },
        200);
    let listObj: MultiSelect = new MultiSelect({
        placeholder: 'Select countries',
        dataSource: countries,
        query: new Query(),
        fields: { text: 'Name', value: 'Code' },
        allowFiltering: true,
        filtering: onFiltering,
    });
    listObj.appendTo('#list');
    function debounce(func: Function, wait: number): EmitType<FilteringEventArgs> {
        let timeout: number;
        let isTypedFirst: boolean = false;
        /* tslint:disable */
        return function () {
            /* tslint:enable */
            let context: object = this;
            let args: IArguments = arguments;
            let later: Function = () => {
                timeout = null;
                if (!isTypedFirst) { func.apply(context, args); }
            };
            let callNow: boolean = !isTypedFirst && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) {
                isTypedFirst = true;
                func.apply(context, args);
            } else {
                isTypedFirst = false;
            }
        };
    }
};