import { loadCultureFiles } from '../common/culture-loader';
import { Uploader } from '@syncfusion/ej2-inputs';
import { Dialog } from '@syncfusion/ej2-popups';
import { FileManager, FileOpenEventArgs, Toolbar, NavigationPane, DetailsView } from '@syncfusion/ej2-filemanager';
import { Button } from '@syncfusion/ej2-buttons';

FileManager.Inject(Toolbar, NavigationPane, DetailsView);

/**
 * File Manager real time use case sample
 */

(window as any).default = (): void => {
    loadCultureFiles();

    // Initialize the Uploader component
    let uploadObject: Uploader = new Uploader();
    uploadObject.appendTo('#fileupload');

    // Initialize the Button component
    let btnObj: Button = new Button();
    btnObj.appendTo('#openBtn');

    // Initialize the Dialog component
    let dialogObj: Dialog = new Dialog({
        header: 'Select a file',
        showCloseIcon: true,
        closeOnEscape: false,
        width: '850px',
        visible: false,
        target: document.getElementById('target'),
        animationSettings: { effect: 'None' },
        open: dialogOpen,
        close: dialogClose
    });
    dialogObj.appendTo('#dialog');

    let hostUrl: string = 'https://ej2-aspcore-service.azurewebsites.net/';

    // Initialize the FileManager component
    let filemanagerInstance: FileManager = new FileManager({
        ajaxSettings: {
            url: hostUrl + 'api/FileManager/FileOperations',
            getImageUrl: hostUrl + 'api/FileManager/GetImage',
            uploadUrl: hostUrl + 'api/FileManager/Upload',
            downloadUrl: hostUrl + 'api/FileManager/Download'
        },
        allowMultiSelection: false,
        toolbarSettings: {
            items: ['NewFolder', 'Upload', 'Delete', 'Cut', 'Copy', 'Rename', 'SortBy', 'Refresh', 'Selection', 'View', 'Details']
        },
        contextMenuSettings: {
            file: [ "Cut", "Copy", "|", "Delete", "Download", "Rename", "|", "Details"],
            visible: true
        },
        fileOpen : onFileOpen
    });
    filemanagerInstance.appendTo('#filemanager');

    document.getElementById('openBtn').onclick = (): void => {
        dialogObj.show();
        dialogOpen();
        filemanagerInstance.path = '/';
        filemanagerInstance.selectedItems = [];
        filemanagerInstance.refresh();
    };

    // Uploader will be shown, if Dialog is closed
    function dialogClose(): void {
        document.getElementById('container').style.display = 'block';
    }

    // Uploader will be hidden, if Dialog is opened
    function dialogOpen(): void {
        document.getElementById('container').style.display = 'none';
    }

    // File Manager's fileOpen event function
    function onFileOpen(args: FileOpenEventArgs): void {
        let file: any = (args as any).fileDetails;
        if (file.isFile) {
            args.cancel = true;
            if (file.size <= 0 ) { file.size = 10000; }
            uploadObject.files = [{name: file.name, size: file.size, type: file.type }];
            dialogObj.hide();
        }
    }
};