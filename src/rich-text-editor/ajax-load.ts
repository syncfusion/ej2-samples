import { loadCultureFiles } from '../common/culture-loader';
/**
 * Rich Text Editor Ajax content sample
 */
import { RichTextEditor, Toolbar, Link, Image, HtmlEditor, QuickToolbar } from '@syncfusion/ej2-richtexteditor';
import { Ajax } from '@syncfusion/ej2-base';
RichTextEditor.Inject(Toolbar, Link, Image, HtmlEditor, QuickToolbar);

let defaultRTE : RichTextEditor;
(window as any).default = (): void => {
    loadCultureFiles();
    let ajax: Ajax = new Ajax('./src/rich-text-editor/ajax-content.html', 'GET', false);
    ajax.send().then((data: any): void => {
        defaultRTE = new RichTextEditor({ value: data});
        defaultRTE.appendTo('#defaultRTE');
    });
};
