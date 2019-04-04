import { loadCultureFiles } from '../common/culture-loader';
import { TreeView } from '@syncfusion/ej2-navigations';
import * as dataSource from './dataSource.json';
/**
 * TreeView default functionalities sample
 */
(window as any).default = (): void => {
    loadCultureFiles();
    // Render the TreeView by mapping its fields property with data source properties
    let treeObj: TreeView = new TreeView({
        fields: { dataSource: (dataSource as any).defaultData , id: 'id', text: 'name', child: 'subChild' }
    });
    treeObj.appendTo('#tree');
};