import { loadCultureFiles } from '../common/culture-loader';
/**
 * Rich Text Editor form validation sample
 */
import { RichTextEditor, Toolbar, Link, Image, HtmlEditor, Count, QuickToolbar } from '@syncfusion/ej2-richtexteditor';
import { FormValidator } from '@syncfusion/ej2-inputs';
RichTextEditor.Inject(Toolbar, Link, Image, HtmlEditor, Count, QuickToolbar);

(window as any).default = (): void => {
    loadCultureFiles();

    let defaultRTE: RichTextEditor = new RichTextEditor({ showCharCount: true, maxLength: 100, placeholder: 'Type something' });
    defaultRTE.appendTo('#defaultRTE');

    new FormValidator('#form-element');
    (document.querySelector('.form-vertical') as HTMLElement).addEventListener('submit', function (e) {
        if(((document.querySelector('.e-rte-content .e-content') as HTMLElement).textContent as string).trim() === '' ) {
            e.preventDefault();
        }
    });
};

