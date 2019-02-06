import { loadCultureFiles } from '../common/culture-loader';


/**
 * ComboBox Diacritics functionality Sample
 */
import { ComboBox } from '@syncfusion/ej2-dropdowns';
import * as data from './dataSource.json';

(window as any).default = (): void => {
    loadCultureFiles();
    // initialize ComboBox component
    let comboObj: ComboBox = new ComboBox({
        //set the local data to dataSource property
        dataSource: (data as any).data,
        // set the placeholder to ComboBox input element
        placeholder: 'e.g: gul',
        // enabled the ignoreAccent property for ignore the diacritics
        ignoreAccent: true,
        // set true for enable the filtering support.
        allowFiltering: true
    });
    comboObj.appendTo('#list');
};