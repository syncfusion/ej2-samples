import { loadCultureFiles } from '../common/culture-loader';
import { TreeView } from '@syncfusion/ej2-navigations';
import * as dataSource from './dataSource.json';
/**
 * TreeView icons and images sample
 */
(window as any).default = (): void => {
    loadCultureFiles();
    // Render the TreeView with image icons
    let treeObj: TreeView = new TreeView({
        fields: { dataSource: (dataSource as any).iconData, id: 'nodeId', text: 'nodeText', child: 'nodeChild', iconCss: 'icon',
                imageUrl: 'image' },
        sortOrder: 'Ascending'
    });
    treeObj.appendTo('#tree');
};