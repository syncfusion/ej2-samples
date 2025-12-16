/**
 * Rich Text Editor Paste Cleanup sample
 */
import { RichTextEditor, Toolbar, Link, Image, HtmlEditor, QuickToolbar, PasteCleanup, Table, Video, Audio, ClipBoardCleanup, AutoFormat } from '@syncfusion/ej2-richtexteditor';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { isNullOrUndefined } from '@syncfusion/ej2-base';
RichTextEditor.Inject(Toolbar, Link, Image, HtmlEditor, QuickToolbar, Table, PasteCleanup, Video, Audio, ClipBoardCleanup, AutoFormat);

(window as any).default = (): void => {
    let defaultRTE: RichTextEditor = new RichTextEditor({
        pasteCleanupSettings: {
            prompt: true,
            plainText: false,
            keepFormat: false
        }
    });
    defaultRTE.appendTo('#defaultRTE');

    let formatOption: DropDownList = new DropDownList({
        index: 0,
        popupHeight: '200px',
        change: () => { valueChange(); }
    });
    formatOption.appendTo('#formattingOption');

    function valueChange(): void {
        if (formatOption.value === 'prompt') {
            defaultRTE.pasteCleanupSettings.prompt = true;
        } else if (formatOption.value === 'plainText') {
            defaultRTE.pasteCleanupSettings.prompt = false;
            defaultRTE.pasteCleanupSettings.plainText = true;
        } else if (formatOption.value === 'keepFormat') {
            defaultRTE.pasteCleanupSettings.prompt = false;
            defaultRTE.pasteCleanupSettings.plainText = false;
            defaultRTE.pasteCleanupSettings.keepFormat = true;
        } else if (formatOption.value === 'cleanFormat') {
            defaultRTE.pasteCleanupSettings.prompt = false;
            defaultRTE.pasteCleanupSettings.plainText = false;
            defaultRTE.pasteCleanupSettings.keepFormat = false;
        }
    }
    let allowedStylePropsElem: HTMLElement = document.getElementById('allowedStyleProperties');
    let deniedTagsElem: HTMLElement = document.getElementById('deniedTags');
    let deniedAttrsElem: HTMLElement = document.getElementById('deniedAttributes');
    allowedStylePropsElem.addEventListener('blur', (e: FocusEvent) => {
        onPasteCleanupSettingsChange((e.target as HTMLInputElement).value, 'allowedStyleProps');
        defaultRTE.dataBind();
    });
    deniedAttrsElem.addEventListener('blur', (e: FocusEvent) => {
        onPasteCleanupSettingsChange((e.target as HTMLInputElement).value, 'deniedAttrs');
        defaultRTE.dataBind();
    });
    deniedTagsElem.addEventListener('blur', (e: FocusEvent) => {
        onPasteCleanupSettingsChange((e.target as HTMLInputElement).value, 'deniedTags');
        defaultRTE.dataBind();
    });

    function onPasteCleanupSettingsChange(value: string, settingsProperty: string): void {
        if (!isNullOrUndefined(value)) {
            const arrayValue = value.split(',').map((item) => item.trim().replace(/^['"]|['"]$/g, ''));
            defaultRTE.pasteCleanupSettings[settingsProperty] = arrayValue.filter((prop) => prop !== '');
        }
    }
};