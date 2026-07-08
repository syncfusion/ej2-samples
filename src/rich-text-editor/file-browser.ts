import { loadCultureFiles } from '../common/culture-loader';
/**
 * RichTextEditor File Browser sample
 */
import { RichTextEditor, Toolbar, Image, HtmlEditor, QuickToolbar, FileManager, PasteCleanup, Table, Video, Audio, ClipBoardCleanup, AutoFormat } from '@syncfusion/ej2-richtexteditor';
RichTextEditor.Inject(Toolbar, Image, HtmlEditor, QuickToolbar, FileManager, PasteCleanup, Table, Video, Audio, ClipBoardCleanup, AutoFormat);

(window as any).default = (): void => {
    loadCultureFiles();

    let hostUrl: string = 'https://services.syncfusion.com/js/production/';

    let defaultRTE: RichTextEditor = new RichTextEditor({
        toolbarSettings: {
            items: ['FileManager', 'Image']
        },
        fileManagerSettings: {
            enable: true,
            ajaxSettings: {
                url: hostUrl + 'api/RichTextEditor/FileOperations',
                getImageUrl: hostUrl + 'api/RichTextEditor/GetImage',
                uploadUrl: hostUrl + 'api/RichTextEditor/Upload',
                downloadUrl: hostUrl + 'api/RichTextEditor/Download'
            }
        }
    });
    defaultRTE.appendTo('#defaultRTE');
};
