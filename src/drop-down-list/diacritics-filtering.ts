import { loadCultureFiles } from '../common/culture-loader';


/**
 * DropDownList Diacritics functionality Sample
 */
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import * as data from './dataSource.json';

(window as any).default = (): void => {
    loadCultureFiles();
    // initialize DropDownList component
    let ddlObj: DropDownList = new DropDownList({
        //set the local data to dataSource property
        dataSource: (data as any).data,
        // set the placeholder to DropDownList input element
        placeholder: 'Select a value',
        // enabled the ignoreAccent property for ignore the diacritics
        ignoreAccent: true,
        // set true for enable the filtering support.
        allowFiltering: true,
         // set the placeholder to filter search box input element
        filterBarPlaceholder: 'e.g: gul'
    });
    ddlObj.appendTo('#list');
};