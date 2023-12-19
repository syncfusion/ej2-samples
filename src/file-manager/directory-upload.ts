import { loadCultureFiles } from '../common/culture-loader';
import { FileManager, Toolbar, NavigationPane, DetailsView, ContextMenu } from '@syncfusion/ej2-filemanager';
import { DropDownButton, ItemModel } from '@syncfusion/ej2-splitbuttons';
FileManager.Inject(Toolbar, NavigationPane, DetailsView, ContextMenu);

/**
 * File Manager folder upload sample
 */
(window as any).default = (): void => {
    loadCultureFiles();
    var buttonTemplate = '<button id="dropButton" class="e-tbar-btn e-tbtn-txt"> <span class="e-tbar-btn-text">Upload</span> </button>';
    let hostUrl: string = 'https://ej2-aspcore-service.azurewebsites.net/';
    let fileObject: FileManager = new FileManager({
        ajaxSettings: {
            url: hostUrl + 'api/FileManager/FileOperations',
            getImageUrl: hostUrl + 'api/FileManager/GetImage',
            uploadUrl: hostUrl + 'api/FileManager/Upload',
            downloadUrl: hostUrl + 'api/FileManager/Download'
        },
        toolbarItems: [{ name: 'NewFolder' },
            { template: buttonTemplate, name: 'Upload' },
            { name: 'SortBy' },
            { name: 'Refresh' },
            { name: 'Cut' },
            { name: 'Copy' },
            { name: 'Paste' },
            { name: 'Delete' },
            { name: 'Download' },
            { name: 'Rename' },
            { name: 'Selection' },
            { name: 'View' },
            { name: 'Details' }],
            success: onSuccess
    });
    fileObject.appendTo('#file');
    function onSuccess() {
        if (!document.getElementById('dropButton').classList.contains('e-dropdown-btn')) {
            let items: ItemModel[] = [{ text: 'Folder' }, { text: 'Files' }];
            let drpDownBtn: DropDownButton = new DropDownButton({
                    items: items,
                    iconCss: 'e-icons e-fe-upload',
                    select: (args) => {
                        if (args.item.text === 'Folder') {
                            fileObject.uploadSettings.directoryUpload = true;
                        } else {
                            fileObject.uploadSettings.directoryUpload = false;
                        }
                        setTimeout(function () {
                            let uploadBtn: HTMLElement = document.querySelector('.e-file-select-wrap button');
                            uploadBtn.click();
                        }, 100);
                    }
            },'#dropButton');
            document.getElementById('dropButton').onclick = function (args) {
            args.stopPropagation();
        };
    }
    }
};
