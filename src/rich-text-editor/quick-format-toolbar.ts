import { loadCultureFiles } from '../common/culture-loader';
/**
 * Rich Text Editor Quick format toolbar sample
 */
import { RichTextEditor, Toolbar, Link, Image, ToolbarType, HtmlEditor, QuickToolbar, FormatPainter } from '@syncfusion/ej2-richtexteditor';
RichTextEditor.Inject(Toolbar, Link, Image, HtmlEditor, QuickToolbar, FormatPainter);

(window as any).default = (): void => {
    loadCultureFiles();
    let defaultRTE: RichTextEditor = new RichTextEditor({
        quickToolbarSettings: {
            text: ['FormatPainter', 'Bold', 'Italic', 'Underline', 'Formats', '-', 'Alignments', 'OrderedList', 'UnorderedList', 'CreateLink', 'Image']
        },
        toolbarSettings: {
            type: ToolbarType.MultiRow,
            enableFloating: false,
        },
    });
    defaultRTE.appendTo("#quickRTE");
};
 