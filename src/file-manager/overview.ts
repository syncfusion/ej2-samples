import { loadCultureFiles } from '../common/culture-loader';
import { FileManager, Toolbar, NavigationPane, DetailsView, ContextMenu } from '@syncfusion/ej2-filemanager';
import { TreeView, Sidebar } from '@syncfusion/ej2-navigations';
import { Button } from '@syncfusion/ej2-buttons';
import { Dialog } from '@syncfusion/ej2-popups';
FileManager.Inject(Toolbar, NavigationPane, DetailsView, ContextMenu);

/**
 * File Manager full functionalities sample
 */
(window as any).default = (): void => {
    loadCultureFiles();
    let hostUrl: string = 'https://ej2-aspcore-service.azurewebsites.net/';
    let favoriteFiles: any = {};
    let selectedItems: string[] = [];
    let isFavoriteAjax: boolean = false;
    let itemsCount: number = 0;
    let treeSelectedNodes: string[] = [];
    let fileObject: FileManager = new FileManager({
        ajaxSettings: {
            url: hostUrl + 'api/Overview/FileOperations',
            getImageUrl: hostUrl + 'api/Overview/GetImage',
            uploadUrl: hostUrl + 'api/Overview/Upload',
            downloadUrl: hostUrl + 'api/Overview/Download'
        },
        view: 'Details',
        toolbarItems: [
            { name: '', prefixIcon:'e-menu filemanagermenu', tooltipText: 'Toggele Menu'},
            { name: 'NewFolder' }, 
            { name: 'SortBy' },
            { name: 'Refresh' },
            { name: 'Cut' },
            { name: 'Copy' },
            { name: 'Paste' },
            { name: 'Selection' },
            { name: 'View' },
            { name: '', align: 'Right' , prefixIcon: 'e-show-hide-panel', tooltipText: 'Preview Pane' },
        ],
        contextMenuSettings: { 
            file: [ 'Cut', 'Copy', '|', 'Details'],
            folder: [ 'Cut', 'Copy', 'Paste', '|', 'Details'],
            layout: ['SortBy', 'View', 'Refresh', '|', 'Paste', '|', 'NewFolder', '|', 'Details', '|', 'SelectAll'],
        },
        detailsViewSettings: {
            columns: [
                {
                    field: 'name', headerText: 'Name',  width:'220px', maxWidth: '230px',
                    template: function(data: any) {
                        var isFavorite = favoriteFiles[data.name] ? 'filled' : '';
                        var title = isFavorite ? 'Unfavorite' : 'Favorite';
                        return '<div class="fmNameColumn">' + '<span>' + data.name + '</span>'  +'<div class="custom-icons">' +
                            '<span class="e-icons e-delete" data-action="delete" title="Delete"></span>' +
                            '<span class="e-icons e-download" data-action="download" title="Download"></span>' +
                            '<span class="e-icons e-star-filled favorite-icon ' + isFavorite + '" data-action="favorite" title="' + title + '"></span>' +
                        '</div>'+ '</div>';}, customAttributes: { class: 'e-fe-grid-name' },                  
                },
                {
                    field: '_fm_modified', headerText: 'DateModified', format: 'MM/dd/yyyy hh:mm a'
                },
                {
                    field: 'size', headerText: 'Size', template: '<span class="e-fe-size">${size}</span>', format: 'n2'
                }
            ]
        },
        navigationPaneSettings: { visible: false },
        fileLoad: onFileLoad,
        fileSelect: onFileSelect,
        beforeSend: onBeforeSend,
        toolbarClick: onToolbarClick,
        toolbarCreate: onToolbarCreate,
        success:onSuccess,
    });
    fileObject.appendTo('#filemanager');

    let mobileTreeData: any = [
        { name: 'File Manager', id: 0, iconCss: 'e-icons e-menu'},
        { name: 'Drive', id: 1, iconCss: 'e-icons e-folder', },
        { name: 'Documents', id: 2, iconCss: 'e-icons e-file-document', },
        { name: 'Downloads', id: 3,  iconCss: 'e-icons e-download', },
        { name: 'Videos', id: 4, iconCss: 'e-icons e-video', },
        { name: 'Local Disk (C)', id: 5, iconCss: 'e-icons e-folder', },
        { name: 'Local Disk (D)', id: 6, iconCss: 'e-icons e-folder', },
    ];
    let treeData: any = [
        { id: 0, name: 'File Manager', iconCss: 'e-icons e-menu'},
        { id: 1, name: 'Drive', iconCss: 'e-icons e-folder', },
        { id: 2, name: 'Recent', iconCss: 'e-icons e-clock', },
        { id: 3, name: 'Favorite', iconCss: 'e-icons e-star-filled', },
        { id: 4, name: 'Documents', iconCss: 'e-icons e-file-document', },
        { id: 5, name: 'Downloads', iconCss: 'e-icons e-download', },
        { id: 6, name: 'Videos', iconCss: 'e-icons e-video', },
        { id: 7, name: 'Local Disk (C)', iconCss: 'e-icons e-folder', },
        { id: 8, name: 'Local Disk (D)', iconCss: 'e-icons e-folder', },
    ];
    let treeObj: TreeView = new TreeView({
        fields: { dataSource: treeData, id: 'id', text: 'name', iconCss: "iconCss" },
        nodeSelected: onNodeSelected,
        nodeClicked: onNodeClicked,
        selectedNodes: ['1']
    });
    treeObj.appendTo('#tree');

    let leftSideObj: Sidebar = new Sidebar({
        target: '.mainLayout-content',      
        position: 'Left',
        enableGestures: false,
        open: function(args) { 
            let ele = args.element.classList.contains('e-over'); 
            if (ele) { 
                treeObj.fields.dataSource = mobileTreeData;
            }
            treeObj.dataBind();
        },
        mediaQuery:'(min-width: 700px)'
    });
    leftSideObj.appendTo("#default_left_sidebar");

    let rightSideObj: Sidebar = new Sidebar({
        enableGestures: false,
        target: '.mainLayout-content',       
        position: 'Right',
        mediaQuery:'(min-width: 700px)'
    });
    rightSideObj.appendTo("#default_right_sidebar");

    let dlgObj: Dialog = new Dialog({
        header: 'Confirm delete',
        content: "Are you sure you want to delete this file?",
        target: document.getElementById('filemanager')!,
        showCloseIcon: true,
        visible: false,
        isModal: true,
        buttons: [
            {
                click: deleteConfirmationButton,
                buttonModel: { content: 'Yes', isPrimary: true }
            },
            {
                click: dialogCloseButton,
                buttonModel: { content: 'No' }
            }],
    });
    dlgObj.appendTo('#deleteDialog');

    function dialogCloseButton(): void {
        dlgObj.hide();
    }
    function deleteConfirmationButton(): void {
        fileObject.deleteFiles(selectedItems);
        dlgObj.hide();
    }

    function onBeforeSend(args: any): void {
        if (args.action == "read" && isFavorite && treeObj.selectedNodes[0] == '3') {
            treeObj.selectedNodes = ['1'];
            isFavoriteAjax = true;
        }
    }

    function onSuccess(args: any) {
        if (args.action == "read" || isFavorite) {
            itemsCount = args.result.files.length;
            viewPanedetails(fileObject.selectedItems);
        }

    }

    function displayBreadcrumb(value: string): void {
        let breadcrumb: any = (document.getElementById('filemanager_breadcrumbbar') as any).ej2_instances[0].element;
        if (value === 'Favorite') {
            breadcrumb.classList.add('fmFavoriteBreadcrumb');
        }
        else {
            breadcrumb.classList.remove('fmFavoriteBreadcrumb');
        }
        fileObject.refreshLayout();
    }

    let isFavorite: boolean = false;

    function filemanagerFilterFiles(favoritesString: any): void {
        fileObject.path = '/';
        // Create the object with the search string
        let objectValue: { searchString: string; } = { searchString: '*' + favoritesString + '*' };
        // Call the filterFiles method with the object
        fileObject.filterFiles(objectValue);
    }

    function onNodeSelected(args: any): void {
        isFavorite = false;
        if (!(args.nodeData.id === "0")) {
            treeSelectedNodes = treeObj.selectedNodes;
        }
        switch (args.nodeData.text) {
            case 'Drive':
                fileObject.sortBy = 'name';
                fileObject.sortOrder = 'Ascending';
                if (isFavoriteAjax) {
                    isFavoriteAjax = false;
                }
                else {
                    fileObject.path = '/';
                }
                break;
                
            case 'Recent':
                fileObject.path = '/Videos/';
                fileObject.sortBy = '_fm_modified';
                fileObject.sortOrder = 'Descending';
                fileObject.path = '/';
                break;
                
            case 'Favorite':
                isFavorite = true;
                let favoritesString: string = Object.keys(favoriteFiles).length > 0? Object.keys(favoriteFiles).join(',') : '';
                if (favoritesString) { 
                    filemanagerFilterFiles(favoritesString);
                }
                if (favoritesString === "" && isFavorite) {
                    filemanagerFilterFiles(" ");
                    setTimeout(function() {        
                        // Remove existing elements under the e-empty class
                        let emptyElement: any = (document.getElementById('filemanager_grid') as any).ej2_instances[0].element.querySelector('.e-empty');
                        if (emptyElement) {
                            emptyElement.querySelector('.e-empty-inner-content').innerHTML = 'Items you favorite will show up here';
                        }
                    }, 750);
                }
                break;
                
            case 'Documents':
            case 'Downloads':
            case 'Videos':
            case 'Local Disk (C)':
            case 'Local Disk (D)':
                fileObject.path = '/' + args.nodeData.text + '/';
                fileObject.sortBy = 'name';
                fileObject.sortOrder = 'Ascending';
                break;
        }
        displayBreadcrumb(args.nodeData.text);
    }

    function onNodeClicked(args: any): void {
        let node: any = treeObj.getNode(args.node);
        if (node.text === 'File Manager') {
            leftSideObj.toggle();
            let toolbarObj: any = (document.getElementById('filemanager_toolbar') as any).ej2_instances[0];
            toolbarObj.hideItem(0, false);
            treeObj.selectedNodes = treeSelectedNodes;
        }            
    }

    function removeFileExtension(filename: string): string {
        return filename.replace(/\.[^/.]+$/, ""); // Remove the extension from the filename
    }

    function formatFileType(fileType:string): string {
        if (fileType.startsWith('.')) {
            fileType = fileType.substring(1); // Remove the leading dot
        }
        return fileType;
    }

    function formatDate(dateString: any): any {
        let date = new Date(dateString);
        // Use Intl.DateTimeFormat for formatting
        let formattedDate = new Intl.DateTimeFormat(fileObject.locale, {
            month: 'short',
            day: '2-digit',
            year: 'numeric'
        }).format(date);
    
        return formattedDate;
    }

    (document.getElementById('close-btn') as any).onclick = function() {
        rightSideObj.toggle();
    };

    function getLastFolderName(path: any) {
        path = path.replace(/\/$/, "");
        let parts = path.split('/');
        return parts[parts.length - 1];
    }

    function viewPanedetails(selectedItems: any) {
        let fileManagerContainer = (document.querySelector('.filemanager-container') as any);
        let sizeElement = (document.getElementById('fmSize') as any).parentElement;
        let locationElement = (document.getElementById('fmLocation') as any).parentElement;
        let singleSelectionPane = (document.getElementById('single-selection-pane') as any);
        let multipleSelectionPane = (document.getElementById('multiple-selection-pane') as any);
        let noSelectionPane = (document.getElementById('no-selection-pane') as any);

        // Reset panes display
        singleSelectionPane.style.display = 'none';
        multipleSelectionPane.style.display = 'none';
        noSelectionPane.style.display = 'none';

        if (selectedItems && fileObject.selectedItems.length > 1) {
            fileManagerContainer.style.margin = '0px 10px 0px 5px';
            multipleSelectionPane.style.display = 'block';
            (document.getElementById('selected-count') as any).innerHTML = fileObject.selectedItems.length + ' items selected';
        } 
        else if (selectedItems && fileObject.selectedItems.length === 1) {
            fileManagerContainer.style.margin = '0px 5px';
            singleSelectionPane.style.display = 'block';

            let isFile = selectedItems.isFile;
            (document.getElementById('fileType') as any).innerHTML = isFile ? 'File' : 'Folder';
            (document.getElementById('fm-file-name') as any).value = selectedItems.name;
            (document.getElementById('tag-name1') as any).innerHTML = removeFileExtension(selectedItems.name);
            (document.getElementById('tag-name2') as any).innerHTML = isFile ? formatFileType(selectedItems.type) : 'Folder';
            (document.getElementById('fmType') as any).innerHTML = isFile ? 'File' : 'Folder';
            (document.getElementById('fmSize') as any).innerHTML = (selectedItems.size / 1024).toFixed(2) + ' KB';
            (document.getElementById('fmLocation') as any).innerHTML = fileObject.path;
            (document.getElementById('fmModified') as any).innerHTML = formatDate(selectedItems.dateModified);

            let imageTypeEle = document.getElementById('imageType');
            let currentClasses = Array.from(imageTypeEle.classList);
            currentClasses.forEach(function(className) {
                if (className !== 'e-filemanager-image') { 
                    imageTypeEle.classList.remove(className);
                }
            });
            let imageTypeValue = selectedItems.isFile ? formatFileType(selectedItems.type) : 'Folder';
            imageTypeEle.classList.add(imageTypeValue.toLowerCase());

            locationElement.style.display = (fileObject.path === '/') ? 'none' : '';
            sizeElement.style.display = (selectedItems.size === 0) ? 'none' : '';
        } 
        else {
            fileManagerContainer.style.margin = '0px 10px 0px 5px';
            noSelectionPane.style.display = 'block';

            let lastFolderName = fileObject.path === '/' ? 'Drive' : getLastFolderName(fileObject.path);
            let currentFolderText = isFavorite ? 'Favorite' + ' ( ' + itemsCount + ' items' + ' )' : lastFolderName + ' ( ' + itemsCount + ' items' + ' )';
            (document.getElementById('current-folder') as any).innerHTML = currentFolderText;
        }
    }

    function onFileLoad() {
        setTimeout(function() {
            let detailsViewElement = (document.getElementById('filemanager_grid') as any).ej2_instances[0].element;
            if (detailsViewElement) {
                detailsViewElement.addEventListener('click', handleIconClick);
            }
        }, 0);
    }

    function onFileSelect() {
        let selectedItem: any = fileObject.getSelectedFiles()[0];
        viewPanedetails(selectedItem);
    }

    function onToolbarClick(args: any) {
        let selectedItem: any = fileObject.getSelectedFiles()[0];
        if (args.item.tooltipText === "Preview Pane") {
            rightSideObj.toggle();
            viewPanedetails(selectedItem);
        }
        else if (args.item.tooltipText === "Toggele Menu") {
            leftSideObj.toggle();
            let toolbarObj: any = (document.getElementById('filemanager_toolbar') as any).ej2_instances[0];
            toolbarObj.hideItem(0, true);
        }
    }

    function onToolbarCreate(args: any) {
        setTimeout(function() {
            if(!fileObject.isMobile) {
                let toolbarObj: any = (document.getElementById('filemanager_toolbar') as any).ej2_instances[0];
                toolbarObj.hideItem(0, true);
            }
        },50);
    }
    
    function handleIconClick(event: any) {
        let target: any = event.target;
        let action: any = target.getAttribute('data-action');
        let fileName: any = getFileNameFromElement(target);
        selectedItems = [fileName];
        switch (action) {
            case 'delete':
                dlgObj.visible = true;
                break;
            case 'download':
                fileObject.downloadFiles(selectedItems);
                break;
            case 'favorite':
                toggleFavorite(target, fileName);
                break;
        }
    }
    
    function getFileNameFromElement(element:any) {
        let trElement: any = element.closest('tr');
        if (trElement) {
            let gridNameElement: any = trElement.querySelector('.e-fe-grid-name');
            if (gridNameElement) {
                let textContent = gridNameElement.textContent;
                if (textContent) {
                    return textContent.trim();
                }
            }
        }
        return null;
    }
    
    function toggleFavorite(iconElement: any, fileName: string): void {
        iconElement.classList.toggle('filled');

        if (iconElement.classList.contains('filled')) {
            favoriteFiles[fileName] = true;
        } 
        else {
            delete favoriteFiles[fileName];
        }
        let favoriteString: string = Object.keys(favoriteFiles).length > 0? Object.keys(favoriteFiles).join(',') : '';
        if (favoriteString && isFavorite) { 
            filemanagerFilterFiles(favoriteString);
        }
        if (favoriteString === "" && isFavorite) {
            filemanagerFilterFiles("  ");
            setTimeout(function() {
                let emptyElements: any = (document.getElementById('filemanager_grid') as any).ej2_instances[0].element.querySelector('.e-empty');
                if (emptyElements) {
                    emptyElements.querySelector('.e-empty-inner-content').innerHTML = 'Items you favorite will show up here';
                }
            }, 750);
        }
    }

    let renameIcon: any = (document.getElementById('rename-icon') as any);
    let tickIcon: any = (document.getElementById('tick-icon') as any);
    let closeIcon: any = (document.getElementById('close-icon') as any);
    let fileNameInput: any = (document.getElementById('fm-file-name') as any);

    renameIcon.addEventListener('click', function() {
        fileNameInput.removeAttribute('readonly');
        fileNameInput.focus();
        tickIcon.style.opacity = '1';
        closeIcon.style.opacity = '1';
    });

    tickIcon.addEventListener('click', function() {
        let selectedItem: any = fileObject.getSelectedFiles()[0];
        if (selectedItem) {
            fileObject.renameFile(selectedItem.name, fileNameInput.value);
        }
        tickIcon.style.opacity = '0';
        closeIcon.style.opacity = '0';
        fileNameInput.setAttribute('readonly', true);
    });

    closeIcon.addEventListener('click', function() {
        fileNameInput.value = '';
        fileNameInput.focus();
    });
};
