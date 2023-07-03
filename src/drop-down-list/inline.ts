import { loadCultureFiles } from '../common/culture-loader';
/**
 * DropDownList Inline Sample
 */
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import * as data from './dataSource.json';

(window as any).default = (): void => {
    loadCultureFiles();

    // Initialize DropDownList component
    let dropDownListObj: DropDownList = new DropDownList({
        // set the employees data to dataSource property
        dataSource: (data as any).employees,
        // map the appropriate columns to fields property
        fields: { text: 'Name' },
        // set the initial DropDownList value
        value: 'Michael',
        // set the placeholder to DropDownList input element
        placeholder: 'Select an employee',
        // set the width to component
        width: '65px',
        // set the width to popup element
        popupWidth: '140px',
        // set the height to popup element
        popupHeight: '200px',
         // set the cssClass for override the component default styles
        cssClass: 'inlinecss'
    });
    dropDownListObj.appendTo('#inline');
};
