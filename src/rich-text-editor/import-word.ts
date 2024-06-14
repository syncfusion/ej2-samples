import { loadCultureFiles } from '../common/culture-loader';
import { Uploader } from '@syncfusion/ej2-inputs';
import { RichTextEditor, Toolbar, Link, Image, HtmlEditor, QuickToolbar, Table, PasteCleanup } from '@syncfusion/ej2-richtexteditor';
import { isNullOrUndefined } from '@syncfusion/ej2-base';

RichTextEditor.Inject(Toolbar, Link, Image, HtmlEditor, QuickToolbar, Table, PasteCleanup);

(window as any).default = (): void => {
    loadCultureFiles();

    const hostUrl: string = 'https://services.syncfusion.com/js/production/';

    const importEditor: RichTextEditor = new RichTextEditor({
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
                '|',
                'Bold', 'Italic', 'Underline', 'StrikeThrough', '|',
                'FontName', 'FontSize', 'FontColor', 'BackgroundColor', '|',
                'Formats', 'Alignments', 'blockquote', '|', 'NumberFormatList', 'BulletFormatList', '|', 'CreateLink', 'Image', 'CreateTable', '|', 'ClearFormat', 'SourceCode']
        },
        insertImageSettings: {
            saveUrl: hostUrl + 'api/RichTextEditor/SaveFile',
            removeUrl: hostUrl + 'api/RichTextEditor/DeleteFile',
            path: hostUrl + 'RichTextEditor/'
        },
        enableXhtml: true,
        actionComplete: actionCompleteHandler,
        beforeQuickToolbarOpen: quickToolbarOpenHandler,
        quickToolbarClose: quickToolbarClosehandler
    });
    importEditor.appendTo('#importEditor');

    function actionCompleteHandler(e: any): void {
        if (e.requestType === 'SourceCode') {
            importEditor.getToolbar().querySelector('#custom_tbarbtn_1').parentElement.classList.add('e-overlay');
        } else if (e.requestType === 'Preview') {
            importEditor.getToolbar().querySelector('#custom_tbarbtn_1').parentElement.classList.remove('e-overlay');
        }
    }

    const uploadObj: Uploader = new Uploader({
        asyncSettings: {
            saveUrl: hostUrl + 'api/RichTextEditor/ImportFromWord',
        },
        success: onUploadSuccess,
    });
    uploadObj.appendTo('#rteCustomWordUpload');

    (uploadObj.element.closest('.e-upload') as HTMLElement).style.display = 'none';

    function importContentFromWord(): void {
        uploadObj.element.click();
    }

    function onUploadSuccess(args: any): void {
        importEditor.executeCommand('insertHTML', args.e.currentTarget.response, { undo: true });
    }
    function quickToolbarOpenHandler(args: any): void {
        if (!isNullOrUndefined(args.targetElement) && args.targetElement.nodeName === 'IMG') {
            importEditor.getToolbar().querySelector('#custom_tbarbtn_1').parentElement.classList.add('e-overlay');
        }

    }
    function quickToolbarClosehandler(args: any): void {
        if (!isNullOrUndefined(args.element) && args.element.classList.contains('e-rte-image-popup')) {
            importEditor.getToolbar().querySelector('#custom_tbarbtn_1').parentElement.classList.remove('e-overlay');
        }

    }
};
