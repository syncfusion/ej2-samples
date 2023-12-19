import { loadCultureFiles } from '../common/culture-loader';
/**
 * Rich Text Editor expand toolbar sample
 */
import { RichTextEditor, Toolbar, Link, Image, ToolbarType, HtmlEditor, QuickToolbar } from '@syncfusion/ej2-richtexteditor';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { CheckBox, ChangeEventArgs } from '@syncfusion/ej2-buttons';
import { addClass, removeClass, Browser } from '@syncfusion/ej2-base';
RichTextEditor.Inject(Toolbar, Link, Image, HtmlEditor, QuickToolbar);

(window as any).default = (): void => {
    loadCultureFiles();
    let options: Object = {
        floatingToolbarOffset: 0,
        toolbarSettings: {
            type: ToolbarType.Expand,
            enableFloating: false,
            items: ['Bold', 'Italic', 'Underline', 'StrikeThrough', 'SuperScript', 'SubScript', '|',
                'FontName', 'FontSize', 'FontColor', 'BackgroundColor', '|',
                'LowerCase', 'UpperCase', '|',
                'Formats', 'Alignments', '|', 'NumberFormatList', 'BulletFormatList', '|',
                'Outdent', 'Indent', '|', 'CreateLink', 'Image', 'Video', 'Audio', 'CreateTable', '|', 'FormatPainter', 'ClearFormat',
                '|', 'EmojiPicker', 'Print', '|',
                'SourceCode', 'FullScreen', '|', 'Undo', 'Redo']
        },
        actionBegin: handleFullScreen,
        actionComplete: actionCompleteHandler
    };

    let defaultRTE: RichTextEditor = new RichTextEditor(options);
    defaultRTE.appendTo('#defaultRTE');

    let dropdownInstance: DropDownList = new DropDownList({
        placeholder: 'Types',
        floatLabelType: 'Auto',
        change: onChange,
        index: 0
    });
    dropdownInstance.appendTo('#types');

    let float: CheckBox = new CheckBox({
        // set false for enable the checked state at initial rendering
        checked: false,
        label: 'Enable Floating',
        // bind change event
        change: (args: ChangeEventArgs) => {
            defaultRTE.toolbarSettings.enableFloating = (args as any).checked;
            defaultRTE.dataBind();
        }
    });
    float.appendTo('#float');

    function onChange(): void {
        /*Apply selected format to the component*/
        switch (dropdownInstance.value) {
            case '1':
                defaultRTE.toolbarSettings.type = ToolbarType.Expand;
                defaultRTE.toolbarSettings.enableFloating = float.checked;
                break;
            case '2':
                defaultRTE.toolbarSettings.type = ToolbarType.MultiRow;
                defaultRTE.toolbarSettings.enableFloating = float.checked;
                break;
            case '3':
                defaultRTE.toolbarSettings.type = ToolbarType.Scrollable;
                defaultRTE.toolbarSettings.enableFloating = float.checked;
                break;
        }
        defaultRTE.dataBind();
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
    setTimeout(() => {  this.toolbarModule.refreshToolbarOverflow();       }, 400);
    }
};
