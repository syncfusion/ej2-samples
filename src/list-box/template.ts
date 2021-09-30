import { loadCultureFiles } from '../common/culture-loader';
/**
 * ListBox template sample
 */
import { ListBox } from '@syncfusion/ej2-dropdowns';
import * as data from './datasource.json';
 
(window as any).default = (): void => {
    loadCultureFiles();
    // Initialize ListBox component.
    let listObj: ListBox = new ListBox({
        // Set the data source property.
        dataSource: (data as any).template_data,
        // set the template content for list items
        itemTemplate:  '<div class="list-wrapper">' +
        '<span class="${pic} e-avatar e-avatar-xlarge e-avatar-circle"></span>' +
        '<span class="text">${text}</span><span class="description">' +
        '${description}</span></div>'
    });
    listObj.appendTo('#listbox');
};
 