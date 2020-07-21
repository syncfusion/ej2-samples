import { loadCultureFiles } from '../common/culture-loader';
/**
 * DropDownTree Default Sample
 */
import { DropDownTree } from '@syncfusion/ej2-dropdowns';
import * as dataSource from './dataSource.json';

(window as any).default = (): void => {
    loadCultureFiles();
    // Initialize  the Dropdown Tree control
    let treeObj: DropDownTree = new DropDownTree({
        fields: {
            dataSource: (dataSource as any).defaultData, value: 'id',
            text: 'name', child: 'subChild', expanded: 'expanded'
        },
        popupHeight: '200px',
        placeholder: 'Select a folder or file',
        changeOnBlur: false,
        change: () => { valueChange(); }
    });
    treeObj.appendTo('#default');
    valueChange();

    function valueChange(): void {
        let value: Element = document.getElementById('value');
        let text: Element = document.getElementById('text');
        value.innerHTML = treeObj.value && treeObj.value.length > 0 ? treeObj.value[0] : '';
        text.innerHTML = treeObj.text;
    }
};