import { loadCultureFiles } from '../common/culture-loader';
import { RichTextEditor, Toolbar, Link, Image, HtmlEditor, QuickToolbar, Table, PasteCleanup, ImportExport } from '@syncfusion/ej2-richtexteditor';

RichTextEditor.Inject(Toolbar, Link, Image, HtmlEditor, QuickToolbar, Table, PasteCleanup, ImportExport);

(window as any).default = (): void => {
    loadCultureFiles();

    const hostUrl: string = 'https://services.syncfusion.com/js/production/';

    const importEditor: RichTextEditor = new RichTextEditor({
        toolbarSettings: {
            items: [
                'Undo', 'Redo', '|', 'ImportWord', '|',
                'Bold', 'Italic', 'Underline', 'StrikeThrough', '|',
                'FontName', 'FontSize', 'FontColor', 'BackgroundColor', '|',
                'Formats', 'Alignments', 'Blockquote', '|', 'NumberFormatList', 'BulletFormatList', '|', 'CreateLink', 'Image', 'CreateTable', '|', 'ClearFormat', 'SourceCode']
        },
        insertImageSettings: {
            saveUrl: hostUrl + 'api/RichTextEditor/SaveFile',
            removeUrl: hostUrl + 'api/RichTextEditor/DeleteFile',
            path: hostUrl + 'RichTextEditor/'
        },
        importWord: {
            serviceUrl: hostUrl + 'api/RichTextEditor/ImportFromWord',
        },
        enableXhtml: true,
    });
    importEditor.appendTo('#importEditor');
};
