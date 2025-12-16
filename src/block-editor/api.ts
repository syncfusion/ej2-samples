import { loadCultureFiles } from '../common/culture-loader';
import { BlockEditor, FocusEventArgs } from '@syncfusion/ej2-blockeditor';
import { CheckBox, ChangeEventArgs } from '@syncfusion/ej2/buttons';
import { DialogUtility } from '@syncfusion/ej2-popups';
import * as data from './blockData.json';

/**
 * Overview sample
 */
(window as any).default = (): void => {
    loadCultureFiles();

    let id: string;
  const blocksFromJson = (data as any)["blockDataAPI"];
    let apiBlockEditor: BlockEditor = new BlockEditor({
        blocks: blocksFromJson,
        height: "600px",
        focus: (args: FocusEventArgs) => {
            id = args.blockId;
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

  // Helper: escape HTML to display raw content safely inside dialog
  let escapeHtml = (html: string): string =>
    html
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');

  // Reusable predefined dialog helper (single place to show alerts)
  let openDialog = (title: string, content: string, isHtml?: boolean): void => {
    let updatedContent = isHtml ? escapeHtml(content) : content;
    let dlg = DialogUtility.alert({
      title,
      content: `<pre style="white-space: pre-wrap;">${updatedContent}</pre>`,
      okButton: { text: 'OK', click: () => dlg.close() },
      isModal: true,
      position: { X: 'center', Y: 'center' },
      height: "400px",
      width: "500px",
      closeOnEscape: true
    });
  };

  // Get JSON data (entire editor) and show via predefined dialog
  document.getElementById('getJson')!.onclick = (): void => {
    let jsonData = apiBlockEditor.getDataAsJson();
    openDialog('JSON Data',JSON.stringify(jsonData, null, 2));
  };

  // Get HTML data and show via predefined dialog (render as plain text)
  document.getElementById('getHtml')!.onclick = (): void => {
    let htmlData: string = apiBlockEditor.getDataAsHtml();
    openDialog('Editor HTML', htmlData, true);
  };

  // Get block count and show via predefined dialog
  document.getElementById('getBlockCount')!.onclick = (): void => {
    let dialog = DialogUtility.alert({
        title:"Block Count",
      content: `<div>Total blocks: <b>${apiBlockEditor.getBlockCount()}</b></div>`,
      okButton: { text: 'OK', click: () => dialog.close() },
      isModal: true,
      position: { X: 'center', Y: 'center' },
      width: "250px",
      closeOnEscape: true
    });
  };

  document.getElementById('selectall')!.onclick = (): void => {
    apiBlockEditor.selectAllBlocks();
  };

    document.getElementById('print')!.onclick = function () {
        apiBlockEditor.print();
    };

};
