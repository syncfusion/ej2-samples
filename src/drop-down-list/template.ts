import { loadCultureFiles } from '../common/culture-loader';
/**
 * DropDownList Template Sample
 */
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import * as data from './dataSource.json';

(window as any).default = (): void => {
    loadCultureFiles();
    // initialize DropDownList component
    let dropDownListObj: DropDownList = new DropDownList({
        // set the employees data to dataSource property
        dataSource: (data as any).empList,
        // map the appropriate columns to fields property
        fields: { text: 'Name' },
        // set the template content for popup header element
        headerTemplate:
        '<div class="header"> <span>Photo</span> <span class="info">Employee Info</span></div>',
        // set the template content for list items
        itemTemplate: '<div><img class="empImage" src="src/drop-down-list/Employees/${Eimg}.png" alt="employee"/>' +
        '<div class="ename"> ${Name} </div><div class="job"> ${Designation} </div></div>',
        // set the template content for displays the selected items in input element.
        valueTemplate: '<div style="width:100%;height:100%;">'
        + '<img class="value" src="src/drop-down-list/Employees/${Eimg}.png" height="26px" width="26px" alt="employee"/>'
        + '<div class="name"> ${Name} </div></div>',
        // set the placeholder to DropDownList input element
        placeholder: 'Select an employee',
        // set the height of the popup element
        popupHeight: '270px'
    });
    dropDownListObj.appendTo('#employees');
};