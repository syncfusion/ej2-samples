import { loadCultureFiles } from '../common/culture-loader';
/**
 * Rich Text Editor Ajax content sample
 */
import { RichTextEditor, Toolbar, Link, Image, HtmlEditor, QuickToolbar, PasteCleanup, Table, Video, Audio } from '@syncfusion/ej2-richtexteditor';
import { Fetch} from '@syncfusion/ej2-base';
RichTextEditor.Inject(Toolbar, Link, Image, HtmlEditor, QuickToolbar, PasteCleanup, Table, Video, Audio);

let defaultRTE : RichTextEditor;
(window as any).default = (): void => {
    loadCultureFiles();
    let fetch: Fetch = new Fetch('./src/rich-text-editor/ajax-content.html', 'GET');
    fetch.send().then((data: any): void => {
        defaultRTE = new RichTextEditor({ value: data});
        defaultRTE.appendTo('#defaultRTE');
    });
};
