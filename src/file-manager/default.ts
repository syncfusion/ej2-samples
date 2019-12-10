import { loadCultureFiles } from '../common/culture-loader';
import { FileManager, Toolbar, NavigationPane, DetailsView, ContextMenu } from '@syncfusion/ej2-filemanager';
import { CheckBox } from '@syncfusion/ej2-buttons';

FileManager.Inject(Toolbar, NavigationPane, DetailsView, ContextMenu);

/**
 * File Manager API sample
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
        navigationPaneSettings: { visible: false },
        view: 'LargeIcons'
    });
    fileObject.appendTo('#file');

    let toggleCheckbox: CheckBox = new CheckBox({ checked: true, change: onChange });
    toggleCheckbox.appendTo('#toolbar_checkbox');


    function onChange(args: any): void {
        fileObject.toolbarSettings.visible = args.checked;
    }

};