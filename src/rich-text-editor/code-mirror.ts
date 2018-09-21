/**
 * RichTextEditor code-mirror sample
 */
import { RichTextEditor, Toolbar, Link, Image, HtmlEditor, QuickToolbar } from '@syncfusion/ej2-richtexteditor';
import { createElement, MouseEventArgs } from '@syncfusion/ej2-base';
import * as CodeMirror from 'codemirror';

import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/css/css.js';
import 'codemirror/mode/htmlmixed/htmlmixed.js';

RichTextEditor.Inject(Toolbar, Link, Image, HtmlEditor, QuickToolbar);

let defaultRTE: RichTextEditor;
let divPreview: HTMLElement;
this.default = (): void => {
    defaultRTE = new RichTextEditor({
        toolbarSettings: {
            items: [{
                template: '<button id="DIV_Preview" class="e-tbar-btn e-control e-btn e-icon-btn">' +
                '<span class="e-btn-icon e-code-mirror e-icons"></span></button>'
            }, 'Bold', 'Italic', 'Underline',
                'Alignments', 'OrderedList', 'UnorderedList',
                'CreateLink', 'Image', '|', 'Undo', 'Redo']
        },
        created: onCreated
    });
    defaultRTE.appendTo('#defaultRTE');
    function onCreated(): void {
        defaultRTE.disableToolbarItem(['Bold', 'Italic', 'Underline',
            'Alignments', 'OrderedList', 'UnorderedList',
            'CreateLink', 'Image', '|', 'Undo', 'Redo']);
        setTimeout(() => { mirrorConversion(); }, 100);
    }

    divPreview = document.getElementById('DIV_Preview');
    let textArea: HTMLElement = defaultRTE.contentModule.getEditPanel() as HTMLElement;
    let myCodeMirror: any;
    divPreview.addEventListener('click', (e: MouseEventArgs) => {
        mirrorConversion();
        if ((e.target as HTMLElement).parentElement.classList.contains('e-active')) {
            defaultRTE.disableToolbarItem(['Bold', 'Italic', 'Underline',
                'Alignments', 'OrderedList', 'UnorderedList',
                'CreateLink', 'Image', '|', 'Undo', 'Redo']);
        } else {
            defaultRTE.enableToolbarItem(['Bold', 'Italic', 'Underline',
                'Alignments', 'OrderedList', 'UnorderedList',
                'CreateLink', 'Image', '|', 'Undo', 'Redo']);
        }
    });
    function mirrorConversion(): void {
        let id: string = defaultRTE.getID() + 'mirror-view';
        let mirrorView: HTMLElement = defaultRTE.element.querySelector('#' + id);
        let iconEle: HTMLElement = divPreview.querySelector('span');
        if (divPreview.classList.contains('e-active')) {
            divPreview.classList.remove('e-active');
            iconEle.classList.add('e-html-preview');
            iconEle.classList.remove('e-code-mirror');
            textArea.style.display = 'block';
            mirrorView.style.display = 'none';
            textArea.innerHTML = myCodeMirror.getValue();
        } else {
            divPreview.classList.add('e-active');
            iconEle.classList.remove('e-html-preview');
            iconEle.classList.add('e-code-mirror');
            if (!mirrorView) {
                mirrorView = createElement('div', { className: 'e-content' });
                mirrorView.id = id;
                textArea.parentNode.appendChild(mirrorView);
            } else {
                mirrorView.innerHTML = '';
            }
            textArea.style.display = 'none';
            mirrorView.style.display = 'block';
            renderCodeMirror(mirrorView, defaultRTE.value);
        }
    }

    function renderCodeMirror(mirrorView: HTMLElement, content: string): void {
        myCodeMirror = CodeMirror(mirrorView, {
            value: content,
            lineNumbers: true,
            mode: 'text/html',
            lineWrapping: true,

        });
    }
};


