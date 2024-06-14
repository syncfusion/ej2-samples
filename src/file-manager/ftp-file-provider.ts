import { loadCultureFiles } from '../common/culture-loader';
import { FileManager, Toolbar, NavigationPane, DetailsView, ContextMenu } from '@syncfusion/ej2-filemanager';

FileManager.Inject(Toolbar, NavigationPane, DetailsView, ContextMenu);

/**
 * File Manager sample with File Transfer Protocol
 */
(window as any).default = (): void => {
    loadCultureFiles();
    let hostUrl: string = 'https://ej2-ftp-aspcore-service.azurewebsites.net/';
    let fileObject: FileManager = new FileManager({
        ajaxSettings: {
            url: hostUrl + 'api/FTPProvider/FTPFileOperations',
            getImageUrl: hostUrl + 'api/FTPProvider/FTPGetImage',
            uploadUrl: hostUrl + 'api/FTPProvider/FTPUpload',
            downloadUrl: hostUrl + 'api/FTPProvider/FTPDownload'
        },
        toolbarSettings: { items: ['NewFolder', 'SortBy', 'Cut', 'Copy', 'Paste', 'Delete', 'Refresh', 'Download', 'Rename', 'Selection', 'View', 'Details'] },
        contextMenuSettings: {
            file: [ "Cut", "Copy", "|", "Delete", "Download", "Rename", "|", "Details"],
            layout: ["SortBy", "View", "Refresh", "|", "Paste", "|", "NewFolder", "|", "Details", "|", "SelectAll"],
            visible: true
        }
    });
    fileObject.appendTo('#ftpFilemanager');
};