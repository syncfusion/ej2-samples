import { loadCultureFiles } from '../common/culture-loader';
/**
 * ListBox default sample
 */
import { ListBox } from '@syncfusion/ej2-dropdowns';
import * as data from './datasource.json';

(window as any).default = (): void => {
    loadCultureFiles();

    // Initialize ListBox component.
    let listObj: ListBox = new ListBox({
        // Set the data source property.
        dataSource: (data as any).info
    });
    listObj.appendTo('#listbox');
};