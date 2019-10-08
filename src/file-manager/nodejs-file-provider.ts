import { loadCultureFiles } from '../common/culture-loader';
import { FileManager, Toolbar, NavigationPane, DetailsView, ContextMenu } from '@syncfusion/ej2-filemanager';

FileManager.Inject(Toolbar, NavigationPane, DetailsView, ContextMenu);

/**
 * File Manager Node.js Service provider sample
 */
(window as any).default = (): void => {
    loadCultureFiles();
    let hostUrl: string = 'https://ej2-nodejs-service.azurewebsites.net/';
    let fileObject: FileManager = new FileManager({
        ajaxSettings: {
            url: hostUrl,
            getImageUrl: hostUrl + 'GetImage',
            uploadUrl: hostUrl + 'Upload',
            downloadUrl: hostUrl + 'Download'
        }
    });
    fileObject.appendTo('#filemanager');
};