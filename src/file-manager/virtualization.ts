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
        toolbarSettings: { items: ['NewFolder', 'SortBy', 'Cut', 'Copy', 'Paste', 'Delete', 'Refresh', 'Download', 'Rename', 'View', 'Details'] },
        contextMenuSettings: {
                layout: ["SortBy", "View", "Refresh", "|", "Paste", "|", "NewFolder", "|", "Details", "|", "SelectAll"],
                visible: true
        },
        enableVirtualization: true,
        beforeSend: function(args) {
            args.ajaxSettings.beforeSend = function (args: any) {
                args.httpRequest.setRequestHeader('Authorization', 'FileBrowser');
            };
        },
        beforeImageLoad: function(args) {
            args.imageUrl = args.imageUrl + '&rootName=' + 'FileBrowser';
        },
        beforeDownload: function(args) {
            args.data['rootFolderName'] = 'FileBrowser';
        },
    });
    fileObject.appendTo('#filemanager');
};