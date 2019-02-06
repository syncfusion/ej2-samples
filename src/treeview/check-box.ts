import { loadCultureFiles } from '../common/culture-loader';
import { TreeView } from '@syncfusion/ej2-navigations';
import * as dataSource from './dataSource.json';
/**
 * TreeView checkbox sample
 */
(window as any).default = (): void => {
    loadCultureFiles();
    // Render the TreeView with checkboxes
    let treeObj: TreeView = new TreeView({
        fields: { dataSource: (dataSource as any).checkboxData, id: 'id', parentID: 'pid', text: 'name', hasChildren: 'hasChild' },
        showCheckBox: true,
    });
    treeObj.appendTo('#tree');
};