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
            text: ['Bold', 'Italic', 'Underline', 'FontColor', 'BackgroundColor', 'Alignments', '-', 'FontSize', 'FontName', 'Formats', 'OrderedList', 'UnorderedList', 'FormatPainter']
        },
        toolbarSettings: {
            type: ToolbarType.MultiRow,
            enableFloating: false,
        },
    });
    defaultRTE.appendTo("#quickRTE");
};
 