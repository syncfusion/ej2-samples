import { loadCultureFiles } from '../common/culture-loader';
import { TreeView } from '@syncfusion/ej2-navigations';
import * as dataSource from './dataSource.json';
/**
 * TreeView multi selection sample
 */
(window as any).default = (): void => {
    loadCultureFiles();
    // Render the TreeView with node multi select option
    let treeObj: TreeView = new TreeView({
        fields: { dataSource: (dataSource as any).multiSelectData, id: 'id', parentID: 'pid', text: 'name', hasChildren: 'hasChild',
                selected: 'isSelected' },
        allowMultiSelection: true,
    });
    treeObj.appendTo('#tree');
};