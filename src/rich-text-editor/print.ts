import { loadCultureFiles } from '../common/culture-loader';
/**
 * Rich Text Editor print sample
 */
import { RichTextEditor, Toolbar, Link, Image, HtmlEditor, QuickToolbar, PasteCleanup, Table, Video, Audio} from '@syncfusion/ej2-richtexteditor';
RichTextEditor.Inject(Toolbar, Link, Image, HtmlEditor, QuickToolbar, PasteCleanup, Table, Video, Audio);

(window as any).default = (): void => {
    loadCultureFiles();
    let defaultRTE: RichTextEditor = new RichTextEditor({
        toolbarSettings: {
            items: ['Bold',  'Italic',  'Underline',  '|',  'Formats',  'Alignments',
                'OrderedList',  'UnorderedList',  '|',  'CreateLink',  'Image',  '|',  'SourceCode',  'Undo',  'Redo', 'Print']
        }
    });
    defaultRTE.appendTo('#defaultRTE');

};
