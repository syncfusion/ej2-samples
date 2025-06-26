import { loadCultureFiles } from '../common/culture-loader';
/**
 * Rich Text Editor Quick format toolbar sample
 */
import { RichTextEditor, Toolbar, Link, Image, ToolbarType, HtmlEditor, QuickToolbar, FormatPainter, PasteCleanup, Table, Video, Audio } from '@syncfusion/ej2-richtexteditor';
RichTextEditor.Inject(Toolbar, Link, Image, HtmlEditor, QuickToolbar, FormatPainter, PasteCleanup, Table, Video, Audio);

(window as any).default = (): void => {
    loadCultureFiles();
    let defaultRTE: RichTextEditor = new RichTextEditor({
        quickToolbarSettings: {
            text: ['Formats', '|', 'Bold', 'Italic', 'Fontcolor', 'BackgroundColor', '|', 'CreateLink', 'Image', 'CreateTable', 'Blockquote', '|' , 'Unorderedlist', 'Orderedlist', 'Indent', 'Outdent'],
        },
        toolbarSettings: {
            type: ToolbarType.MultiRow,
            enableFloating: false,
        },
    });
    defaultRTE.appendTo("#quickRTE");
};
 
