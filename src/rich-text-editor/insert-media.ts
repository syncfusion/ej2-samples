import { loadCultureFiles } from '../common/culture-loader';
/**
 * Rich Text Editor Insert Media sample
 */
import { RichTextEditor, Toolbar, Link, Image, HtmlEditor, QuickToolbar, Audio , Video, PasteCleanup, Table } from '@syncfusion/ej2-richtexteditor';
RichTextEditor.Inject(Toolbar, Link, Image, HtmlEditor, QuickToolbar, Audio , Video, PasteCleanup, Table);

(window as any).default = (): void => {
    loadCultureFiles();
    const hostUrl: string = 'https://services.syncfusion.com/js/production/';
    let iframeRTE: RichTextEditor = new RichTextEditor({
        toolbarSettings: {
            items: ['Bold', 'Italic', 'Underline', '|', 'Formats', 'Alignments', 'Blockquote', 'OrderedList', 'UnorderedList', '|', 'CreateLink', 'Image', 'Audio', 'Video', '|', 'SourceCode', 'Undo', 'Redo']
        },
        insertVideoSettings: {             
            saveUrl: hostUrl + 'api/RichTextEditor/SaveFile',             
            removeUrl: hostUrl + 'api/RichTextEditor/DeleteFile',             
            path: hostUrl + 'RichTextEditor/'       
        },
        insertAudioSettings: {             
            saveUrl: hostUrl + 'api/RichTextEditor/SaveFile',             
            removeUrl: hostUrl + 'api/RichTextEditor/DeleteFile',             
            path: hostUrl + 'RichTextEditor/'       
        }
    });
    iframeRTE.appendTo('#insertMedia');
};

