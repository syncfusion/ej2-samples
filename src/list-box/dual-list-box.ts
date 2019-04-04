import { loadCultureFiles } from '../common/culture-loader';
/**
 * ListBox dual list box sample.
 */
import { ListBox } from '@syncfusion/ej2-dropdowns';
import * as data from './datasource.json';

(window as any).default = (): void => {
    loadCultureFiles();

    // Initialize ListBox component.
    let listObj1: ListBox = new ListBox({
        // Set the groupa data to the data source.
        dataSource: (data as any).groupa,

        // Map the appropriate columns to fields property.
        fields: { text: 'Name'},

        height: '330px',

        // Set the scope of the ListBox.
        scope: '#listbox2',

        // Set the tool settings with set of items.
        toolbarSettings: { items: ['moveUp', 'moveDown', 'moveTo', 'moveFrom', 'moveAllTo', 'moveAllFrom']}
    });

    listObj1.appendTo('#listbox1');

    // Initialize ListBox component.
    let listObj2: ListBox = new ListBox({
        // Set the groupa data to the data source.
        dataSource: (data as any).groupb,

        height: '330px',

        // Set field property with text as `Name`.
        fields: { text: 'Name'}
    });

    listObj2.appendTo('#listbox2');
};