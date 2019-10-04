import { loadCultureFiles } from '../common/culture-loader';
/**
 * RichTextEditor client side events samples
 */
import { addClass, removeClass, Browser } from '@syncfusion/ej2-base';
import { RichTextEditor, Toolbar, Link, Image, HtmlEditor, QuickToolbar, Table } from '@syncfusion/ej2-richtexteditor';
import { ActionBeginEventArgs, ActionCompleteEventArgs } from '@syncfusion/ej2-richtexteditor';
import { Button } from '@syncfusion/ej2-buttons';
RichTextEditor.Inject(Toolbar, Link, Image, HtmlEditor, QuickToolbar, Table);

//tslint:disable:max-func-body-length
(window as any).default = (): void => {
    loadCultureFiles();

    let defaultRTE: RichTextEditor = new RichTextEditor({
        toolbarSettings: {
            items: ['Bold', 'Italic', 'Underline', 'StrikeThrough',
                'FontName', 'FontSize', 'FontColor', 'BackgroundColor',
                'LowerCase', 'UpperCase', '|',
                'Formats', 'Alignments', 'OrderedList', 'UnorderedList',
                'Outdent', 'Indent', '|', 'CreateTable',
                'CreateLink', 'Image', '|', 'ClearFormat', 'Print',
                'SourceCode', 'FullScreen', '|', 'Undo', 'Redo']
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
        appendElement('RichTextEditor <b>create</b> event called<hr>');
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
        appendElement('RichTextEditor <b>focus</b> event called<hr>');
    }
    function blur(): void {
        appendElement('RichTextEditor <b>blur</b> event called<hr>');
    }
    function change(): void {
        appendElement('RichTextEditor <b>change</b> event called<hr>');
    }
    function toolbarClick(): void {
        appendElement('RichTextEditor <b>toolbar click</b> event called<hr>');
    }
    function beforeDialogOpen(): void {
        appendElement('RichTextEditor <b>beforeDialogOpen</b> event called<hr>');
    }

    function dialogOpen(): void {
        appendElement('RichTextEditor <b>dialogOpen</b> event called<hr>');
    }

    function dialogClose(): void {
        appendElement('RichTextEditor <b>dialogClose</b> event called<hr>');
    }

    function beforeQuickToolbarOpen(): void {
        appendElement('RichTextEditor <b>beforeQuickToolbarOpen</b> event called<hr>');
    }

    function quickToolbarOpen(): void {
        appendElement('RichTextEditor <b>quickToolbarOpen</b> event called<hr>');
    }

    function quickToolbarClose(): void {
        appendElement('RichTextEditor <b>quickToolbarClose</b> event called<hr>');
    }

    function imageSelected(): void {
        appendElement('RichTextEditor <b>imageSelected</b> event called<hr>');
    }

    function imageUploading(): void {
        appendElement('RichTextEditor <b>imageUploading</b> event called<hr>');
    }

    function imageUploadSuccess(): void {
        appendElement('RichTextEditor <b>imageUploadSuccess</b> event called<hr>');
    }

    function imageUploadFailed(): void {
        appendElement('RichTextEditor <b>imageUploadFailed</b> event called<hr>');
    }

    function imageRemoving(): void {
        appendElement('RichTextEditor <b>imageRemoving</b> event called<hr>');
    }

    function destroyed(): void {
        appendElement('RichTextEditor <b>destroyed</b> event called<hr>');
    }

    function beforeSanitizeHtml(): void {
        appendElement('RichTextEditor <b>beforeSanitizeHtml</b> event called<hr>');
    }

    function resizing(): void {
        appendElement('RichTextEditor <b>resizing</b> event called<hr>');
    }

    function resizeStart(): void {
        appendElement('RichTextEditor <b>resizeStart</b> event called<hr>');
    }

    function resizeStop(): void {
        appendElement('RichTextEditor <b>resizeStop</b> event called<hr>');
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