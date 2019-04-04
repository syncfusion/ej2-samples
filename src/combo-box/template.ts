import { loadCultureFiles } from '../common/culture-loader';
/**
 * ComboBox Template Sample
 */
import { ComboBox } from '@syncfusion/ej2-dropdowns';
import * as data from './dataSource.json';

(window as any).default = (): void => {
    loadCultureFiles();
    // initialize ComboBox component
    let comboBoxObj: ComboBox = new ComboBox({
        // set the employees data to dataSource property
        dataSource: (data as any).empList,
        // map the appropriate columns to fields property
        fields: { text: 'Name', value: 'Eimg' },
        // set the template content for popup header element
        headerTemplate:
        '<div class="header"> <span>Photo</span> <span class="info">Employee Info</span></div>',
        // set the template content for list items
        itemTemplate: '<div><img class="empImage" src="src/combo-box/Employees/${Eimg}.png" alt="employee"/>' +
            '<div class="ename"> ${Name} </div><div class="job"> ${Designation} </div></div>',
        // set the placeholder to ComboBox input element
        placeholder: 'Select an employee',
        // set the height of the popup element
        popupHeight: '270px'
    });
    comboBoxObj.appendTo('#employees');
};