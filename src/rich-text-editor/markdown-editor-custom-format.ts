import { loadCultureFiles } from '../common/culture-loader';
/**
 * Rich Text Editor Markdown Sample
 */
import { RichTextEditor, Toolbar, Link, Image, MarkdownFormatter, MarkdownEditor, QuickToolbar } from '@syncfusion/ej2-richtexteditor';
import { createElement, KeyboardEventArgs } from '@syncfusion/ej2-base';
RichTextEditor.Inject(Toolbar, Link, Image, MarkdownEditor, QuickToolbar);
import * as Marked from 'marked';

let textArea: HTMLTextAreaElement;
let mdPreview: HTMLElement;
let mdsource: HTMLElement;

(window as any).default = (): void => {
    loadCultureFiles();

    let defaultRTE: RichTextEditor = new RichTextEditor({
        height: '260px',
        toolbarSettings: {
            items: ['Bold', 'Italic', 'StrikeThrough', '|',
                'Formats', 'OrderedList', 'UnorderedList', '|',
                'CreateLink', 'Image', '|',
                {
                    tooltipText: 'Preview',
                    template: '<button id="preview-code" class="e-tbar-btn e-control e-btn e-icon-btn">' +
                        '<span class="e-btn-icon e-icons e-md-preview"></span></button>'
                }, 'Undo', 'Redo']
        },
        editorMode: 'Markdown',
        formatter: new MarkdownFormatter({
            listTags: { 'OL': '2. ', 'UL': '+ ' },
            formatTags: {
                'Blockquote': '> '
            },
            selectionTags: {'Bold': '__',  'Italic': '_'}
        }),
        created: () => {
            mdPreview = document.getElementById('MD_Preview');
            textArea = defaultRTE.contentModule.getEditPanel() as HTMLTextAreaElement;
            textArea.addEventListener('keyup', (e: KeyboardEventArgs) => {
                MarkDownConversion();
            });
            mdsource = document.getElementById('preview-code');
            mdsource.addEventListener('click', (e: MouseEvent) => {
                fullPreview();
            });
        }
    });
    defaultRTE.appendTo('#defaultRTE');
    function MarkDownConversion(): void {
        if (mdsource.classList.contains('e-active')) {
            let id: string = defaultRTE.getID() + 'html-view';
            let htmlPreview: HTMLElement = defaultRTE.element.querySelector('#' + id);
            htmlPreview.innerHTML = Marked.marked((defaultRTE.contentModule.getEditPanel() as HTMLTextAreaElement).value);
        }
    }
    function fullPreview(): void {
        let id: string = defaultRTE.getID() + 'html-preview';
        let htmlPreview: HTMLElement = defaultRTE.element.querySelector('#' + id);
        if (mdsource.classList.contains('e-active')) {
            mdsource.classList.remove('e-active');
            mdsource.parentElement.title = 'Preview';
            defaultRTE.enableToolbarItem(defaultRTE.toolbarSettings.items as string[]);
            textArea.style.display = 'block';
            htmlPreview.style.display = 'none';
        } else {
            mdsource.classList.add('e-active');
            defaultRTE.disableToolbarItem(defaultRTE.toolbarSettings.items as string[]);
            if (!htmlPreview) {
                htmlPreview = createElement('div', { className: 'e-content e-pre-source' });
                htmlPreview.id = id;
                textArea.parentNode.appendChild(htmlPreview);
            }
            textArea.style.display = 'none';
            htmlPreview.style.display = 'block';
            htmlPreview.innerHTML = Marked.marked((defaultRTE.contentModule.getEditPanel() as HTMLTextAreaElement).value);
            mdsource.parentElement.title = 'Code View';
        }
    }
};
