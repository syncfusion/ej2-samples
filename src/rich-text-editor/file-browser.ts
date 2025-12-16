import { loadCultureFiles } from '../common/culture-loader';
/**
 * RichTextEditor File Browser sample
 */
import { RichTextEditor, Toolbar, Image, HtmlEditor, QuickToolbar, FileManager, PasteCleanup, Table, Video, Audio, ClipBoardCleanup, AutoFormat } from '@syncfusion/ej2-richtexteditor';
RichTextEditor.Inject(Toolbar, Image, HtmlEditor, QuickToolbar, FileManager, PasteCleanup, Table, Video, Audio, ClipBoardCleanup, AutoFormat);

(window as any).default = (): void => {
    loadCultureFiles();

    let hostUrl: string = 'https://ej2-aspcore-service.azurewebsites.net/';

    let defaultRTE: RichTextEditor = new RichTextEditor({
        toolbarSettings: {
            items: ['FileManager', 'Image']
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
        }
    });
    defaultRTE.appendTo('#defaultRTE');
};
