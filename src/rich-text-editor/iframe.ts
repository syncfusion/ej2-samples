import { loadCultureFiles } from '../common/culture-loader';
/**
 * RichTextEditor iframe sample
 */
import { addClass, removeClass, Browser } from '@syncfusion/ej2-base';
import { RichTextEditor, Toolbar, Link, Image, HtmlEditor, QuickToolbar, Table } from '@syncfusion/ej2-richtexteditor';
RichTextEditor.Inject(Toolbar, Link, Image, HtmlEditor, QuickToolbar, Table);

(window as any).default = (): void => {
    loadCultureFiles();

    let iframeRTE: RichTextEditor = new RichTextEditor({
        height: 500,
        iframeSettings: {
            enable: true
        },
        toolbarSettings: {
            items: ['Bold', 'Italic', 'Underline', 'StrikeThrough',
                'FontName', 'FontSize', 'FontColor', 'BackgroundColor',
                'LowerCase', 'UpperCase', 'SuperScript', 'SubScript', '|',
                'Formats', 'Alignments', 'OrderedList', 'UnorderedList',
                'Outdent', 'Indent', '|',
                'CreateTable', 'CreateLink', 'Image', '|', 'ClearFormat', 'Print',
                'SourceCode', 'FullScreen', '|', 'Undo', 'Redo'
            ]
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