import { loadCultureFiles } from '../common/culture-loader';
/**
 * MultiSelect Filtering Sample
 */
import { MultiSelect} from '@syncfusion/ej2-dropdowns';
import { Query } from '@syncfusion/ej2-data';
import * as data from './dataSource.json';

(window as any).default = (): void => {
    loadCultureFiles();
    // initialize the MultiSelect component
    let listObj: MultiSelect = new MultiSelect({
        // set placeholder to MultiSelect input element
        placeholder: 'Select countries',
        // set true for enable the resize property to multi select
        allowResize: true,
        // set the countries data to dataSource property
        dataSource: (data as any).countries,
        // map the appropriate columns to fields property
        fields: { text: 'Name', value: 'Code' },
    });
    listObj.appendTo('#list');
};
