import { loadCultureFiles } from '../common/culture-loader';
/**
 * Dropdown Tree Filtering Sample
 */
import { DropDownTree } from '@syncfusion/ej2-dropdowns';
import * as dataSource from './dataSource.json';

(window as any).default = (): void => {
    loadCultureFiles();
    // Initialize the Dropdown Tree control
    let ddtObj: DropDownTree = new DropDownTree({
        placeholder: 'Select an item',
        filterBarPlaceholder: 'Search',
        fields: { dataSource: (dataSource as any).filteringData, value: 'id', parentValue: 'pid', text: 'name', hasChildren: 'hasChild' },
        popupHeight: '250px',
        allowFiltering: true,
    });
    ddtObj.appendTo('#filtering');
};