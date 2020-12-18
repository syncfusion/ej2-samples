import { loadCultureFiles } from '../common/culture-loader';
/**
 * Rich Text Editor Resizable sample 
 */
import { RichTextEditor, Toolbar, Link, Image, HtmlEditor, QuickToolbar, Resize } from '@syncfusion/ej2-richtexteditor';
RichTextEditor.Inject(Toolbar, Link, Image, HtmlEditor, QuickToolbar, Resize);

(window as any).default = (): void => {
    loadCultureFiles();

    let defaultRTE: RichTextEditor = new RichTextEditor({
        enableResize: true,
        height: 250
    });
    defaultRTE.appendTo('#defaultRTE');
};