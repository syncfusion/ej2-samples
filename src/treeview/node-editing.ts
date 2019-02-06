import { loadCultureFiles } from '../common/culture-loader';
import { TreeView } from '@syncfusion/ej2-navigations';
import * as dataSource from './dataSource.json';
/**
 * TreeView node editing sample
 */
(window as any).default = (): void => {
    loadCultureFiles();
    // Render the TreeView with editing option
    let treeObj: TreeView = new TreeView({
        fields: { dataSource: (dataSource as any).nodeData, id: 'id', text: 'name', child: 'child' },
        allowEditing: true,
    });
    treeObj.appendTo('#tree');
};