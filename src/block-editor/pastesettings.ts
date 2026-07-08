import { loadCultureFiles } from '../common/culture-loader';
import { isNullOrUndefined } from '@syncfusion/ej2-base';
import { BlockEditor } from "@syncfusion/ej2-blockeditor"
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import * as data from './blockData.json';

(window as any).default = (): void => {
  loadCultureFiles();

  const blocksFromJson = (data as any)["blockDataPaste"];
  let overviewBlockEditor: BlockEditor = new BlockEditor({
    blocks: blocksFromJson,
    height: "600px",
    pasteCleanupSettings: {
      deniedTags: ['script', 'iframe']
    }
  });
  overviewBlockEditor.appendTo('#block-editor');

  let formatOption: DropDownList = new DropDownList({
    index: 0,
    popupHeight: "200px",
    change: () => { valueChange(); }
  });

  formatOption.appendTo("#formattingOption");
  // Toggle paste behavior based on dropdown selection
  function valueChange() {
    if (formatOption.value === "plainText") {
      overviewBlockEditor.pasteCleanupSettings.plainText = true;
      overviewBlockEditor.pasteCleanupSettings.keepFormat = false;
    }
    else {
      overviewBlockEditor.pasteCleanupSettings.plainText = false;
      overviewBlockEditor.pasteCleanupSettings.keepFormat = true;
    }
    overviewBlockEditor.dataBind();
  }
  
  var deniedTagsElem = document.getElementById('deniedTags');

  deniedTagsElem.addEventListener('blur', (e: FocusEvent) => {
    onPasteCleanupSettingsChange((e.target as HTMLInputElement).value);
    overviewBlockEditor.dataBind();
  });

  // Update the specified paste settings property with parsed array value and rebind the editor
  function onPasteCleanupSettingsChange(value: string): void {
    if (!isNullOrUndefined(value)) {
      const arrayValue = value.split(',').map((item) => item.trim().replace(/^['"]|['"]$/g, '')).filter((prop) => prop !== '');
          overviewBlockEditor.pasteCleanupSettings.deniedTags = arrayValue;
      overviewBlockEditor.dataBind();
    }
  }
};
