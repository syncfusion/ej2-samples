import { loadCultureFiles } from '../common/culture-loader';
/**
 * RichTextEditor Paste Cleanup sample
 */
import { RichTextEditor, Toolbar, Link, Image, Count, HtmlEditor, QuickToolbar, PasteCleanup, Table } from '@syncfusion/ej2-richtexteditor';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
RichTextEditor.Inject(Toolbar, Link, Image, Count, HtmlEditor, QuickToolbar, Table, PasteCleanup);

(window as any).default = (): void => {
    loadCultureFiles();
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
        defaultRTE.pasteCleanupSettings.allowedStyleProps = (eval)('[' + (e.target as HTMLInputElement).value + ']' );
        defaultRTE.dataBind();
    });
    deniedAttrsElem.addEventListener('blur', (e: FocusEvent) => {
        defaultRTE.pasteCleanupSettings.deniedAttrs = (eval)('[' + (e.target as HTMLInputElement).value + ']' );
        defaultRTE.dataBind();
    });
    deniedTagsElem.addEventListener('blur', (e: FocusEvent) => {
        defaultRTE.pasteCleanupSettings.deniedTags = (eval)('[' + (e.target as HTMLInputElement).value + ']' );
        defaultRTE.dataBind();
    });
};