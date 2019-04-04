import { loadCultureFiles } from '../common/culture-loader';
/**
 * RichTextEditor client side events samples
 */
import { addClass, removeClass, Browser } from '@syncfusion/ej2-base';
import { RichTextEditor, Toolbar, Link, Image, HtmlEditor, QuickToolbar } from '@syncfusion/ej2-richtexteditor';
import { ActionBeginEventArgs, ActionCompleteEventArgs } from '@syncfusion/ej2-richtexteditor';
import { Button } from '@syncfusion/ej2-buttons';
RichTextEditor.Inject(Toolbar, Link, Image, HtmlEditor, QuickToolbar);

(window as any).default = (): void => {
    loadCultureFiles();

    let defaultRTE: RichTextEditor = new RichTextEditor({
        toolbarSettings: {
            items: ['Bold', 'Italic', 'Underline', 'StrikeThrough',
                'FontName', 'FontSize', 'FontColor', 'BackgroundColor',
                'LowerCase', 'UpperCase', '|',
                'Formats', 'Alignments', 'OrderedList', 'UnorderedList',
                'Outdent', 'Indent', '|',
                'CreateLink', 'Image', '|', 'ClearFormat', 'Print',
                'SourceCode', 'FullScreen', '|', 'Undo', 'Redo']
        },
        created: create,
        actionBegin: actionBegin,
        actionComplete: actionComplete,
        focus: focus,
        blur: blur,
        change: change,
        toolbarClick: toolbarClick
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
        appendElement('RidhTextEditor <b>change</b> event called<hr>');
    }
    function toolbarClick(): void {
        appendElement('RidhTextEditor <b>toolbar click</b> event called<hr>');
    }
    function appendElement(html: string): void {
        let span: HTMLElement = document.createElement('span');
        span.innerHTML = html;
        let log: HTMLElement = document.getElementById('EventLog');
        log.insertBefore(span, log.firstChild);
    }
    function handleFullScreen(e: any): void {
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
            addClass([leftBar], ['e-close']);
            removeClass([leftBar], ['e-open']);
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
    function actionCompleteHandler(): void {
        setTimeout(() => { defaultRTE.toolbarModule.refreshToolbarOverflow(); }, 400);
    }

};