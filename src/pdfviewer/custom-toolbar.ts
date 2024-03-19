import { loadCultureFiles } from '../common/culture-loader';
import {
    PdfViewer, Toolbar, Magnification, Navigation, LinkAnnotation, BookmarkView, ThumbnailView, Print,Annotation,FormDesigner, 
     PageOrganizer, FormFields,
    PageChangeEventArgs, LoadEventArgs, TextSearch, TextSelection, SignStampItem, StandardBusinessStampItem, DynamicStampItem,
} from '@syncfusion/ej2-pdfviewer';
import { Toolbar as Tool, TreeView, NodeSelectEventArgs,Menu,MenuItemModel } from '@syncfusion/ej2-navigations';
import { ClickEventArgs, Button, CheckBox, ChangeEventArgs } from '@syncfusion/ej2-buttons';
import { Dialog } from '@syncfusion/ej2-popups';
import { Switch } from '@syncfusion/ej2-buttons';
import { select } from '@syncfusion/ej2-base';

PdfViewer.Inject(Toolbar,Annotation, Magnification, Navigation, LinkAnnotation, BookmarkView, ThumbnailView, Print, TextSearch, TextSelection, FormFields,FormDesigner, PageOrganizer);

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
let isInkEnabled: boolean = false;
let treeObj: TreeView;
const data: MenuItemModel[] = [
  {
        iconCss: 'e-icons e-stamp',
        items: [
            {
                text: 'Dynamic',
                items: [
                    { text: 'Revised', id: 'Dynamic' },
                    { text: 'Reviewed', id: 'Dynamic' },
                    { text: 'Received', id: 'Dynamic' },
                    { text: 'Confidential', id: 'Dynamic' },
                    { text: 'Approved', id: 'Dynamic' },
                    { text: 'Not Approved', id: 'Dynamic' },
                ],
            },
            {
                text: 'Sign Here',
                items: [
                    { text: 'Witness' , id: 'Sign Here' }, 
                    { text: 'Initial Here', id: 'Sign Here' }, 
                    { text: 'Sign Here', id: 'Sign Here' }, 
                    { text: 'Accepted', id: 'Sign Here'}, 
                    { text: 'Rejected', id: 'Sign Here' }],
            },
            {
                text: 'Standard Business',
                items: [
                    { text: 'Approved' , id: 'Standard Business' }, 
                    { text: 'Not Approved', id: 'Standard Business' }, 
                    { text: 'Draft', id: 'Standard Business' }, 
                    { text: 'Final', id: 'Standard Business'}, 
                    { text: 'Completed', id: 'Standard Business' },
                    { text: 'Confidential' , id: 'Standard Business' }, 
                    { text: 'For Public Release', id: 'Standard Business' }, 
                    { text: 'Not For Public Release', id: 'Standard Business' }, 
                    { text: 'For Comment', id: 'Standard Business'}, 
                    { text: 'Void', id: 'Standard Business' },
                    { text: 'Preliminary Results' , id: 'Standard Business' }, 
                    { text: 'Information Only', id: 'Standard Business' }
                ],
            },
        ],
    },
]; 
const signMenu:MenuItemModel[]=[{
  iconCss: "e-icons e-signature",
    items:
      [
        { text: "Add Signature" },
        { text: "Add Initial" },

      ]
    }
];

function disableInkAnnotation() {
  if(isInkEnabled)
  {
    viewer.annotation.setAnnotationMode("None");
    isInkEnabled = false;
  }
}
function previousClicked(args: ClickEventArgs): void {
   disableInkAnnotation();
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
  disableInkAnnotation();
    hidePopups();
    viewer.navigation.goToNextPage();
}

function searchClicked(args: ClickEventArgs): void {
  disableInkAnnotation();
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
  disableInkAnnotation();
    hidePopups();
    viewer.print.print();
}

function downloadClicked(args: ClickEventArgs): void {
  disableInkAnnotation();
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
                viewer.documentPath= uploadedFileUrl;
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
    disableInkAnnotation();
    const textSearchToolbarElement = document.getElementById('textSearchToolbar');
  if (textSearchToolbarElement !== null && textSearchToolbarElement.style.display === 'block') {
    textSearchToolbarElement.style.display = 'none';
  }
  const formFieldToolbarElement = document.getElementById('formFieldToolbar');
  if (formFieldToolbarElement !== null && formFieldToolbarElement.style.display === 'block') {
    formFieldToolbarElement.style.display = 'none';
    viewer.designerMode = false;
  }
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
  
function onItemSelect (args:any) {
  disableInkAnnotation();
  const textSearchToolbarElement = document.getElementById('textSearchToolbar');
  if (textSearchToolbarElement !== null && textSearchToolbarElement.style.display === 'block') {
    textSearchToolbarElement.style.display = 'none';
  }

  const formFieldToolbarElement = document.getElementById('formFieldToolbar');
  if (formFieldToolbarElement !== null && formFieldToolbarElement.style.display === 'block') {
    formFieldToolbarElement.style.display = 'none';
    viewer.designerMode = false;
  }
  var stampId = args.element.id;
    var stampText = args.element.innerText;
    if (stampId === 'Dynamic' && stampText != null) {
      if (stampText === 'Revised') {
        viewer.annotation.setAnnotationMode('Stamp', DynamicStampItem.Revised);
      } else if (stampText == 'Reviewed') {
        viewer.annotation.setAnnotationMode('Stamp', DynamicStampItem.Reviewed);
      } else if (stampText == 'Received') {
        viewer.annotation.setAnnotationMode('Stamp', DynamicStampItem.Received);
      } else if (stampText == 'Confidential') {
        viewer.annotation.setAnnotationMode('Stamp', DynamicStampItem.Confidential);
      } else if (stampText == 'Approved') {
        viewer.annotation.setAnnotationMode('Stamp', DynamicStampItem.Approved);
      } else if (stampText == 'Not Approved') {
        viewer.annotation.setAnnotationMode('Stamp', DynamicStampItem.NotApproved);
      }
    }
    if (stampId === 'Sign Here' && stampText != null) {
      if (stampText === 'Witness') {
        viewer.annotation.setAnnotationMode('Stamp', undefined, SignStampItem.Witness);
      } else if (stampText == 'Initial Here') {
        viewer.annotation.setAnnotationMode('Stamp', undefined, SignStampItem.InitialHere);
      } else if (stampText == 'Sign Here') {
        viewer.annotation.setAnnotationMode('Stamp', undefined, SignStampItem.SignHere);
      } else if (stampText == 'Accepted') {
        viewer.annotation.setAnnotationMode('Stamp', undefined, SignStampItem.Accepted);
      } else if (stampText == 'Rejected') {
        viewer.annotation.setAnnotationMode('Stamp', undefined, SignStampItem.Rejected);
      }
    }
    if (stampId === 'Standard Business' && stampText != null) {
      if (stampText === 'Approved') {
        viewer.annotation.setAnnotationMode(
          'Stamp',
          undefined,
          undefined,
          StandardBusinessStampItem.Approved
        );
      } else if (stampText == 'Not Approved') {
        viewer.annotation.setAnnotationMode(
          'Stamp',
          undefined,
          undefined,
          StandardBusinessStampItem.NotApproved
        );
      } else if (stampText == 'Draft') {
        viewer.annotation.setAnnotationMode(
          'Stamp',
          undefined,
          undefined,
          StandardBusinessStampItem.Draft
        );
      } else if (stampText == 'Final') {
        viewer.annotation.setAnnotationMode(
          'Stamp',
          undefined,
          undefined,
          StandardBusinessStampItem.Final
        );
      } else if (stampText == 'Completed') {
        viewer.annotation.setAnnotationMode(
          'Stamp',
          undefined,
          undefined,
          StandardBusinessStampItem.Completed
        );
      } else if (stampText == 'Confidential') {
        viewer.annotation.setAnnotationMode(
          'Stamp',
          undefined,
          undefined,
          StandardBusinessStampItem.Confidential
        );
      } else if (stampText == 'For Public Release') {
        viewer.annotation.setAnnotationMode(
          'Stamp',
          undefined,
          undefined,
          StandardBusinessStampItem.ForPublicRelease
        );
      } else if (stampText == 'Not For Public Release') {
        viewer.annotation.setAnnotationMode(
          'Stamp',
          undefined,
          undefined,
          StandardBusinessStampItem.NotForPublicRelease
        );
      } else if (stampText == 'For Comment') {
        viewer.annotation.setAnnotationMode(
          'Stamp',
          undefined,
          undefined,
          StandardBusinessStampItem.ForComment
        );
      } else if (stampText == 'Void') {
        viewer.annotation.setAnnotationMode(
          'Stamp',
          undefined,
          undefined,
          StandardBusinessStampItem.Void
        );
      } else if (stampText == 'Preliminary Results') {
        viewer.annotation.setAnnotationMode(
          'Stamp',
          undefined,
          undefined,
          StandardBusinessStampItem.PreliminaryResults
        );
      } else if (stampText == 'Information Only') {
        viewer.annotation.setAnnotationMode(
          'Stamp',
          undefined,
          undefined,
          StandardBusinessStampItem.InformationOnly
        );
      }
    }
  }
  function textSelection(e: ClickEventArgs) {
    disableInkAnnotation();
    viewer.interactionMode = 'TextSelection';
    viewer.enableTextSelection = true; 
  }
  function panMode(e: ClickEventArgs) {
    disableInkAnnotation();
    viewer.interactionMode = 'Pan';
    // viewer.enablePanMode = true;
  }

function openEditAnnotation(args:ClickEventArgs) {
    disableInkAnnotation();
    const textSearchToolbarElement = document.getElementById('textSearchToolbar');
    if (textSearchToolbarElement !== null && textSearchToolbarElement.style.display === 'block') {
      textSearchToolbarElement.style.display = 'none';
    }

    const formFieldToolbarElement = document.getElementById('formFieldToolbar');
    if (formFieldToolbarElement !== null && formFieldToolbarElement.style.display === 'block') {
      formFieldToolbarElement.style.display = 'none';
      viewer.designerMode = false;
    }
    const editAnnotationToolbarElement = document.getElementById('editAnnotationToolbar');
    if (editAnnotationToolbarElement !== null) {
      if (editAnnotationToolbarElement.style.display === 'block') {
        editAnnotationToolbarElement.style.display = 'none';
      } else {
        editAnnotationToolbarElement.style.display = 'block';
      }
    }

  }

  function addEditFormFields(args:ClickEventArgs){
    disableInkAnnotation();
    const formFieldToolbarElement = document.getElementById('formFieldToolbar');
    if (formFieldToolbarElement !== null) {
      if (formFieldToolbarElement.style.display === 'block') {
        formFieldToolbarElement.style.display = 'none';
        viewer.designerMode = false;
      } else {
        formFieldToolbarElement.style.display = 'block';
        viewer.designerMode = true;
      }
    }

    const editAnnotationToolbarElement = document.getElementById('editAnnotationToolbar');
    if (editAnnotationToolbarElement !== null && editAnnotationToolbarElement.style.display === 'block') {
      editAnnotationToolbarElement.style.display = 'none';
    }

    const textSearchToolbarElement = document.getElementById('textSearchToolbar');
    if (textSearchToolbarElement !== null && textSearchToolbarElement.style.display === 'block') {
      textSearchToolbarElement.style.display = 'none';
    }
  }
  function highlight(args:ClickEventArgs) {
    disableInkAnnotation();
    viewer.annotation.setAnnotationMode('Highlight');
  }
  function underLine(args:ClickEventArgs) {
    disableInkAnnotation();
    viewer.annotation.setAnnotationMode('Underline');
  }
  
  function strikeThrough(args:ClickEventArgs) {
    disableInkAnnotation();
    viewer.annotation.setAnnotationMode('Strikethrough');
  }
  
  function addLine(args:ClickEventArgs) {
    disableInkAnnotation();
    viewer.annotation.setAnnotationMode('Line');
  }
  
  function addArrow(args:ClickEventArgs) {
    disableInkAnnotation();
    viewer.annotation.setAnnotationMode('Arrow');
  }
  
  function addRectangle(args:ClickEventArgs) {
    disableInkAnnotation();
    viewer.annotation.setAnnotationMode('Rectangle');
  }
  
  function addCircle(args:ClickEventArgs) {
    disableInkAnnotation();
    viewer.annotation.setAnnotationMode('Circle');
  }
  
  function addPoligon(args:ClickEventArgs) {
    disableInkAnnotation();
    viewer.annotation.setAnnotationMode('Polygon');
  }
  
  function distance(args:ClickEventArgs) {
    disableInkAnnotation();
    viewer.annotation.setAnnotationMode('Distance');
  }
  
  function perimeter(args:ClickEventArgs) {
    disableInkAnnotation();
    viewer.annotation.setAnnotationMode('Perimeter');
  }
  
  function area(args:ClickEventArgs) {
    disableInkAnnotation();
    viewer.annotation.setAnnotationMode('Area');
  }
  
  function radius(args:ClickEventArgs) {
    disableInkAnnotation();
    viewer.annotation.setAnnotationMode('Radius');
  }
  
  function volume(args:ClickEventArgs) {
    disableInkAnnotation();
    viewer.annotation.setAnnotationMode('Volume');
  }
  
  function freeText(args:ClickEventArgs) {
    disableInkAnnotation();
    viewer.annotation.setAnnotationMode('FreeText');
  }
  
  
  
  
  function ink(args:ClickEventArgs) {
    if(!isInkEnabled)
    {
      viewer.annotation.setAnnotationMode("Ink");
      isInkEnabled=true;
    }
    else
    {
      viewer.annotation.setAnnotationMode("None");
      isInkEnabled =false;
    }
  }
  function textBox(args:ClickEventArgs) {
    viewer.formDesignerModule.setFormFieldMode('Textbox');
  }
  
  function passWord(args:ClickEventArgs) {
    viewer.formDesignerModule.setFormFieldMode('Password');
  }
  
  function checkBox(args:ClickEventArgs) {
    viewer.formDesignerModule.setFormFieldMode('CheckBox');
  }
  
  function radioButton(args:ClickEventArgs) {
    viewer.formDesignerModule.setFormFieldMode('RadioButton');
  }
  
  function dropDown(args:ClickEventArgs) {
    viewer.formDesignerModule.setFormFieldMode('DropDown');
  }
  
  function listBox(args:ClickEventArgs) {
    viewer.formDesignerModule.setFormFieldMode('ListBox');
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
function onSignatureClick(event : any): void{
  const editAnnotationToolbarElement = document.getElementById('editAnnotationToolbar') as HTMLElement | null;

  if (editAnnotationToolbarElement && editAnnotationToolbarElement.style.display === 'block') {
    if (event.element instanceof HTMLElement) {
      if (event.element.innerText === 'Add Signature') {
        viewer.annotationModule.setAnnotationMode('HandWrittenSignature');
      } else if (event.element.innerText === 'Add Initial') {
        viewer.annotationModule.setAnnotationMode('Initial');
      }
    }
  }

  const formFieldToolbarElement = document.getElementById('formFieldToolbar') as HTMLElement | null;

  if (formFieldToolbarElement && formFieldToolbarElement.style.display === 'block') {
    if (event.element instanceof HTMLElement) {
      if (event.element.innerText === 'Add Signature') {
        viewer.formDesignerModule.setFormFieldMode('SignatureField');
      } else if (event.element.innerText === 'Add Initial') {
        viewer.formDesignerModule.setFormFieldMode('InitialField');
      }
    }
  }
}
(window as any).default = (): void => {
    loadCultureFiles();
    toolbarObj = new Tool({
        items: [
            { prefixIcon: 'e-icons e-folder', tooltipText: 'Open', id: 'openButton', click: openDocument.bind(this) },
            { prefixIcon: 'e-icons e-save', tooltipText: 'Save', id:'save', click: downloadClicked.bind(this) },
            // tslint:disable-next-line:max-line-length
            { prefixIcon: 'e-icons e-chevron-left', id: 'previousPage', tooltipText: 'Previous Page', align: 'Center', click: previousClicked.bind(this) },
            // tslint:disable-next-line:max-line-length
            { prefixIcon: 'e-icons e-chevron-right', id: 'nextPage', tooltipText: 'Next Page', align: 'Center', click: nextClicked.bind(this) },
            { template: inputTemplate, tooltipText: 'Page Number', align: 'Center' },
            { template: ele, tooltipText: 'Page Number', align: 'Center' },
            { type:"Separator",tooltipText:"separator", align:"Center" },
            { prefixIcon:"e-icons e-mouse-pointer", tooltipText:"Text Selection Tool", align:"Center", click: textSelection.bind(this) },
            { prefixIcon:"e-icons e-pan", tooltipText:"Pan Mode", align:"Center", click: panMode.bind(this) },
            { type:"Separator",tooltipText:"separator", align:"Center" },
            { prefixIcon:"e-icons e-annotation-edit", tooltipText:"Edit Annotations", align:"Center", click: openEditAnnotation.bind(this) },
            { type:"Separator",tooltipText:"separator", align:"Center" },
            { prefixIcon:"e-icons e-split-vertical", tooltipText:"Add and Edit Form Fields", align:"Center", click: addEditFormFields.bind(this) },
            { type:"Separator",tooltipText:"separator", align:"Center" },
            { prefixIcon: 'e-icons e-search', tooltipText: 'Text Search', align: 'Right', click: searchClicked.bind(this) },
            { prefixIcon: 'e-icons e-print', tooltipText: 'Print', align: 'Right', click: printClicked.bind(this) }          
        ]
    });
    toolbarObj.appendTo('#topToolbar');
    var editAnnotationToolbarToolbar = new Tool({
        items: [
            { prefixIcon:"e-icons e-highlight-color", click: highlight.bind(this), tooltipText:"Highlight", id:"highlight", align:"Center" },
            { prefixIcon: 'e-icons e-underline', click: underLine.bind(this), tooltipText: 'Underline', id: 'underline', align: 'Center' },
            { prefixIcon: 'e-icons e-strikethrough', click: strikeThrough.bind(this), tooltipText: 'Strikethrough', id: 'strikethrough', align: 'Center' },
            { type: 'Separator', tooltipText: 'separator', align: 'Center' },
            { prefixIcon: 'e-icons e-line', click: addLine.bind(this), tooltipText: 'Add Line', id: 'line', align: 'Center' },
            { prefixIcon: 'e-icons e-arrow-right-up', click: addArrow.bind(this), tooltipText: 'Add Arrow', id: 'arrow', align: 'Center' },
            { prefixIcon: 'e-icons e-rectangle', click: addRectangle.bind(this), tooltipText: 'Add Rectangle', id: 'rectangle', align: 'Center' },
            { prefixIcon: 'e-icons e-circle', click: addCircle.bind(this), tooltipText: 'Add Circle', id: 'circle', align: 'Center' },
            { prefixIcon: 'e-icons e-pentagon', click: addPoligon.bind(this), tooltipText: 'Add Polygon', id: 'polygon', align: 'Center' },
            { type: 'Separator', tooltipText: 'separator', align: 'Center' },
            { prefixIcon: 'e-icons e-length', click: distance.bind(this), tooltipText: 'Calibrate Distance', id: 'calibrate_distance', align: 'Center' },
            { prefixIcon: 'e-icons e-perimeter', click: perimeter.bind(this), tooltipText: 'Calibrate Perimeter', id: 'calibrate_perimeter', align: 'Center' },
            { prefixIcon: 'e-icons e-area', click: area.bind(this), tooltipText: 'Calibrate Area', id: 'calibrate_area', align: 'Center' },
            { prefixIcon: 'e-icons e-radius', click: radius.bind(this), tooltipText: 'Calibrate Radius', id: 'calibrate_radius', align: 'Center' },
            { prefixIcon: 'e-icons e-volume', click: volume.bind(this), tooltipText: 'Calibrate Volume', id: 'calibrate_volume', align: 'Center' },
            { type: 'Separator', tooltipText: 'separator', align: 'Center' },
            { prefixIcon: 'e-icons e-text-annotation', click: freeText.bind(this), tooltipText: 'Free Text', id: 'freeText', align: 'Center' },
            { type: 'Separator', tooltipText: 'separator', align: 'Center' },
            { prefixIcon: 'e-icons e-stamp', tooltipText: 'Add Stamp', id: 'stamp', align: 'Center', template: `<div><ul id="menu"></ul></div>`},
            { type: 'Separator', tooltipText: 'separator', align: 'Center' },
            { id: 'signature', tooltipText: 'Add Signature', align: 'Center', template: `<div><ul id="signatureToolbar"></ul></div>`},
            { type: 'Separator', tooltipText: 'separator', align: 'Center' },
            { prefixIcon: 'e-icons e-style', click: ink.bind(this), id: 'ink', tooltipText: 'Ink', align: 'Center' }
        ]
    });
    editAnnotationToolbarToolbar.appendTo('#editAnnotationToolbar');
    var formFieldToolbar = new Tool({
        items: [
         { id: 'textbox', prefixIcon: 'e-icons e-text-form', click: textBox.bind(this), tooltipText: 'Textbox', align: 'Center' },
         { id: 'password', prefixIcon: 'e-icons e-password', click: passWord.bind(this), tooltipText: 'Password', align: 'Center' },
         { id: 'checkbox', prefixIcon: 'e-icons e-check-box', click: checkBox.bind(this), tooltipText: 'Checkbox', align: 'Center' },
         { id: 'radio_button', prefixIcon: 'e-icons e-radio-button', click: radioButton.bind(this), tooltipText: 'Radio Button', align: 'Center' },
         { id: 'drop_down', prefixIcon: 'e-icons e-drop-down', click: dropDown.bind(this), tooltipText: 'Drop Down', align: 'Center' },
         { id: 'list_box', prefixIcon: 'e-icons e-list-unordered', click: listBox.bind(this), tooltipText: 'List Box', align: 'Center' },
         { id: 'formField_signature',tooltipText: 'Add Signature', align: 'Center',template: `<div><ul id="formFieldSignatureToolbar"></ul></div>` }
        ]
    });
    formFieldToolbar.appendTo('#formFieldToolbar');
    let magnificationToolbar: Tool = new Tool({
        items: [
            { prefixIcon: 'e-pv-fit-page-icon', id: 'fitPage', tooltipText: 'Fit to page', click: pageFitClicked.bind(this) },
            { prefixIcon: 'e-icons e-circle-add', id: 'zoomIn', tooltipText: 'Zoom in', click: zoomInClicked.bind(this) },
            { prefixIcon: 'e-icons e-circle-remove', id: 'zoomOut', tooltipText: 'Zoom out', click: zoomOutClicked.bind(this) },
        ]
    });
    magnificationToolbar.appendTo('#magnificationToolbar');
    viewer = new PdfViewer({
        enableToolbar: false,
        enableNavigationToolbar: false,
        enableThumbnail: false,
        enableAnnotationToolbar:false,
        enableCommentPanel:false,
        documentPath: 'https://cdn.syncfusion.com/content/pdf/hive-succinctly.pdf',
        resourceUrl:'https://cdn.syncfusion.com/ej2/23.2.6/dist/ej2-pdfviewer-lib'
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

    let previousSearch: Button = new Button({ iconCss: 'e-icons e-chevron-left' });
    previousSearch.appendTo('#previousSearch');

    let nextSearch: Button = new Button({ iconCss: 'e-icons e-chevron-right' });
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

    var switchObj = new Switch({ value: 'Standalone Rendering', checked: true });
    switchObj.appendTo('#checked');

    switchObj.change = function (args:any) {
        if (args.checked) {
            viewer.serviceUrl = '';
        }
        else {
            viewer.serviceUrl = 'https://services.syncfusion.com/js/production/api/pdfviewer';
        }
        viewer.dataBind();
        viewer.load(viewer.documentPath, null);
    }
    new Menu({ items: data, select:onItemSelect, showItemOnClick: true }, "#menu");
    new Menu({items:signMenu,select:onSignatureClick,showItemOnClick:true},"#signatureToolbar");
    new Menu({items:signMenu,select:onSignatureClick,showItemOnClick:true},"#formFieldSignatureToolbar");
    searchButton = document.getElementById('searchBtn');
    searchInput.addEventListener('focus', () => { searchInput.parentElement.classList.add('e-input-focus'); });
    searchInput.addEventListener('blur', () => { searchInput.parentElement.classList.remove('e-input-focus'); });
    searchInput.addEventListener('keypress', searchInputKeypressed);
    document.getElementById('previousSearch').addEventListener('click', previousSearchClicked);
    document.getElementById('nextSearch').addEventListener('click', nextSearchClicked);
    currentPageBox.addEventListener('keypress', onCurrentPageBoxKeypress);
    currentPageBox.addEventListener('click', onCurrentPageBoxClicked);
    searchButton.addEventListener('click', searchClickHandler);
    document.getElementById('e-dropdown-btn-item_63').addEventListener('click', onSignatureClick);
    document.getElementById('e-dropdown-btn-item_65').addEventListener('click', onSignatureClick);
    bookmarkPopup.hide();
    textSearchPopup.hide();
    enableNextButton(false);
    enablePrevButton(false);
};