import { loadCultureFiles } from '../common/culture-loader';
import { FileManager, Toolbar, NavigationPane, DetailsView, ContextMenu } from '@syncfusion/ej2-filemanager';

FileManager.Inject(Toolbar, NavigationPane, DetailsView, ContextMenu);

/**
 * File Manager sample with Azure service
 */
(window as any).default = (): void => {
    loadCultureFiles();
    let hostUrl: string = 'https://ej2-azure-aspcore-service.azurewebsites.net/';
    let fileObject: FileManager = new FileManager({
        ajaxSettings: {
            url: hostUrl + 'api/AzureFileManager/AzureFileOperations',
            getImageUrl: hostUrl + 'api/AzureFileManager/AzureGetImage',
            uploadUrl: hostUrl + 'api/AzureFileManager/AzureUpload',
            downloadUrl: hostUrl + 'api/AzureFileManager/AzureDownload'
        }
    });
    fileObject.appendTo('#filemanager');
};