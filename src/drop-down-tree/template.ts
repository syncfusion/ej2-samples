import { loadCultureFiles } from '../common/culture-loader';
/**
 * Dropdown Tree template Sample
 */
import { DropDownTree } from '@syncfusion/ej2-dropdowns';
import * as dataSource from './dataSource.json';
(window as any).default = (): void => {
    loadCultureFiles();
    let ddtreeObj: DropDownTree = new DropDownTree({
        fields: { dataSource: (dataSource as any).templateData, text: 'name', value: 'id', parentValue: 'pid', hasChildren: 'hasChild' },
        headerTemplate: '#headerTemplate',
        itemTemplate: '#itemTemplate',
        footerTemplate: '#footerTemplate',
        valueTemplate: '#valueTemplate',
        width: '100%',
        cssClass: 'ddt-template',
        placeholder: 'Select an employee',
        popupHeight: '250px'
    });
    ddtreeObj.appendTo('#ddttemplate');
};