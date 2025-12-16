/**
 * Rich Text Editor default sample
 */
import { RichTextEditor, Toolbar, Link, Image, HtmlEditor, QuickToolbar, Table, Video, Audio, PasteCleanup, ClipBoardCleanup, AutoFormat } from '@syncfusion/ej2-richtexteditor';
RichTextEditor.Inject(Toolbar, Link, Image, HtmlEditor, QuickToolbar, Table, Video, Audio, PasteCleanup, ClipBoardCleanup, AutoFormat);

(window as any).default = (): void => {

    let defaultRTE: RichTextEditor = new RichTextEditor({ });
    defaultRTE.appendTo('#defaultRTE');
};
