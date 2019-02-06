import { loadCultureFiles } from '../common/culture-loader';
/**
 * RichTextEditor Markdown Preview Sample
 */
import { RichTextEditor, Link, Image, MarkdownEditor, Toolbar, QuickToolbar, Table } from '@syncfusion/ej2-richtexteditor';
import { createElement, KeyboardEventArgs, isNullOrUndefined, addClass, removeClass, Browser } from '@syncfusion/ej2-base';
import * as Marked from 'marked';

RichTextEditor.Inject(Link, Image, MarkdownEditor, Toolbar, QuickToolbar, Table);

let textArea: HTMLTextAreaElement;
let mdsource: HTMLElement;
let mdSplit: HTMLElement;
let htmlPreview: any;
/* tslint:disable */
(window as any).default = (): void => {
    loadCultureFiles();
    let defaultRTE: RichTextEditor = new RichTextEditor({
        height: '300px', editorMode: 'Markdown', actionBegin: handleFullScreen,
        toolbarSettings: {
            items: ['Bold', 'Italic', 'StrikeThrough', '|', 'Formats', 'OrderedList', 'UnorderedList', '|', 'CreateLink', 'Image', 'CreateTable', '|',
                { tooltipText: 'Preview', template: '<button id="preview-code" class="e-tbar-btn e-control e-btn e-icon-btn">' +
                    '<span class="e-btn-icon e-md-preview e-icons"></span></button>' },
                { tooltipText: 'Split Editor', template: '<button id="MD_Preview" class="e-tbar-btn e-control e-btn e-icon-btn">' +
                    '<span class="e-btn-icon e-view-side e-icons"></span></button>' }, 'FullScreen', '|', 'Undo', 'Redo']
        },
        created: () => {
            textArea = defaultRTE.contentModule.getEditPanel() as HTMLTextAreaElement;
            textArea.addEventListener('keyup', (e: KeyboardEventArgs) => { markDownConversion(); });
            let rteObj: RichTextEditor = defaultRTE;
            mdsource = document.getElementById('preview-code');
            mdsource.addEventListener('click', (e: MouseEvent) => {
                fullPreview({ mode: true, type: 'preview' });
                if ((e.currentTarget as HTMLElement).classList.contains('e-active')) {
                    defaultRTE.disableToolbarItem(['Bold', 'Italic', 'StrikeThrough', '|',
                        'Formats', 'OrderedList', 'UnorderedList', '|',
                        'CreateLink', 'Image', 'CreateTable', 'Undo', 'Redo']);
                    (e.currentTarget as HTMLElement).parentElement.nextElementSibling.classList.add('e-overlay');
                } else {
                    defaultRTE.enableToolbarItem(['Bold', 'Italic', 'StrikeThrough', '|',
                        'Formats', 'OrderedList', 'UnorderedList', '|',
                        'CreateLink', 'Image', 'CreateTable', 'Undo', 'Redo']);
                    (e.currentTarget as HTMLElement).parentElement.nextElementSibling.classList.remove('e-overlay');
                }
            });
            mdSplit = document.getElementById('MD_Preview');
            mdSplit.addEventListener('click', (e: MouseEvent) => {
                if (defaultRTE.element.classList.contains('e-rte-full-screen')) { fullPreview({ mode: true, type: '' }); }
                mdsource.classList.remove('e-active');
                if (!defaultRTE.element.classList.contains('e-rte-full-screen')) {
                    defaultRTE.showFullScreen();
                }
            });
        },
        actionComplete: (e: any) => {
            if (e.targetItem === 'Maximize' && isNullOrUndefined(e.args)) {
                fullPreview({ mode: true, type: '' });
            } else if (!mdSplit.parentElement.classList.contains('e-overlay')) {
                if (e.targetItem === 'Minimize') {
                    textArea.style.display = 'block';
                    textArea.style.width = '100%';
                    if (htmlPreview) { htmlPreview.style.display = 'none'; }
                    mdSplit.classList.remove('e-active');
                    mdsource.classList.remove('e-active');
                }
                markDownConversion();
            }
            setTimeout(() => { defaultRTE.toolbarModule.refreshToolbarOverflow(); }, 400);
        }
    });
    function markDownConversion(): void {
        if (mdSplit.classList.contains('e-active')) {
            let id: string = defaultRTE.getID() + 'html-preview';
            let htmlPreview: any = defaultRTE.element.querySelector('#' + id);
            htmlPreview.innerHTML = Marked((defaultRTE.contentModule.getEditPanel() as HTMLTextAreaElement).value);
        }
    }
    function fullPreview(e: { [key: string]: string | boolean }): void {
        let id: string = defaultRTE.getID() + 'html-preview';
        htmlPreview = defaultRTE.element.querySelector('#' + id);
        if ((mdsource.classList.contains('e-active') || mdSplit.classList.contains('e-active')) && e.mode) {
            mdsource.classList.remove('e-active');
            mdSplit.classList.remove('e-active');
            mdsource.parentElement.title = 'Preview';
            textArea.style.display = 'block';
            textArea.style.width = '100%';
            htmlPreview.style.display = 'none';
        } else {
            mdsource.classList.add('e-active');
            mdSplit.classList.add('e-active');
            if (!htmlPreview) {
                htmlPreview = createElement('div', { className: 'e-content' });
                htmlPreview.id = id;
                textArea.parentNode.appendChild(htmlPreview);
            }
            if (e.type === 'preview') {
                textArea.style.display = 'none'; htmlPreview.classList.add('e-pre-source');
            } else {
                htmlPreview.classList.remove('e-pre-source');
                textArea.style.width = '50%';
            }
            htmlPreview.style.display = 'block';
            htmlPreview.innerHTML = Marked((defaultRTE.contentModule.getEditPanel() as HTMLTextAreaElement).value);
            mdsource.parentElement.title = 'Code View';
        }
    }
    defaultRTE.appendTo('#defaultRTE');
    function handleFullScreen(e: any): void {
        let leftBar: any;
        let transformElement: any;
        if (Browser.isDevice) {
            leftBar = document.querySelector('#right-sidebar');
            transformElement = document.querySelector('.sample-browser.e-view.e-content-animation');
        } else {
            leftBar = document.querySelector('#left-sidebar');
            transformElement = document.querySelector('#right-pane');
        }
        if (e.targetItem === 'Maximize') {
            addClass([leftBar], ['e-close']); removeClass([leftBar], ['e-open']);
            if (!Browser.isDevice) { transformElement.style.marginLeft = '0px'; }
            transformElement.style.transform = 'inherit';
        } else if (e.targetItem === 'Minimize') {
            removeClass([leftBar], ['e-close']);
            if (!Browser.isDevice) { 
            addClass([leftBar], ['e-open']);
            transformElement.style.marginLeft = leftBar.offsetWidth + 'px'; }
            transformElement.style.transform = 'translateX(0px)';
        }
    }
};
/* tslint:enable */