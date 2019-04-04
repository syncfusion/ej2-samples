import { loadCultureFiles } from '../common/culture-loader';
/**
 * MultiSelect Template Sample
 */
import { MultiSelect } from '@syncfusion/ej2-dropdowns';
import * as data from './dataSource.json';

(window as any).default = (): void => {
    loadCultureFiles();

    // initialize MultiSelect component
    let listObj: MultiSelect = new MultiSelect({
        // set the employees data to dataSource property
        dataSource: (data as any).empList,
        // map the appropriate columns to fields property
        fields: { text: 'Name', value: 'Eimg' },
        // set the template content for popup header element
        headerTemplate:
        '<div class="header"> <span>Photo</span> <span style="margin-left:17px">Employee Info</span></div>',
        // set the template content for list items
        itemTemplate: '<div><img class="empImage" src="src/drop-down-list/Employees/${Eimg}.png" alt="employee"/>' +
        '<div class="ename"> ${Name} </div><div class="job"> ${Job} </div></div>',
        // set the template content for displays the selected items in input element.
        valueTemplate: '<div style="width:100%;height:100%;">'
        + '<img class="value" src="src/drop-down-list/Employees/${Eimg}.png" height="26px" width="26px" alt="employee"/>'
        + '<div class="name"> ${Name} </div></div>',
        // set placeholder to MultiSelect input element
        placeholder: 'Select employees',
        // set the type of mode for how to visualized the selected items in input element.
        mode: 'Box'
    });
    listObj.appendTo('#template');
};