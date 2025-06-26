import { loadCultureFiles } from '../common/culture-loader';

import { BlockEditor, FocusEventArgs } from "@syncfusion/ej2-blockeditor"
import { CheckBox, ChangeEventArgs } from '@syncfusion/ej2/buttons';
import { blockDataAPI } from './blockData';

/**
 * Overview sample
 */
(window as any).default = (): void => {
    loadCultureFiles();

    let focusedBlock: string;

    let apiBlockEditor: BlockEditor = new BlockEditor({
        blocks: blockDataAPI,
        focus: (args: FocusEventArgs) => {
            focusedBlock = args.blockId;
        },
    });
    apiBlockEditor.appendTo('#api-blockeditor');

    let readonly: CheckBox = new CheckBox({
        checked: false,
        change: (args: ChangeEventArgs) => {
            apiBlockEditor.readOnly = args.checked;
        }
    });
    readonly.appendTo('#readonly');

    let enableDragDrop: CheckBox = new CheckBox({
        checked: true,
        change: (args: ChangeEventArgs) => {
            apiBlockEditor.enableDragAndDrop = args.checked;
        }
    });
    enableDragDrop.appendTo('#enableDragDrop');

    document.getElementById('getJson')!.onclick = (): void => {
        let jsonData = apiBlockEditor.getDataAsJson(focusedBlock);
        alert(JSON.stringify(jsonData, null, 2));
    };

    document.getElementById('getHtml')!.onclick = (): void => {
        const htmlData: string = apiBlockEditor.getDataAsHtml();
        alert(htmlData);
    };

    document.getElementById('getBlockCount')!.onclick = (): void => {
        alert('Total blocks: ' + apiBlockEditor.getBlockCount());
    };

    document.getElementById('selectall')!.onclick = (): void => {
        apiBlockEditor.selectAllBlocks();
    };

    document.getElementById('print')!.onclick = function () {
        apiBlockEditor.print();
    };

    document.getElementById('focusIn')!.onclick = (): void => {
        apiBlockEditor.focusIn();
    };

    document.getElementById('focusOut')!.onclick = (): void => {
        apiBlockEditor.focusOut();
    };
};
