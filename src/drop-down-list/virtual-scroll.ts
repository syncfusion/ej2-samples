import { loadCultureFiles } from '../common/culture-loader';
/**
 * AutoComplete Default functionality Sample
 */
import { DropDownList , VirtualScroll } from '@syncfusion/ej2-dropdowns';
import * as data from './dataSource.json';

DropDownList.Inject(VirtualScroll);

let records: { [key: string]: Object }[] = [];

for (let i = 1; i <= 150; i++) {
    const item: { [key: string]: Object } = {
        id: 'id' + i,
        text: `Item ${i}`,
    };
    records.push(item);
}

(window as any).default = (): void => {
    loadCultureFiles();
    // initialize DropDownList component
    let listObj: DropDownList = new DropDownList({
        //set the local data to dataSource property
        dataSource: records,
        //enable the virtualization property
        enableVirtualization: true,
        popupHeight: '200px',
        allowFiltering: true,
        fields: { text: 'text', value: 'id' },
        // set the placeholder to DropDownList component
        placeholder: 'e.g. Item 1'
    });
    listObj.appendTo('#data');
};