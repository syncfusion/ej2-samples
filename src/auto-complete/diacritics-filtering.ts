import { loadCultureFiles } from '../common/culture-loader';


/**
 * AutoComplete Diacritics functionality Sample
 */
import { AutoComplete } from '@syncfusion/ej2-dropdowns';
import * as data from './dataSource.json';

(window as any).default = (): void => {
    loadCultureFiles();
    // initialize AutoComplete component
    let atcObj: AutoComplete = new AutoComplete({
        //set the local data to dataSource property
        dataSource: (data as any).data,
        // set the placeholder to AutoComplete input element
        placeholder: 'e.g: gul',
        // enabled the ignoreAccent property for ignore the diacritics
        ignoreAccent: true
    });
    atcObj.appendTo('#list');
};