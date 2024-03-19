import { loadCultureFiles } from '../common/culture-loader';
/**
 * Rich Text Editor auto-save sample
 */
import { RichTextEditor, Toolbar, Link, Image, HtmlEditor, QuickToolbar, PasteCleanup, Table, Video, Audio } from '@syncfusion/ej2-richtexteditor';
RichTextEditor.Inject(Toolbar, Link, Image, HtmlEditor, QuickToolbar, PasteCleanup, Table, Video, Audio);
import { Switch } from '@syncfusion/ej2-buttons';
import { isNullOrUndefined } from '@syncfusion/ej2-base';

(window as any).default = (): void => {
    loadCultureFiles();
  let switchObj: Switch;
  let defaultRTE: RichTextEditor = new RichTextEditor({
    toolbarSettings: {
      items: ['Bold', 'Italic', 'Underline', '|', 'Formats', 'Alignments',
        'OrderedList', 'UnorderedList', '|', 'CreateLink', 'Image', '|', 'SourceCode', 'Undo', 'Redo']
    },
    saveInterval: 5000,
    enablePersistence: true,
    created: create,
    placeholder: 'Start to type a content to save',
    change: updateStatus
  });
  defaultRTE.appendTo('#defaultRTE');
  function create(): void {
    switchObj = new Switch({ checked: true, change: onChange });
    switchObj.appendTo('#checked');
  }

  function onChange(e: any): void {
    let savingIcon: HTMLElement = document.getElementById('saving');
    let savedIcon: HTMLElement = document.getElementById('saved');
    if (e.checked) {
      defaultRTE.saveInterval = 5000;
    } else {
      defaultRTE.saveInterval = 0;
      setTimeout(() => { savedIcon.style.display = 'none'; savingIcon.style.display = 'none'; }, 500);
    }
  }

  function updateStatus(): void {
    let savingIcon: HTMLElement = document.getElementById('saving');
    let savedIcon: HTMLElement = document.getElementById('saved');
    savingIcon.style.display = 'block';
    savedIcon.style.display = 'none';
    setTimeout(() => {
      if (!isNullOrUndefined(savingIcon) && !isNullOrUndefined(savedIcon)) {
        savingIcon.style.display = 'none';
        savedIcon.style.display = 'block';
      }
    }, 500);
  }
};