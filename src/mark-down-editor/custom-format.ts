import { loadCultureFiles } from '../common/culture-loader';
/**
 * Rich Text Editor Markdown Sample
 */
import { RichTextEditor, Toolbar, Link, Image, MarkdownFormatter, MarkdownEditor} from '@syncfusion/ej2-richtexteditor';
import { createElement, KeyboardEventArgs } from '@syncfusion/ej2-base';
RichTextEditor.Inject(Toolbar, Link, Image, MarkdownEditor);
import * as Marked from 'marked';
import { Tooltip } from '@syncfusion/ej2-popups';


let textArea: HTMLTextAreaElement;
let mdPreview: HTMLElement;
let mdsource: HTMLElement;
let tooltipObj: Tooltip;


(window as any).default = (): void => {
    loadCultureFiles();

    let defaultRTE: RichTextEditor = new RichTextEditor({
        height: '260px',
        placeholder : "Enter your text here...",
        toolbarSettings: {
            items: ['Bold', 'Italic', 'StrikeThrough', '|',
                'Formats', 'Blockquote', 'OrderedList', 'UnorderedList', '|',
                'CreateLink', 'Image', '|',
                {
                    template:
                      '<button id="preview-code" class="e-tbar-btn e-control e-btn e-icon-btn" aria-label="Preview Code">' +
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
            tooltipObj = new Tooltip({
                content: "Preview",  
                target: "#preview-code"  
              });
            tooltipObj.appendTo("#preview-code");
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
            defaultRTE.enableToolbarItem(defaultRTE.toolbarSettings.items as string[]);
            textArea.style.display = 'block';
            htmlPreview.style.display = 'none';
            tooltipObj.content = "Preview";
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
            tooltipObj.content = "Codeview";
            htmlPreview.innerHTML = Marked.marked((defaultRTE.contentModule.getEditPanel() as HTMLTextAreaElement).value);
        }
    }
};
