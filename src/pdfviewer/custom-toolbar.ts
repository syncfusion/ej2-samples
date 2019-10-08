import { loadCultureFiles } from '../common/culture-loader';
import {
    PdfViewer, Toolbar, Magnification, Navigation, LinkAnnotation, BookmarkView, ThumbnailView, Print,
    PageChangeEventArgs, LoadEventArgs, TextSearch, TextSelection
} from '@syncfusion/ej2-pdfviewer';
import { Toolbar as Tool, TreeView, NodeSelectEventArgs } from '@syncfusion/ej2-navigations';
import { ClickEventArgs, Button, CheckBox, ChangeEventArgs } from '@syncfusion/ej2-buttons';
import { Dialog } from '@syncfusion/ej2-popups';

PdfViewer.Inject(Toolbar, Magnification, Navigation, LinkAnnotation, BookmarkView, ThumbnailView, Print, TextSearch, TextSelection);

/**
 * Default PdfViewer sample
 */

let inputTemplate: string = '<div class=""><input type="text" class="e-input-group e-pv-current-page-number" id="currentPage" /></div>';
let ele: string = '<div class=""><span class="e-pv-total-page-number" id="totalPage">of 0</span></div>';
let isBookmarkOpen: boolean = false;
let isBookmarkClick: boolean = false;
let isBookmarkView: boolean = false;
let isTextSearchBoxOpen: boolean = false;
let bookmarkPopup: Dialog;
let textSearchPopup: Dialog;
let toolbarObj: Tool;
let viewer: PdfViewer;
let currentPageBox: HTMLElement;
let searchInput: HTMLElement;
let searchButton: HTMLElement;
let matchCase: boolean = false;
let treeObj: TreeView;

function previousClicked(args: ClickEventArgs): void {
    hidePopups();
    viewer.navigation.goToPreviousPage();
}

function hidePopups(): void {
    isBookmarkOpen = false;
    isTextSearchBoxOpen = false;
    bookmarkPopup.hide();
    textSearchPopup.hide();
}

function bookmarkClicked(): void {
    textSearchPopup.hide();
    if (!isBookmarkOpen) {
        let bookmarkDetails: any = viewer.bookmark.getBookmarks();
        if (bookmarkDetails.bookmarks) {
            if (!isBookmarkView) {
                let bookmarks: any = bookmarkDetails.bookmarks.bookMark;
                treeObj = new TreeView({
                    fields:
                    {
                        dataSource: bookmarks,
                        id: 'Id',
                        child: 'Child',
                        text: 'Title',
                        hasChildren: 'HasChild',
                    }, nodeSelected: nodeClick
                });
                isBookmarkView = true;
                treeObj.appendTo('#bookmarkview');
                // tslint:disable-next-line:max-line-length
                ['mouseover', 'keydown'].forEach( (evt: string) => document.getElementById('bookmarkview').addEventListener(evt, (event: Event) => {
                    setHeight(event.target); }));
            }
            bookmarkPopup.show();
            isBookmarkOpen = true;
            isBookmarkClick = true;
        } else {
            toolbarObj.enableItems(document.getElementById('bookmarkButton'), false);
            isBookmarkOpen = false;
        }
    } else {
        if (!isBookmarkClick) {
            bookmarkPopup.show();
            isBookmarkClick = true;
        } else {
            bookmarkPopup.hide();
            isBookmarkClick = false;
        }
    }
}

function nextClicked(args: ClickEventArgs): void {
    hidePopups();
    viewer.navigation.goToNextPage();
}

function searchClicked(args: ClickEventArgs): void {
    bookmarkPopup.hide();
    if (!isTextSearchBoxOpen) {
        textSearchPopup.show();
    } else {
        viewer.textSearch.cancelTextSearch();
        textSearchPopup.hide();
    }
    isTextSearchBoxOpen = !isTextSearchBoxOpen;
}

function printClicked(args: ClickEventArgs): void {
    hidePopups();
    viewer.print.print();
}

function downloadClicked(args: ClickEventArgs): void {
    hidePopups();
    viewer.download();
}

function pageFitClicked(args: ClickEventArgs): void {
    hidePopups();
    viewer.magnification.fitToPage();
    updateZoomButtons();
    toolbarObj.enableItems(document.getElementById('fitPage'), false);
}

function zoomInClicked(args: ClickEventArgs): void {
    hidePopups();
    viewer.magnification.zoomIn();
    updateZoomButtons();
}

function zoomOutClicked(args: ClickEventArgs): void {
    hidePopups();
    viewer.magnification.zoomOut();
    updateZoomButtons();
}

function onCurrentPageBoxKeypress(event: KeyboardEvent): boolean {
    if ((event.which < 48 || event.which > 57) && event.which !== 8 && event.which !== 13) {
        event.preventDefault();
        return false;
    } else {
        // tslint:disable-next-line:radix
        let currentPageNumber: number = parseInt((currentPageBox as HTMLInputElement).value);
        if (event.which === 13) {
            if (currentPageNumber > 0 && currentPageNumber <= viewer.pageCount) {
                viewer.navigation.goToPage(currentPageNumber);
            } else {
                (currentPageBox as HTMLInputElement).value = viewer.currentPageNumber.toString();
            }
        }
        return true;
    }
}

function onCurrentPageBoxClicked(): void {
    (currentPageBox as HTMLInputElement).select();
    (currentPageBox).focus();
}

function  readFile(args:  any):  void  {
    // tslint:disable-next-line
    let  upoadedFiles:  any  =  args.target.files;
    if  (args.target.files[0]  !==  null) {
        let  uploadedFile:  File  =  upoadedFiles[0];
        if  (uploadedFile) {
            let  reader:  FileReader  =  new  FileReader();
            let filename: string = upoadedFiles[0].name;
            reader.readAsDataURL(uploadedFile);
            // tslint:disable-next-line
            reader.onload  =  (e:  any):  void  =>  {
                let  uploadedFileUrl:  string  =  e.currentTarget.result;
                viewer.load(uploadedFileUrl,  null);
                viewer.fileName = filename;
                (currentPageBox as HTMLInputElement).value = '1';
                document.getElementById('totalPage').textContent = 'of ' + viewer.pageCount;
                document.getElementById('bookmarkview').innerHTML = '';
                isBookmarkOpen = false;
                isBookmarkView = false;
            };
        }
    }
}

function  openDocument(e:  ClickEventArgs):  void  {
    document.getElementById('fileUpload').click();
}

function updatePageNavigation(): void {
    if (viewer.currentPageNumber === 1) {
        toolbarObj.enableItems(document.getElementById('previousPage'), false);
        toolbarObj.enableItems(document.getElementById('nextPage'), true);
    } else if (viewer.currentPageNumber === viewer.pageCount) {
        toolbarObj.enableItems(document.getElementById('previousPage'), true);
        toolbarObj.enableItems(document.getElementById('nextPage'), false);
    } else {
        toolbarObj.enableItems(document.getElementById('previousPage'), true);
        toolbarObj.enableItems(document.getElementById('nextPage'), true);
    }
}

function updateZoomButtons(): void {
    if (viewer.zoomPercentage <= 50) {
        toolbarObj.enableItems(document.getElementById('zoomIn'), true);
        toolbarObj.enableItems(document.getElementById('zoomOut'), false);
        toolbarObj.enableItems(document.getElementById('fitPage'), true);
    } else if (viewer.zoomPercentage >= 400) {
        toolbarObj.enableItems(document.getElementById('zoomIn'), false);
        toolbarObj.enableItems(document.getElementById('zoomOut'), true);
        toolbarObj.enableItems(document.getElementById('fitPage'), true);
    } else {
        toolbarObj.enableItems(document.getElementById('zoomIn'), true);
        toolbarObj.enableItems(document.getElementById('zoomOut'), true);
        toolbarObj.enableItems(document.getElementById('fitPage'), true);
    }
}

function nodeClick(args: NodeSelectEventArgs): boolean {
    let bookmarksDetails: any = viewer.bookmark.getBookmarks();
    setHeight(args.node);
    let bookmarksDestination: any = bookmarksDetails.bookmarksDestination;
    let bookid: number = Number(args.nodeData.id);
    let pageIndex: number = bookmarksDestination.bookMarkDestination[bookid].PageIndex;
    let Y: number = bookmarksDestination.bookMarkDestination[bookid].Y;
    viewer.bookmark.goToBookmark(pageIndex, Y);
    return false;
}

// tslint:disable-next-line
function setHeight(element:any): void {
    if (treeObj.fullRowSelect) {
        if (element.classList.contains('e-treeview')) {
          element = element.querySelector('.e-node-focus').querySelector('.e-fullrow');
        } else if (element.classList.contains('e-list-parent')) {
          element = element.querySelector('.e-fullrow');
        } else if (element.classList.value !== ('e-fullrow') && element.closest('.e-list-item')) {
          element = element.closest('.e-list-item').querySelector('.e-fullrow');
        }
        if (element.nextElementSibling) {
          element.style.height = element.nextElementSibling.offsetHeight + 'px';
        }
    }
}

function searchInputKeypressed(event: KeyboardEvent): void {
    enablePrevButton(true);
    enableNextButton(true);
    if (event.which === 13) {
        initiateTextSearch();
        updateSearchInputIcon(false);
    }
}

function searchClickHandler(): void {
    if (searchButton.classList.contains('e-pv-search-icon')) {
        viewer.textSearch.cancelTextSearch();
        initiateTextSearch();
    } else if (searchButton.classList.contains('e-pv-search-close')) {
        (searchInput as HTMLInputElement).value = '';
        searchInput.focus();
        viewer.textSearch.cancelTextSearch();
    }
}

function initiateTextSearch(): void {
    let searchString: string = (searchInput as HTMLInputElement).value;
    viewer.textSearch.searchText(searchString, matchCase);
}

function previousSearchClicked(): void {
    let searchString: string = (searchInput as HTMLInputElement).value;
    if (searchString) {
        viewer.textSearch.searchPrevious();
    }
}

function nextSearchClicked(): void {
    let searchString: string = (searchInput as HTMLInputElement).value;
    if (searchString) {
        viewer.textSearch.searchNext();
    }
}

function checkBoxChanged(args: ChangeEventArgs): void {
    if (args.checked) {
        matchCase = true;
    } else {
        matchCase = false;
    }
    initiateTextSearch();
}

function enablePrevButton(isEnable: boolean): void {
    let previousSearchButton: HTMLElement = document.getElementById('previousSearch');
    if (isEnable) {
        previousSearchButton.removeAttribute('disabled');
    } else {
        (previousSearchButton as HTMLButtonElement).disabled = true;
    }
}

function enableNextButton(isEnable: boolean): void {
    let nextSearchButton: HTMLElement = document.getElementById('nextSearch');
    if (isEnable) {
        nextSearchButton.removeAttribute('disabled');
    } else {
        (nextSearchButton as HTMLButtonElement).disabled = true;
    }
}

function updateSearchInputIcon(isEnable: boolean): void {
    if (isEnable) {
        searchButton.classList.remove('e-pv-search-close');
        searchButton.classList.add('e-pv-search-icon');
    } else {
        searchButton.classList.remove('e-pv-search-icon');
        searchButton.classList.add('e-pv-search-close');
    }
}

(window as any).default = (): void => {
    loadCultureFiles();
    toolbarObj = new Tool({
        items: [
            { prefixIcon: 'e-pv-open-document', tooltipText: 'Open', id: 'openButton', click: openDocument.bind(this) },
            { prefixIcon: 'e-pv-bookmark-icon', tooltipText: 'Bookmark', id: 'bookmarkButton', click: bookmarkClicked },
            // tslint:disable-next-line:max-line-length
            { prefixIcon: 'e-pv-previous-page-navigation-icon', id: 'previousPage', tooltipText: 'Previous Page', align: 'Center', click: previousClicked.bind(this) },
            // tslint:disable-next-line:max-line-length
            { prefixIcon: 'e-pv-next-page-navigation-icon', id: 'nextPage', tooltipText: 'Next Page', align: 'Center', click: nextClicked.bind(this) },
            { template: inputTemplate, tooltipText: 'Page Number', align: 'Center' },
            { template: ele, tooltipText: 'Page Number', align: 'Center' },
            { prefixIcon: 'e-pv-search-icon', tooltipText: 'Text Search', align: 'Right', click: searchClicked.bind(this) },
            { prefixIcon: 'e-pv-print-document-icon', tooltipText: 'Print', align: 'Right', click: printClicked.bind(this) },
            { prefixIcon: 'e-pv-download-document-icon', tooltipText: 'Download', align: 'Right', click: downloadClicked.bind(this) }
        ]
    });
    toolbarObj.appendTo('#topToolbar');
    let magnificationToolbar: Tool = new Tool({
        items: [
            { prefixIcon: 'e-pv-fit-page-icon', id: 'fitPage', tooltipText: 'Fit to page', click: pageFitClicked.bind(this) },
            { prefixIcon: 'e-pv-zoom-in-icon', id: 'zoomIn', tooltipText: 'Zoom in', click: zoomInClicked.bind(this) },
            { prefixIcon: 'e-pv-zoom-out-icon', id: 'zoomOut', tooltipText: 'Zoom out', click: zoomOutClicked.bind(this) },
        ]
    });
    magnificationToolbar.appendTo('#magnificationToolbar');
    viewer = new PdfViewer({
        enableToolbar: false,
        enableNavigationToolbar: false,
        enableThumbnail: false,
        documentPath: 'Hive_Succinctly.pdf',
        serviceUrl: 'https://ej2services.syncfusion.com/production/web-services/api/pdfviewer'
    });
    viewer.appendTo('#pdfViewer');
    isBookmarkView = false;
    document.getElementById('fileUpload').addEventListener('change', readFile, false);
    currentPageBox = document.getElementById('currentPage');
    (currentPageBox as HTMLInputElement).value = '1';
    searchInput = document.getElementById('searchInput');
    bookmarkPopup = new Dialog({
        showCloseIcon: true, header: 'Bookmarks', closeOnEscape: false, isModal: false, target: document.getElementById('pdfViewer'),
        content: '<div class="e-pv-bookmarks" id="bookmarkview"></div>',
        buttons: [{
            buttonModel: {},
        }], position: { X: 'left', Y: 'top' }, cssClass: 'e-bookmark-popup', beforeClose: (): void => {
            isBookmarkOpen = false;
         }
    });
    bookmarkPopup.appendTo('#popup');

    textSearchPopup = new Dialog({
        showCloseIcon: false, closeOnEscape: false, isModal: false, target: document.getElementById('pdfViewer'),
        buttons: [{
            buttonModel: {},
        }], position: { X: 'right', Y: 'top' }, cssClass: 'e-text-search-popup',
    });
    textSearchPopup.appendTo('#textSearchBox');

    let previousSearch: Button = new Button({ iconCss: 'e-pv-previous-search' });
    previousSearch.appendTo('#previousSearch');

    let nextSearch: Button = new Button({ iconCss: 'e-pv-next-search-btn' });
    nextSearch.appendTo('#nextSearch');

    let matchCaseCheck: CheckBox = new CheckBox({ label: 'Match case', change: checkBoxChanged });
    matchCaseCheck.appendTo('#matchCase');

    viewer.pageChange = (args: PageChangeEventArgs): void => {
        (currentPageBox as HTMLInputElement).value = viewer.currentPageNumber.toString();
        updatePageNavigation();
    };

    viewer.documentLoad = (args: LoadEventArgs): void => {
        document.getElementById('totalPage').textContent = 'of ' + viewer.pageCount;
        updatePageNavigation();
    };

    searchButton = document.getElementById('searchBtn');
    searchInput.addEventListener('focus', () => { searchInput.parentElement.classList.add('e-input-focus'); });
    searchInput.addEventListener('blur', () => { searchInput.parentElement.classList.remove('e-input-focus'); });
    searchInput.addEventListener('keypress', searchInputKeypressed);
    document.getElementById('previousSearch').addEventListener('click', previousSearchClicked);
    document.getElementById('nextSearch').addEventListener('click', nextSearchClicked);
    currentPageBox.addEventListener('keypress', onCurrentPageBoxKeypress);
    currentPageBox.addEventListener('click', onCurrentPageBoxClicked);
    searchButton.addEventListener('click', searchClickHandler);
    bookmarkPopup.hide();
    textSearchPopup.hide();
    enableNextButton(false);
    enablePrevButton(false);
};
