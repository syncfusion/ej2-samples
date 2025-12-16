import { loadCultureFiles } from '../common/culture-loader';
/**
 * Rich Text Editor enter key configuration sample
 */
import { RichTextEditor, Toolbar, Link, Image, HtmlEditor, QuickToolbar, PasteCleanup, Table, Video, Audio, ClipBoardCleanup, AutoFormat } from '@syncfusion/ej2-richtexteditor';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { createElement } from '@syncfusion/ej2-base';
import * as CodeMirror from 'codemirror';

import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/css/css.js';
import 'codemirror/mode/htmlmixed/htmlmixed.js';

RichTextEditor.Inject(Toolbar, Link, Image, HtmlEditor, QuickToolbar, PasteCleanup, Table, Video, Audio, ClipBoardCleanup, AutoFormat);

(window as any).default = (): void => {
    loadCultureFiles();
    let defaultRTE: RichTextEditor = new RichTextEditor({
        value: `<p>In Rich text Editor, the enter key and shift + enter key actions can be customized using the enterKey and shiftEnterKey APIs. And the possible values are as follows:</p><ul><li>P - When 'P' is configured, pressing enter or shift + enter will create a 'p' tag</li><li>DIV - When 'DIV' is configured, pressing enter or shift + enter will create a 'div' tag</li><li>BR - When 'BR' is configured, pressing enter or shift + enter will create a 'br' tag</li></ul>`,
        height: 220,
        saveInterval: 1,
        change: onChange,
        created: onCreate
    });
    defaultRTE.appendTo('#defaultRTE');

    function onCreate() {
        onChange();
    }

    function onChange(): void {
        let id: string = defaultRTE.getID() + 'mirror-view';
        let codeView: HTMLElement = document.getElementById('codeView');
        let mirrorView: HTMLElement;
        if (document.getElementById(id)) {
            mirrorView = document.getElementById(id);
            mirrorView.innerHTML = '';
        } else {
            mirrorView = createElement('div', { className: 'e-content codeViewContent' });
            mirrorView.id = id;
            codeView.appendChild(mirrorView);
        }
        mirrorView.style.display = 'block';
        if (defaultRTE.value !== null) {
            CodeMirror(mirrorView, {
                value: defaultRTE.value,
                mode: 'text/html',
                lineWrapping: true,
                readOnly: true
            });
        }
    }

    let enterListObj: DropDownList = new DropDownList({
        placeholder: 'When pressing the enter key',
        floatLabelType: 'Always',
        change: (args: any) => {
            if (enterListObj.value === 'DIV') {
                defaultRTE.enterKey = 'DIV';
                defaultRTE.value = `<div>In Rich text Editor, the enter key and shift + enter key actions can be customized using the enterKey and shiftEnterKey APIs. And the possible values are as follows:</div><ul><li>P - When 'P' is configured, pressing enter or shift + enter will create a 'p' tag</li><li>DIV - When 'DIV' is configured, pressing enter or shift + enter will create a 'div' tag</li><li>BR - When 'BR' is configured, pressing enter or shift + enter will create a 'br' tag</li></ul>`;
            } else if (enterListObj.value === 'BR') {
                defaultRTE.enterKey = 'BR';
                defaultRTE.value = `In Rich text Editor, the enter key and shift + enter key actions can be customized using the enterKey and shiftEnterKey APIs. And the possible values are as follows:<ul><li>P - When 'P' is configured, pressing enter or shift + enter will create a 'p' tag</li><li>DIV - When 'DIV' is configured, pressing enter or shift + enter will create a 'div' tag</li><li>BR - When 'BR' is configured, pressing enter or shift + enter will create a 'br' tag</li></ul>`;
            } else {
                defaultRTE.enterKey = 'P'
                defaultRTE.value = `<p>In Rich text Editor, the enter key and shift + enter key actions can be customized using the enterKey and shiftEnterKey APIs. And the possible values are as follows:</p><ul><li>P - When 'P' is configured, pressing enter or shift + enter will create a 'p' tag</li><li>DIV - When 'DIV' is configured, pressing enter or shift + enter will create a 'div' tag</li><li>BR - When 'BR' is configured, pressing enter or shift + enter will create a 'br' tag</li></ul>`;
            }
            onChange();
        }
    });
    enterListObj.appendTo('#enterOption');

    let shiftEnterlistObj: DropDownList = new DropDownList({
        placeholder: 'When pressing the shift + enter key',
        floatLabelType: 'Always',
        change: (args: any) => {
            if (shiftEnterlistObj.value === 'DIV') {
                defaultRTE.shiftEnterKey = 'DIV'
            } else if (shiftEnterlistObj.value === 'P') {
                defaultRTE.shiftEnterKey = 'P'
            } else {
                defaultRTE.shiftEnterKey = 'BR'
            }
        }
    });
    shiftEnterlistObj.appendTo('#shiftEnterOption');
};
