import { loadCultureFiles } from '../common/culture-loader';
/**
 * AutoComplete Default functionality Sample
 */
import { AutoComplete, VirtualScroll } from '@syncfusion/ej2-dropdowns';
import * as data from './dataSource.json';

AutoComplete.Inject(VirtualScroll);

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
    // initialize AutoComplete component
    let atcObj: AutoComplete = new AutoComplete({
        //set the local data to dataSource property
        dataSource: records,
        popupHeight: '200px',
        //enable the virtualization property
        enableVirtualization: true,
        fields: { text: 'text', value: 'text' },
        // set the placeholder to AutoComplete input element
        placeholder: 'e.g. Item 1'
    });
    atcObj.appendTo('#data');
};