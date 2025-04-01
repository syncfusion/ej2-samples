import { loadCultureFiles } from '../common/culture-loader';
import { FileManager, Toolbar, NavigationPane, DetailsView, ContextMenu } from '@syncfusion/ej2-filemanager';
import { CheckBox } from '@syncfusion/ej2-buttons';
import { DropDownList } from '@syncfusion/ej2-dropdowns';

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
        toolbarSettings: { items: ['NewFolder', 'SortBy', 'Cut', 'Copy', 'Paste', 'Delete', 'Refresh', 'Download', 'Rename', 'Selection', 'View', 'Details'] },
        contextMenuSettings: {
            file: [ "Cut", "Copy", "|", "Delete", "Download", "Rename", "|", "Details"],
            layout: ["SortBy", "View", "Refresh", "|", "Paste", "|", "NewFolder", "|", "Details", "|", "SelectAll"],
            visible: true
        },
        navigationPaneSettings: { visible: false },
        view: 'LargeIcons',
        enableRangeSelection: true
    });
    fileObject.appendTo('#file');


    let rangeSelectionObj  : CheckBox = new CheckBox({ checked: true, change: onToolbarChange });
    rangeSelectionObj .appendTo('#rangeSelection');
    let checkBoxObj : CheckBox = new CheckBox({ checked: true, change: onToolbarChange });
    checkBoxObj.appendTo('#toolbar');
    let fileExtendObj : CheckBox = new CheckBox({ checked: true, change: onToolbarChange });
    fileExtendObj.appendTo('#fileExtension');
    let thumbnailObj : CheckBox= new CheckBox({ checked: true, change: onToolbarChange });
    thumbnailObj.appendTo('#thumbnail');
    let enableItems = ['NewFolder', 'Cut', 'Copy', 'Paste', 'Download', 'Delete', 'Refresh', 'Selection', 'View', 'Details'];
    let enableObj : DropDownList= new DropDownList({ dataSource: enableItems, placeholder: "Select item" ,change: onEnableItemChange });
    enableObj.appendTo('#enable');
    let disableItems = ['NewFolder', 'Cut', 'Copy', 'Paste', 'Download', 'Delete', 'Refresh', 'Selection', 'View', 'Details'];
    let disableObj : DropDownList = new DropDownList({ dataSource: disableItems, placeholder: "Select item", change: onDisableItemChange });
    disableObj.appendTo('#disable');

    function onToolbarChange(args: any): void {
        if (this.element.id == "toolbar") {
            fileObject.toolbarSettings.visible = args.checked;
        }
        if (this.element.id == "fileExtension") {
            fileObject.showFileExtension = args.checked;
        }
        if (this.element.id == "thumbnail") {
            fileObject.showThumbnail = args.checked;
        }
        if (this.element.id == "rangeSelection") {
            fileObject.enableRangeSelection = args.checked;
        }
    }

    function onDisableItemChange(args: any): void {
        if (args.itemData != null){
            fileObject.disableToolbarItems([args.itemData.value]);
            if(args.value === enableObj.value){
                enableObj.value = null;
            }
        }
    }
    
    function onEnableItemChange(args: any): void {
        if (args.itemData != null){
            fileObject.enableToolbarItems([args.itemData.value]);
            if(args.value === disableObj.value){
                disableObj.value = null;
            }
        }
    }
};
