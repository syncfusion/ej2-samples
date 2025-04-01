import { loadCultureFiles } from '../common/culture-loader';
/**
 * Rich Text Editor overview sample
 */
import { addClass, removeClass, Browser } from '@syncfusion/ej2-base';
import { RichTextEditor, Toolbar, Link, Image, Count, HtmlEditor, QuickToolbar, Table, FileManager, EmojiPicker, Audio, Video, FormatPainter, PasteCleanup, ActionBeginEventArgs, SlashMenu, ImportExport } from '@syncfusion/ej2-richtexteditor';
import { createElement } from '@syncfusion/ej2-base';
import { Editor as ICodeMirror } from 'codemirror';
import { Mention } from '@syncfusion/ej2-dropdowns';
import * as CodeMirror from 'codemirror';

import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/css/css.js';
import 'codemirror/mode/htmlmixed/htmlmixed.js';

RichTextEditor.Inject(Toolbar, Link, Image, Count, HtmlEditor, QuickToolbar, Table, FileManager, EmojiPicker, Audio, Video, FormatPainter, PasteCleanup, SlashMenu, ImportExport);

(window as any).default = (): void => {
    loadCultureFiles();

    const hostUrl: string = 'https://services.syncfusion.com/js/production/';

    const editor: RichTextEditor = new RichTextEditor({
        toolbarSettings: {
            items: [
                'Undo', 'Redo', '|', 'ImportWord', 'ExportWord', 'ExportPdf', '|',
                'Bold', 'Italic', 'Underline', 'StrikeThrough', 'InlineCode', 'SuperScript', 'SubScript', '|',
                'FontName', 'FontSize', 'FontColor', 'BackgroundColor', '|',
                'LowerCase', 'UpperCase', '|',
                'Formats', 'Alignments', 'Blockquote', '|', 'NumberFormatList', 'BulletFormatList', '|',
                'Outdent', 'Indent', '|', 'CreateLink', 'Image', 'FileManager', 'Video', 'Audio', 'CreateTable', '|', 'FormatPainter', 'ClearFormat',
                '|', 'EmojiPicker', 'Print', '|',
                'SourceCode', 'FullScreen']
        },
        slashMenuSettings: {
            enable: true,
            items: ['Paragraph', 'Heading 1', 'Heading 2', 'Heading 3', 'Heading 4', 'OrderedList', 'UnorderedList',
                'CodeBlock', 'Blockquote', 'Link', 'Image','Video', 'Audio', 'Table', 'Emojipicker',
            ]
        },
        insertImageSettings: {
            saveUrl: hostUrl + 'api/RichTextEditor/SaveFile',
            removeUrl: hostUrl + 'api/RichTextEditor/DeleteFile',
            path: hostUrl + 'RichTextEditor/'
        },
        importWord: {
            serviceUrl: hostUrl + 'api/RichTextEditor/ImportFromWord',
        },
        exportWord: {
            serviceUrl: hostUrl + 'api/RichTextEditor/ExportToDocx',
            fileName: 'RichTextEditor.docx',
            stylesheet: `
        .e-rte-content {
            font-size: 1em;
            font-weight: 400;
            margin: 0;
        }
    `
        },
        exportPdf: {
            serviceUrl: hostUrl + 'api/RichTextEditor/ExportToPdf',
            fileName: 'RichTextEditor.pdf',
            stylesheet: `
        .e-rte-content{
            font-size: 1em;
            font-weight: 400;
            margin: 0;
        }
    `
        },
        enableXhtml: true,
        fileManagerSettings: {
            enable: true, path: '/Pictures/Food',
            ajaxSettings: {
                url: 'https://ej2-aspcore-service.azurewebsites.net/api/FileManager/FileOperations',
                getImageUrl: 'https://ej2-aspcore-service.azurewebsites.net/api/FileManager/GetImage',
                uploadUrl: 'https://ej2-aspcore-service.azurewebsites.net/api/FileManager/Upload',
                downloadUrl: 'https://ej2-aspcore-service.azurewebsites.net/api/FileManager/Download'
            }
        },
        quickToolbarSettings: {
            table: ['TableHeader', 'TableRows', 'TableColumns', 'TableCell', '-',
                'BackgroundColor', 'TableRemove', 'TableCellVerticalAlign', 'Styles'],
            showOnRightClick: true,
        },
        showCharCount: true,
        enableTabKey: true,
        placeholder: 'Type something or use @ to tag a user...',
        actionBegin: actionBeginHandler,
        actionComplete: actionCompleteHandler,
    });
    editor.appendTo('#defaultRTE');

    const emailData: MentionUser[] = [
        { name: "Selma Rose", initial: 'SR', email: "selma@gmail.com", color: '#FAFDFF', bgColor: '#01579B' },
        { name: "Maria", initial: 'MA', email: "maria@gmail.com", color: '#004378', bgColor: '#ADDBFF' },
        { name: "Russo Kay", initial: 'RK', email: "russo@gmail.com", color: '#F9DEDC', bgColor: '#8C1D18' },
        { name: "Robert", initial: 'RO', email: "robert@gmail.com", color: '#FFD6F7', bgColor: '#37003A' },
        { name: "Camden Kate", initial: 'CK', email: "camden@gmail.com", color: '#FFFFFF', bgColor: '#464ECF' },
        { name: "Garth", initial: 'GA', email: "garth@gmail.com", color: '#FFFFFF', bgColor: '#008861' },
        { name: "Andrew James", initial: 'AJ', email: "james@gmail.com", color: '#FFFFFF', bgColor: '#53CA17' },
        { name: "Olivia", initial: 'OL', email: "olivia@gmail.com", color: '#FFFFFF', bgColor: '#8C1D18' },
        { name: "Sophia", initial: 'SO', email: "sophia@gmail.com", color: '#000000', bgColor: '#D0BCFF' },
        { name: "Margaret", initial: 'MA', email: "margaret@gmail.com", color: '#000000', bgColor: '#F2B8B5' },
        { name: "Ursula Ann", initial: 'UA', email: "ursula@gmail.com", color: '#000000', bgColor: '#47ACFB' },
        { name: "Laura Grace", initial: 'LG', email: "laura@gmail.com", color: '#000000', bgColor: '#FFE088' },
        { name: "Albert", initial: 'AL', email: "albert@gmail.com", color: '#FFFFFF', bgColor: '#00335B' },
        { name: "William", initial: 'WA', email: "william@gmail.com", color: '#FFFFFF', bgColor: '#163E02' }
    ];

    const mention: Mention = new Mention({
        dataSource: emailData as unknown as { [key: string]: Object }[],
        fields: { text: 'name' },
        displayTemplate: '<a href=mailto:${email} title=${email}>@${name}</a>',
        itemTemplate: '#editorMentionListTemplate',
        popupWidth: '250px',
        popupHeight: '200px',
        sortOrder: 'Ascending',
        target: editor.inputElement,
        allowSpaces: true,
        suffixText: '&nbsp;'
    })

    mention.appendTo('#editorMention');

    let codeMirror: ICodeMirror;
    function mirrorConversion(e?: any): void {
        const id: string = editor.getID() + 'mirror-view';
        const rteContainer: HTMLElement = editor.element.querySelector('.e-rte-container');
        let mirrorView: HTMLElement = editor.element.querySelector('#' + id) as HTMLElement;
        if (e.targetItem === 'Preview') {
            editor.value = codeMirror.getValue();
            editor.dataBind();
            rteContainer.classList.remove('e-rte-code-mirror-enabled');
            editor.focusIn();
            if (document.querySelector('.CodeMirror')) {
                (document.querySelector('.CodeMirror') as HTMLElement).style.height = '300px';
            }
        } else {
            rteContainer.classList.add('e-rte-code-mirror-enabled');
            rteContainer.classList.remove('e-source-code-enabled');
            if (!mirrorView) {
                mirrorView = createElement('div', { className: 'rte-code-mirror', id: id, styles: 'display: none;' });
                rteContainer.appendChild(mirrorView);
                renderCodeMirror(mirrorView, editor.value === null ? '' : editor.value);
            }
            else {
                codeMirror.setValue(editor.value);
            }
            if (document.querySelector('.e-rte-full-screen')) {
                (document.querySelector('.CodeMirror') as HTMLElement).style.height = 'auto';
            }
            codeMirror.focus();
        }
    }

    function renderCodeMirror(mirrorView: HTMLElement, content: string): void {
        codeMirror = CodeMirror(mirrorView, {
            value: content,
            lineNumbers: true,
            mode: 'text/html',
            lineWrapping: true,
        });
    }

    function actionBeginHandler(e: ActionBeginEventArgs): void {
        if (e.requestType === 'Maximize' || e.requestType === 'Minimize') {
            handleFullScreen(e);
        }
    }
    function handleFullScreen(e: any): void {
        let sbCntEle: HTMLElement = document.querySelector('.sb-content.e-view');
        let sbHdrEle: HTMLElement = document.querySelector('.sb-header.e-view');
        let leftBar: HTMLElement;
        let transformElement: HTMLElement;
        if (Browser.isDevice) {
            leftBar = document.querySelector('#right-sidebar');
            transformElement = document.querySelector('.sample-browser.e-view.e-content-animation');
        } else {
            leftBar = document.querySelector('#left-sidebar');
            transformElement = document.querySelector('#right-pane');
        }
        if (e.targetItem === 'Maximize' && (sbCntEle != null || sbHdrEle != null)) {
            if (Browser.isDevice && Browser.isIos) { addClass([sbCntEle, sbHdrEle], ['hide-header']); }
            addClass([leftBar], ['e-close']);
            removeClass([leftBar], ['e-open']);
            if (!Browser.isDevice) { transformElement.style.marginLeft = '0px'; }
            transformElement.style.transform = 'inherit';
            if (document.querySelector('.CodeMirror')) {
                (document.querySelector('.CodeMirror')  as HTMLElement).style.height = 'auto';
            }
        } else if (e.targetItem === 'Minimize' && (sbCntEle != null || sbHdrEle != null)) {
            if (Browser.isDevice && Browser.isIos) { removeClass([sbCntEle, sbHdrEle], ['hide-header']); }
            removeClass([leftBar], ['e-close']);
            if (!Browser.isDevice) {
                addClass([leftBar], ['e-open']);
                transformElement.style.marginLeft = leftBar.offsetWidth + 'px';
            }
            transformElement.style.transform = 'translateX(0px)';
            if (document.querySelector('.CodeMirror')) {
                (document.querySelector('.CodeMirror') as HTMLElement).style.height = '300px';
            }
        }
    }

    function actionCompleteHandler(e: any): void {
        if (e.targetItem && (e.targetItem === 'SourceCode' || e.targetItem === 'Preview')) {
            mirrorConversion(e);
        }
    }
    interface MentionUser {
        name: string;
        initial: string;
        email: string;
        color: string;
        bgColor: string;
    }
};
