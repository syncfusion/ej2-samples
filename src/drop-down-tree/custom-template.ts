import { loadCultureFiles } from '../common/culture-loader';
/**
 * Dropdown Tree custom value template Samples
 */
import { DropDownTree } from '@syncfusion/ej2-dropdowns';
import * as dataSource from './dataSource.json';

(window as any).default = (): void => {
    loadCultureFiles();
    let checkList: DropDownTree = new DropDownTree({
        fields: { dataSource: (dataSource as any).checkboxData, value: 'id', parentValue: 'pid', text: 'name',
        hasChildren: 'hasChild', expanded: 'expanded' },
        placeholder: 'Select items',
        popupHeight: '200px',
        mode: 'Custom',
        customTemplate: "${value.length} item(s) selected",
        showCheckBox: true,
        treeSettings: { autoCheck: true }
    });
    checkList.appendTo('#checkbox');
};