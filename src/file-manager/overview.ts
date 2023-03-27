import { loadCultureFiles } from '../common/culture-loader';
import { FileManager, Toolbar, NavigationPane, DetailsView, ContextMenu } from '@syncfusion/ej2-filemanager';

FileManager.Inject(Toolbar, NavigationPane, DetailsView, ContextMenu);

/**
 * File Manager full functionalities sample
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
        toolbarSettings: { items: ['NewFolder', 'SortBy', 'Cut', 'Copy', 'Paste', 'Delete', 'Refresh', 'Download', 'Rename', 'Selection', 'View', 'Details'] },
        contextMenuSettings: {
                layout: ["SortBy", "View", "Refresh", "|", "Paste", "|", "NewFolder", "|", "Details", "|", "SelectAll"],
                visible: true
        },
        view: 'Details',
        detailsViewSettings: {
            columns: [
                {
                    field: 'name', headerText: 'Name', customAttributes: { class: 'e-fe-grid-name' }
                },
                {
                    field: '_fm_modified', headerText: 'DateModified', format: 'MM/dd/yyyy hh:mm a'
                },
                {
                    field: 'size', headerText: 'Size', template: '<span class="e-fe-size">${size}</span>', format: 'n2'
                }
            ]
        }
    });
    fileObject.appendTo('#filemanager');
};