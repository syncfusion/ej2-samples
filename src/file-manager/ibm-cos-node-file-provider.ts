import { loadCultureFiles } from '../common/culture-loader';
import { FileManager, Toolbar, NavigationPane, DetailsView, ContextMenu } from '@syncfusion/ej2-filemanager';

FileManager.Inject(Toolbar, NavigationPane, DetailsView, ContextMenu);

/**
 * File Manager IBM Cloud Object Storage Service provider sample
 */
(window as any).default = (): void => {
    loadCultureFiles();
    let hostUrl: string = 'https://ej2-ibm-cos-node-file-provider.azurewebsites.net/';
    let fileObject: FileManager = new FileManager({
        ajaxSettings: {
            url: hostUrl,
            getImageUrl: hostUrl + 'GetImage',
            uploadUrl: hostUrl + 'Upload',
            downloadUrl: hostUrl + 'Download'
        },
        rootAliasName: 'Files'
    });
    fileObject.appendTo('#filemanager');
};