import { loadCultureFiles } from '../common/culture-loader';
/**
 * Rich Text Editor Markdown Overview Sample
 */
import { RichTextEditor, Toolbar, Link, Image, MarkdownEditor, Table } from '@syncfusion/ej2-richtexteditor';
import { MarkdownFormatter } from '@syncfusion/ej2-richtexteditor';
import { createElement, KeyboardEventArgs } from '@syncfusion/ej2-base';
import { MarkdownConverter } from '@syncfusion/ej2-markdown-converter';

RichTextEditor.Inject(Toolbar, Link, Image, MarkdownEditor, Table);

let textArea: HTMLTextAreaElement;
let mdsource: HTMLElement;

(window as any).default = (): void => {
    loadCultureFiles();

    let defaultRTE: RichTextEditor = new RichTextEditor({
        height: '520px',
        placeholder : "Enter your text here...",
        formatter: new MarkdownFormatter({ listTags: { 'OL': '1., 2., 3.'} }),
        toolbarSettings: {
            items: ['Bold', 'Italic', 'StrikeThrough', '|', 'Formats', 'Blockquote', 'OrderedList',
            'UnorderedList', 'SuperScript', 'SubScript', '|', 'CreateLink', 'Image', 'CreateTable', '|',
           { tooltipText: 'Preview', template: '<button id="preview-code" class="e-tbar-btn e-control e-btn e-icon-btn" aria-label="Preview Code">' +
               '<span class="e-btn-icon e-md-preview e-icons"></span></button>' }, '|', 'Undo', 'Redo']

        },
        editorMode: 'Markdown',
        created: () => {
            textArea = defaultRTE.contentModule.getEditPanel() as HTMLTextAreaElement;
            textArea.addEventListener('keyup', (e: KeyboardEventArgs) => {
                markDownConversion();
            });
            mdsource = document.getElementById('preview-code');
            mdsource.addEventListener('click', (e: MouseEvent) => {
                fullPreview();
                if ((e.currentTarget as HTMLElement).classList.contains('e-active')) {
                    defaultRTE.disableToolbarItem(['Bold', 'Italic', 'StrikeThrough', 'OrderedList',
                        'UnorderedList', 'SuperScript', 'SubScript', 'CreateLink', 'Image', 'CreateTable', 'Formats', 'Blockquote', 'Undo', 'Redo']);
                } else {
                    defaultRTE.enableToolbarItem(['Bold', 'Italic', 'StrikeThrough', 'OrderedList',
                        'UnorderedList', 'SuperScript', 'SubScript', 'CreateLink', 'Image', 'CreateTable', 'Formats', 'Blockquote', 'Undo', 'Redo']);
                }
            });
        }
    });
    function markDownConversion(): void {
        if (mdsource.classList.contains('e-active')) {
            let id: string = defaultRTE.getID() + 'html-view';
            let htmlPreview: HTMLElement = defaultRTE.element.querySelector('#' + id);
            htmlPreview.innerHTML = MarkdownConverter.toHtml((defaultRTE.contentModule.getEditPanel() as HTMLTextAreaElement).value) as string;
        }
    }
    function fullPreview(): void {
        let id: string = defaultRTE.getID() + 'html-preview';
        let htmlPreview: HTMLElement = defaultRTE.element.querySelector('#' + id);
        let previewTextArea: HTMLElement = defaultRTE.element.querySelector('.e-rte-content') as HTMLElement;
        if (mdsource.classList.contains('e-active')) {
            mdsource.classList.remove('e-active');
            mdsource.parentElement.title = 'Preview';
            textArea.style.display = 'block';
            htmlPreview.style.display = 'none';
            previewTextArea.style.overflow = 'hidden';
        } else {
            mdsource.classList.add('e-active');
            if (!htmlPreview) {
                htmlPreview = createElement('div', { className: 'e-content e-pre-source' });
                htmlPreview.id = id;
                textArea.parentNode.appendChild(htmlPreview);
                previewTextArea.style.overflow = 'auto';
            }
            if (previewTextArea.style.overflow === 'hidden') {
                previewTextArea.style.overflow = 'auto';
            }
            textArea.style.display = 'none';
            htmlPreview.style.display = 'block';
            htmlPreview.innerHTML = MarkdownConverter.toHtml((defaultRTE.contentModule.getEditPanel() as HTMLTextAreaElement).value) as string;
            mdsource.parentElement.title = 'Code View';
        }
    }
    defaultRTE.appendTo('#defaultRTE');
};