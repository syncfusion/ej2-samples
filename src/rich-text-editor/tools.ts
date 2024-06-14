import { loadCultureFiles } from '../common/culture-loader';
/**
 * Rich Text Editor overview sample
 */
import { addClass, removeClass, Browser } from '@syncfusion/ej2-base';
import { RichTextEditor, Toolbar, Link, Image, Count, HtmlEditor, QuickToolbar, Table, FileManager, EmojiPicker, Audio, Video, FormatPainter, PasteCleanup, ActionBeginEventArgs } from '@syncfusion/ej2-richtexteditor';
import { createElement } from '@syncfusion/ej2-base';
import { Editor as ICodeMirror } from 'codemirror';
import { Mention } from '@syncfusion/ej2-dropdowns';
import { Uploader } from '@syncfusion/ej2-inputs';
import { isNullOrUndefined } from '@syncfusion/ej2-base';
import * as CodeMirror from 'codemirror';

import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/css/css.js';
import 'codemirror/mode/htmlmixed/htmlmixed.js';

RichTextEditor.Inject(Toolbar, Link, Image, Count, HtmlEditor, QuickToolbar, Table, FileManager, EmojiPicker, Audio, Video, FormatPainter, PasteCleanup);

(window as any).default = (): void => {
    loadCultureFiles();

    const hostUrl: string = 'https://services.syncfusion.com/js/production/';

    const editor: RichTextEditor = new RichTextEditor({
        toolbarSettings: {
            items: [
                'Undo', 'Redo', '|',
                {
                    tooltipText: "Import from Word",
                    template:
                        `<button class="e-tbar-btn e-control e-btn e-lib e-icon-btn" tabindex="-1" id="custom_tbarbtn_1" style="width:100%">
                      <span class="e-icons e-rte-import-doc e-btn-icon"></span></button>`,
                    click: importContentFromWord
                },
                {
                    tooltipText: "Export to Word",
                    template:
                        `<button class="e-tbar-btn e-control e-btn e-lib e-icon-btn" tabindex="-1" id="custom_tbarbtn_2" style="width:100%">
                      <span class="e-icons e-rte-export-doc e-btn-icon"></span></button>`,
                    click: exportContentToWord
                },
                {
                    tooltipText: "Export to PDF",
                    template:
                        `<button class="e-tbar-btn e-control e-btn e-lib e-icon-btn" tabindex="-1" id="custom_tbarbtn_3" style="width:100%">
                      <span class="e-icons e-rte-export-pdf e-btn-icon"></span></button>`,
                    click: exportContentToPDF
                }, '|',
                'Bold', 'Italic', 'Underline', 'StrikeThrough', 'SuperScript', 'SubScript', '|',
                'FontName', 'FontSize', 'FontColor', 'BackgroundColor', '|',
                'LowerCase', 'UpperCase', '|',
                'Formats', 'Alignments', 'Blockquote', '|', 'NumberFormatList', 'BulletFormatList', '|',
                'Outdent', 'Indent', '|', 'CreateLink', 'Image', 'FileManager', 'Video', 'Audio', 'CreateTable', '|', 'FormatPainter', 'ClearFormat',
                '|', 'EmojiPicker', 'Print', '|',
                'SourceCode', 'FullScreen']
        },
        insertImageSettings: {
            saveUrl: hostUrl + 'api/RichTextEditor/SaveFile',
            removeUrl: hostUrl + 'api/RichTextEditor/DeleteFile',
            path: hostUrl + 'RichTextEditor/'
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
        beforeQuickToolbarOpen: quickToolbarOpenHandler,
        quickToolbarClose: quickToolbarClosehandler
    });
    editor.appendTo('#defaultRTE');

    const uploadObj: Uploader = new Uploader({
        allowedExtensions: '.docx,.doc,.rtf',
        asyncSettings: {
            saveUrl: hostUrl + 'api/RichTextEditor/ImportFromWord',
        },
        success: onUploadSuccess,
    });
    uploadObj.appendTo('#rteCustomWordUpload');

    (uploadObj.element.closest('.e-upload') as HTMLElement).style.display = 'none';

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
        allowSpaces: true
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
        if (e.requestType === 'EnterAction' && mention.element.classList.contains('e-popup-open')) {
            e.cancel = true;
        }
        if (e.requestType === 'Maximize' || e.requestType === 'Minimize') {
            handleFullScreen(e);
        }
    }

    function quickToolbarOpenHandler(args: any): void {
        if (!isNullOrUndefined(args.targetElement) && args.targetElement.nodeName === 'IMG') {
            editor.getToolbar().querySelector('#custom_tbarbtn_1').parentElement.classList.add('e-overlay');
            editor.getToolbar().querySelector('#custom_tbarbtn_2').parentElement.classList.add('e-overlay');
            editor.getToolbar().querySelector('#custom_tbarbtn_3').parentElement.classList.add('e-overlay');
        }

    }
    function quickToolbarClosehandler(args: any): void {
        if (!isNullOrUndefined(args.element) && args.element.classList.contains('e-rte-image-popup')) {
            editor.getToolbar().querySelector('#custom_tbarbtn_1').parentElement.classList.remove('e-overlay');
            editor.getToolbar().querySelector('#custom_tbarbtn_2').parentElement.classList.remove('e-overlay');
            editor.getToolbar().querySelector('#custom_tbarbtn_3').parentElement.classList.remove('e-overlay');
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
        if (e.targetItem === 'Maximize') {
            if (Browser.isDevice && Browser.isIos) { addClass([sbCntEle, sbHdrEle], ['hide-header']); }
            addClass([leftBar], ['e-close']);
            removeClass([leftBar], ['e-open']);
            if (!Browser.isDevice) { transformElement.style.marginLeft = '0px'; }
            transformElement.style.transform = 'inherit';
        } else if (e.targetItem === 'Minimize') {
            if (Browser.isDevice && Browser.isIos) { removeClass([sbCntEle, sbHdrEle], ['hide-header']); }
            removeClass([leftBar], ['e-close']);
            if (!Browser.isDevice) {
                addClass([leftBar], ['e-open']);
                transformElement.style.marginLeft = leftBar.offsetWidth + 'px';
            }
            transformElement.style.transform = 'translateX(0px)';
        }
    }

    function actionCompleteHandler(e: any): void {
        if (e.targetItem && (e.targetItem === 'SourceCode' || e.targetItem === 'Preview')) {
            mirrorConversion(e);
        }
        if (e.requestType === 'SourceCode') {
            editor.getToolbar().querySelector('#custom_tbarbtn_1').parentElement.classList.add('e-overlay');
            editor.getToolbar().querySelector('#custom_tbarbtn_2').parentElement.classList.add('e-overlay');
            editor.getToolbar().querySelector('#custom_tbarbtn_3').parentElement.classList.add('e-overlay');
        } else if (e.requestType === 'Preview') {
            editor.getToolbar().querySelector('#custom_tbarbtn_1').parentElement.classList.remove('e-overlay');
            editor.getToolbar().querySelector('#custom_tbarbtn_2').parentElement.classList.remove('e-overlay');
            editor.getToolbar().querySelector('#custom_tbarbtn_3').parentElement.classList.remove('e-overlay');
        }
    }

    function importContentFromWord(): void {
        uploadObj.element.click();
    }

    function exportContentToWord(): void {
        const rteHtmlData = editor.getHtml();
        const html = `<html><head></head><body>${rteHtmlData}</body></html>`;
        fetch(hostUrl + 'api/RichTextEditor/ExportToDocx', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ html: html }) // Wrap HTML in a JSON object
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const filename: string = 'Result.docx';
                // Create a Blob from the response and initiate the download
                return response.blob().then(blob => ({ blob, filename }));
            })
            .then(({ blob, filename }) => {
                const url = window.URL.createObjectURL(blob);       // Create a Blob URL from the response and initiate the download    
                const a = document.createElement('a');              // Create an anchor element
                a.href = url;
                a.download = filename;
                document.body.appendChild(a);                       // Append the anchor element to the document
                a.click();                                          // Trigger a click on the anchor element to initiate the download
                document.body.removeChild(a);                       // Remove the anchor element from the document
                window.URL.revokeObjectURL(url);                    // Revoke the object URL to free up resources
            })
            .catch(error => {
                console.error('Fetch error:', error);
            });
    }

    function exportContentToPDF(): void {
        const rteHtmlData = editor.getHtml();
        const html = `<html><head></head><body>${rteHtmlData}</body></html>`;
        fetch(hostUrl + 'api/RichTextEditor/ExportToPdf', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ html: html }) // Wrap HTML in a JSON object
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.blob();
            })
            .then(blob => {
                const url: string = window.URL.createObjectURL(blob);       // Create a Blob URL from the response and initiate the download
                const a: HTMLAnchorElement = document.createElement('a');   // Create an anchor element
                a.href = url;
                a.download = 'Sample.pdf';
                document.body.appendChild(a);             // Append the anchor element to the document
                a.click();                                // Trigger a click on the anchor element to initiate the download
                document.body.removeChild(a);             // Remove the anchor element from the document
                window.URL.revokeObjectURL(url);          // Revoke the object URL to free up resources
            })
            .catch(error => {
                console.error('Fetch error:', error);
            });
    }

    function onUploadSuccess(args: any): void {
        editor.executeCommand('insertHTML', args.e.currentTarget.response, { undo: true });
    }

    interface MentionUser {
        name: string;
        initial: string;
        email: string;
        color: string;
        bgColor: string;
    }
};
