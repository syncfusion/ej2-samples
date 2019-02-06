import { loadCultureFiles } from '../common/culture-loader';
import { TreeView } from '@syncfusion/ej2-navigations';
import * as dataSource from './dataSource.json';
/**
 * TreeView local data sample
 */
(window as any).default = (): void => {
    loadCultureFiles();
    // Render the TreeView with hierarchical data source
    let treeObj: TreeView = new TreeView({
        fields: { dataSource: (dataSource as any).hierarchicalData, id: 'code', text: 'name', child: 'countries' }
    });
    treeObj.appendTo('#tree');

    let listTreeObj: TreeView = new TreeView({
        fields: { dataSource: (dataSource as any).localData, id: 'id', parentID: 'pid', text: 'name', hasChildren: 'hasChild' }
    });
    listTreeObj.appendTo('#listtree');
};