import { loadCultureFiles } from '../common/culture-loader';
/**
 * Rich Text Editor client side events samples
 */
import { addClass, removeClass, Browser } from '@syncfusion/ej2-base';
import { RichTextEditor, Toolbar, Link, Image, HtmlEditor, QuickToolbar, Table, EmojiPicker, PasteCleanup, Audio ,Video, FormatPainter, FileManager } from '@syncfusion/ej2-richtexteditor';
import { ActionBeginEventArgs, ActionCompleteEventArgs } from '@syncfusion/ej2-richtexteditor';
import { Button } from '@syncfusion/ej2-buttons';
RichTextEditor.Inject(Toolbar, Link, Image, HtmlEditor, QuickToolbar, Table, EmojiPicker, PasteCleanup, Audio ,Video, FormatPainter, FileManager);

//tslint:disable:max-func-body-length
(window as any).default = (): void => {
    loadCultureFiles();
    const hostUrl: string = 'https://ej2-aspcore-service.azurewebsites.net/';
    let defaultRTE: RichTextEditor = new RichTextEditor({
        toolbarSettings: {
            items: ['Bold', 'Italic', 'Underline', 'StrikeThrough', 'SuperScript', 'SubScript', '|',
                'FontName', 'FontSize', 'FontColor', 'BackgroundColor', '|',
                'LowerCase', 'UpperCase', '|',
                'Formats', 'Alignments', 'Blockquote', '|', 'NumberFormatList', 'BulletFormatList', '|',
                'Outdent', 'Indent', '|', 'CreateLink', 'Image', 'FileManager', 'Video', 'Audio', 'CreateTable', '|', 'FormatPainter', 'ClearFormat',
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
              downloadUrl: hostUrl + 'api/FileManager/Download',
            },
        },
        created: create,
        actionBegin: actionBegin,
        actionComplete: actionComplete,
        focus: focus,
        blur: blur,
        change: change,
        toolbarClick: toolbarClick,
        beforeDialogOpen: beforeDialogOpen,
        dialogOpen: dialogOpen,
        dialogClose: dialogClose,
        beforeQuickToolbarOpen: beforeQuickToolbarOpen,
        quickToolbarOpen: quickToolbarOpen,
        quickToolbarClose: quickToolbarClose,
        imageSelected: imageSelected,
        imageUploading: imageUploading,
        imageUploadSuccess: imageUploadSuccess,
        imageUploadFailed: imageUploadFailed,
        imageRemoving: imageRemoving,
        destroyed: destroyed,
        beforeSanitizeHtml: beforeSanitizeHtml,
        resizing: resizing,
        resizeStart: resizeStart,
        resizeStop: resizeStop
    });
    defaultRTE.appendTo('#defaultRTE');
    let clear: Button = new Button();
    clear.appendTo('#clear');

    document.getElementById('clear').onclick = () => {
        document.getElementById('EventLog').innerHTML = '';
    };

    function create(): void {
        appendElement('Rich Text Editor <b>create</b> event called<hr>');
    }
    function actionBegin(args: ActionBeginEventArgs): void {
        appendElement('<b>' + args.requestType + '</b> action is called<hr>');
        handleFullScreen(args);
    }
    function actionComplete(args: ActionCompleteEventArgs): void {
        appendElement('<b>' + args.requestType + '</b> action is completed<hr>');
        actionCompleteHandler();
    }
    function focus(): void {
        appendElement('Rich Text Editor <b>focus</b> event called<hr>');
    }
    function blur(): void {
        appendElement('Rich Text Editor <b>blur</b> event called<hr>');
    }
    function change(): void {
        appendElement('Rich Text Editor <b>change</b> event called<hr>');
    }
    function toolbarClick(): void {
        appendElement('Rich Text Editor <b>toolbar click</b> event called<hr>');
    }
    function beforeDialogOpen(): void {
        appendElement('Rich Text Editor <b>beforeDialogOpen</b> event called<hr>');
    }

    function dialogOpen(): void {
        appendElement('Rich Text Editor <b>dialogOpen</b> event called<hr>');
    }

    function dialogClose(): void {
        appendElement('Rich Text Editor <b>dialogClose</b> event called<hr>');
    }

    function beforeQuickToolbarOpen(): void {
        appendElement('Rich Text Editor <b>beforeQuickToolbarOpen</b> event called<hr>');
    }

    function quickToolbarOpen(): void {
        appendElement('Rich Text Editor <b>quickToolbarOpen</b> event called<hr>');
    }

    function quickToolbarClose(): void {
        appendElement('Rich Text Editor <b>quickToolbarClose</b> event called<hr>');
    }

    function imageSelected(): void {
        appendElement('Rich Text Editor <b>imageSelected</b> event called<hr>');
    }

    function imageUploading(): void {
        appendElement('Rich Text Editor <b>imageUploading</b> event called<hr>');
    }

    function imageUploadSuccess(): void {
        appendElement('Rich Text Editor <b>imageUploadSuccess</b> event called<hr>');
    }

    function imageUploadFailed(): void {
        appendElement('Rich Text Editor <b>imageUploadFailed</b> event called<hr>');
    }

    function imageRemoving(): void {
        appendElement('Rich Text Editor <b>imageRemoving</b> event called<hr>');
    }

    function destroyed(): void {
        appendElement('Rich Text Editor <b>destroyed</b> event called<hr>');
    }

    function beforeSanitizeHtml(): void {
        appendElement('Rich Text Editor <b>beforeSanitizeHtml</b> event called<hr>');
    }

    function resizing(): void {
        appendElement('Rich Text Editor <b>resizing</b> event called<hr>');
    }

    function resizeStart(): void {
        appendElement('Rich Text Editor <b>resizeStart</b> event called<hr>');
    }

    function resizeStop(): void {
        appendElement('Rich Text Editor <b>resizeStop</b> event called<hr>');
    }

    function appendElement(html: string): void {
        let span: HTMLElement = document.createElement('span');
        span.innerHTML = html;
        let log: HTMLElement = document.getElementById('EventLog');
        log.insertBefore(span, log.firstChild);
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
        setTimeout(() => { defaultRTE.toolbarModule.refreshToolbarOverflow(); }, 400);
    }

};