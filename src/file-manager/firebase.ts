import { loadCultureFiles } from '../common/culture-loader';
import { FileManager, Toolbar, NavigationPane, DetailsView, ContextMenu } from '@syncfusion/ej2-filemanager';

FileManager.Inject(Toolbar, NavigationPane, DetailsView, ContextMenu);

/**
 * File Manager sample with firebase realtime database service
 */
(window as any).default = (): void => {
    loadCultureFiles();
    let hostUrl: string = 'https://realtime-firebase.azurewebsites.net/';
    let fileObject: FileManager = new FileManager({
        ajaxSettings: {
            url: hostUrl + 'api/FirebaseProvider/FirebaseRealtimeFileOperations',
            getImageUrl: hostUrl + 'api/FirebaseProvider/FirebaseRealtimeGetImage',
            uploadUrl: hostUrl + 'api/FirebaseProvider/FirebaseRealtimeUpload',
            downloadUrl: hostUrl + 'api/FirebaseProvider/FirebaseRealtimeDownload'
        },
        toolbarSettings: { items: ['NewFolder', 'SortBy', 'Cut', 'Copy', 'Paste', 'Delete', 'Refresh', 'Download', 'Rename', 'Selection', 'View', 'Details'] },
        contextMenuSettings: {
                layout: ["SortBy", "View", "Refresh", "|", "Paste", "|", "NewFolder", "|", "Details", "|", "SelectAll"],
                visible: true
               }
    });
    fileObject.appendTo('#filemanager');
};