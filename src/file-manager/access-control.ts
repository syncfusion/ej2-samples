import { loadCultureFiles } from '../common/culture-loader';
import { FileManager, Toolbar, NavigationPane, DetailsView } from '@syncfusion/ej2-filemanager';

FileManager.Inject(Toolbar, NavigationPane, DetailsView);

/**
 * File Manager real time use case sample
 */

(window as any).default = (): void => {
    loadCultureFiles();    

    let hostUrl: string = 'https://ej2-aspcore-service.azurewebsites.net/';

    // Initialize the FileManager component
    let filemanagerInstance: FileManager = new FileManager({
            ajaxSettings: {
                url: hostUrl + 'api/FileManagerAccess/FileOperations',
                uploadUrl: hostUrl + 'api/FileManagerAccess/Upload',
                downloadUrl: hostUrl + 'api/FileManagerAccess/Download',
                getImageUrl: hostUrl + 'api/FileManagerAccess/GetImage'
            }
    });
    filemanagerInstance.appendTo('#filemanager');
};
