import { loadCultureFiles } from '../common/culture-loader';
/**
 * Rich Text Editor Insert Media sample
 */
import { RichTextEditor, Toolbar, Link, Image, HtmlEditor, QuickToolbar, Audio , Video, PasteCleanup, Table } from '@syncfusion/ej2-richtexteditor';
RichTextEditor.Inject(Toolbar, Link, Image, HtmlEditor, QuickToolbar, Audio , Video, PasteCleanup, Table);

(window as any).default = (): void => {
    loadCultureFiles();
    let iframeRTE: RichTextEditor = new RichTextEditor({
        toolbarSettings: {
            items:   ['Bold', 'Italic', 'Underline', '|', 'Formats', 'Alignments', 'OrderedList', 'UnorderedList', '|', 'CreateLink', 'Image', 'Audio', 'Video', '|', 'SourceCode', 'Undo', 'Redo']
        },
    });
    iframeRTE.appendTo('#insertMedia');
};

