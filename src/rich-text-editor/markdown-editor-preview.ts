import { loadCultureFiles } from '../common/culture-loader';
/**
 * Rich Text Editor Markdown Preview Sample
 */
import { RichTextEditor, Link, Image, MarkdownEditor, Toolbar, QuickToolbar, Table , ToolbarType } from '@syncfusion/ej2-richtexteditor';
import { createElement, KeyboardEventArgs, isNullOrUndefined, addClass, removeClass, Browser } from '@syncfusion/ej2-base';
import { Splitter } from '@syncfusion/ej2-layouts';
import * as Marked from 'marked';

RichTextEditor.Inject(Link, Image, MarkdownEditor, Toolbar, QuickToolbar, Table);

let textArea: HTMLTextAreaElement;
let srcArea: HTMLElement;
let defaultRTE: RichTextEditor;
let splitObj: Splitter;
//tslint:disable:max-func-body-length
(window as any).default = (): void => {
    loadCultureFiles();
    splitObj = new Splitter({
        height: '450px', width: '100%',
        resizing: onResizing,
        paneSettings: [{ resizable: true, size: '50%', min: '40%' }, { min: '40%' }],
        created: updateOrientation,
    });
    splitObj.appendTo('#horizontal');
    defaultRTE = new RichTextEditor({
        height: '100%',
        floatingToolbarOffset: 0,
        editorMode: 'Markdown',
        toolbarSettings: {
            type: ToolbarType.Expand,
            enableFloating: false,
            items: ['Bold', 'Italic', 'StrikeThrough', '|', 'Formats', 'OrderedList',
                'UnorderedList', '|', 'CreateLink', 'Image', 'CreateTable',
                '|', 'Undo', 'Redo'
            ]
        },
        saveInterval: 1, actionComplete: updateValue, change: onChange, created: onCreate,
    });
    defaultRTE.appendTo('#defaultRTE');
    function onChange(): void {
        updateValue();
    }
    function onResizing(): void {
        defaultRTE.refreshUI();
    }
    function onCreate(): void {
        textArea = defaultRTE.contentModule.getEditPanel() as HTMLTextAreaElement;
        srcArea = document.querySelector('.source-code') as HTMLElement;
        updateValue();
    }
    function updateValue(): void {
        srcArea.innerHTML = Marked.marked((defaultRTE.contentModule.getEditPanel() as HTMLTextAreaElement).value);
    }
    function updateOrientation(): void {
        if (Browser.isDevice) {
            splitObj.orientation = 'Vertical';
            (document.body.querySelector('.heading') as HTMLElement).style.width = 'auto';
        }
    }
};
