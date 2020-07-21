import { loadCultureFiles } from '../common/culture-loader';
import { DropDownTree } from '@syncfusion/ej2-dropdowns';
import * as dataSource from './dataSource.json';
/**
 * Dropdown Tree icons and images sample
 */
(window as any).default = (): void => {
    loadCultureFiles();
    let ddtreeObj: DropDownTree = new DropDownTree({
        fields: {
            dataSource: (dataSource as any).iconData, value: 'nodeId', text: 'nodeText', child: 'nodeChild', iconCss: 'icon',
            imageUrl: 'image'
        },
        popupHeight: '200px',
        placeholder: 'Select a folder or file',
        cssClass: 'dropdowntree-icon',
    });
    ddtreeObj.appendTo('#icons');
};