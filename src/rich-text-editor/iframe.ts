import { loadCultureFiles } from '../common/culture-loader';
/**
 * Rich Text Editor iframe sample
 */
import { addClass, removeClass, Browser } from '@syncfusion/ej2-base';
import { RichTextEditor, Toolbar, Link, Image, HtmlEditor, QuickToolbar, Table, FileManager,Audio,Video,EmojiPicker, PasteCleanup } from '@syncfusion/ej2-richtexteditor';
RichTextEditor.Inject(Toolbar, Link, Image, HtmlEditor, QuickToolbar, Table, FileManager,Audio,Video,EmojiPicker, PasteCleanup);

(window as any).default = (): void => {
    loadCultureFiles();

    let hostUrl: string = 'https://ej2-aspcore-service.azurewebsites.net/';

    let iframeRTE: RichTextEditor = new RichTextEditor({
        height: 500,
        iframeSettings: {
            enable: true
        },
        toolbarSettings: {
            items: ['Bold', 'Italic', 'Underline', 'StrikeThrough', 'SuperScript', 'SubScript', '|',
                'FontName', 'FontSize', 'FontColor', 'BackgroundColor', '|',
                'LowerCase', 'UpperCase', '|',
                'Formats', 'Alignments', 'Blockquote', '|', 'NumberFormatList', 'BulletFormatList', '|',
                'Outdent', 'Indent', '|', 'CreateLink', 'Image', 'FileManager', 'Video', 'Audio', 'CreateTable', '|', 'ClearFormat',
                '|', 'EmojiPicker', 'Print', '|',
                'SourceCode', 'FullScreen', '|', 'Undo', 'Redo']
        },
        fileManagerSettings: {
            enable: true,
            path: '/Pictures/Food',
            ajaxSettings: {
                url: hostUrl + 'api/FileManager/FileOperations',
                getImageUrl: hostUrl + 'api/FileManager/GetImage',
                uploadUrl: hostUrl + 'api/FileManager/Upload',
                downloadUrl: hostUrl + 'api/FileManager/Download'
            }
        },
        actionBegin: handleFullScreen,
        actionComplete: actionCompleteHandler
    });
    iframeRTE.appendTo('#iframeRTE');

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
            if (Browser.isDevice && Browser.isIos) {
                addClass([sbCntEle, sbHdrEle], ['hide-header']);
            }
            addClass([leftBar], ['e-close']);
            removeClass([leftBar], ['e-open']);
            if (!Browser.isDevice) { transformElement.style.marginLeft = '0px'; }
            transformElement.style.transform = 'inherit';
        } else if (e.targetItem === 'Minimize') {
            if (Browser.isDevice && Browser.isIos) {
                removeClass([sbCntEle, sbHdrEle], ['hide-header']);
            }
            removeClass([leftBar], ['e-close']);
            if (!Browser.isDevice) {
            addClass([leftBar], ['e-open']);
            transformElement.style.marginLeft = leftBar.offsetWidth + 'px'; }
            transformElement.style.transform = 'translateX(0px)';
        }
    }

    function actionCompleteHandler(): void {
        setTimeout(() => { iframeRTE.toolbarModule.refreshToolbarOverflow(); }, 400);
    }
};