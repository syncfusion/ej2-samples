import { loadCultureFiles } from '../common/culture-loader';


/**
 * MultiSelect Diacritics functionality Sample
 */
import { MultiSelect } from '@syncfusion/ej2-dropdowns';
import * as data from './dataSource.json';

(window as any).default = (): void => {
    loadCultureFiles();
    // initialize MultiSelect component
    let multiObj: MultiSelect = new MultiSelect({
        //set the local data to dataSource property
        dataSource: (data as any).data,
        // set the placeholder to MultiSelect input element
        placeholder: 'e.g: gul',
        // enabled the ignoreAccent property for ignore the diacritics
        ignoreAccent: true,
        // set true for enable the filtering support.
        allowFiltering: true
    });
    multiObj.appendTo('#list');
};