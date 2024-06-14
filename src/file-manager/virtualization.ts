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
            url: hostUrl + 'api/Virtualization/FileOperations',
            getImageUrl: hostUrl + 'api/Virtualization/GetImage',
            uploadUrl: hostUrl + 'api/Virtualization/Upload',
            downloadUrl: hostUrl + 'api/Virtualization/Download'
        },
        view: 'Details',
        toolbarSettings: { items: ['NewFolder', 'SortBy', 'Cut', 'Copy', 'Paste', 'Delete', 'Refresh', 'Download', 'Rename', 'View', 'Details'] },
        contextMenuSettings: {
            file: [ "Cut", "Copy", "|", "Delete", "Download", "Rename", "|", "Details"],
            layout: ["SortBy", "View", "Refresh", "|", "Paste", "|", "NewFolder", "|", "Details", "|", "SelectAll"],
            visible: true
        },
        enableVirtualization: true
    });
    fileObject.appendTo('#filemanager');
};