import { loadCultureFiles } from '../common/culture-loader';
import { FileManager, Toolbar, NavigationPane, DetailsView, ContextMenu, Virtualization } from '@syncfusion/ej2-filemanager';

FileManager.Inject(Toolbar, NavigationPane, DetailsView, ContextMenu, Virtualization);

/**
 * File Manager virtualization sample
 */
(window as any).default = (): void => {
    loadCultureFiles();
    let hostUrl: string = 'https://ej2-aspcore-service.azurewebsites.net/';
    let fileObject: FileManager = new FileManager({
        ajaxSettings: {
            url: hostUrl + 'api/FileManager/FileOperations',
            getImageUrl: hostUrl + 'api/FileManager/GetImage',
            uploadUrl: hostUrl + 'api/FileManager/Upload',
            downloadUrl: hostUrl + 'api/FileManager/Download'
        },
        view: 'Details',
        virtualizationSettings: {
            enable: true,
            detailsViewItemsCount: 30,
            largeIconsViewItemsCount: 50
        },
        beforeSend: function(args) {
            var data = JSON.parse(args.ajaxSettings.data);  
            // Add custom parameter rootFolderName  
             data["rootFolderName"] = "FileBrowser"; 
            // Add custom parameter in ajax settings  
             args.ajaxSettings.data = JSON.stringify(data);  
        },
    });
    fileObject.appendTo('#filemanager');
};