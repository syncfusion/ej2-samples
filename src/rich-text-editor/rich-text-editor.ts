import { loadCultureFiles } from '../common/culture-loader';
/**
 * Rich Text Editor default sample
 */
import { RichTextEditor, Toolbar, Link, Image, HtmlEditor, QuickToolbar, Table, Video, Audio, PasteCleanup } from '@syncfusion/ej2-richtexteditor';
RichTextEditor.Inject(Toolbar, Link, Image, HtmlEditor, QuickToolbar, Table, Video, Audio, PasteCleanup);

(window as any).default = (): void => {
    loadCultureFiles();

    let defaultRTE: RichTextEditor = new RichTextEditor({ });
    defaultRTE.appendTo('#defaultRTE');
};
