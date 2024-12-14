import { loadCultureFiles } from '../common/culture-loader';
import {
    PdfViewer, Magnification, Navigation, LinkAnnotation, BookmarkView,
    ThumbnailView, Print, TextSelection, TextSearch, Annotation, FormFields, FormDesigner, PageOrganizer, LoadEventArgs, PageChangeEventArgs, AnnotationAddEventArgs,AnnotationRemoveEventArgs
} from '@syncfusion/ej2-pdfviewer';
import { ChangeEventArgs } from '@syncfusion/ej2-buttons';
import { AppBar } from '@syncfusion/ej2-navigations';
import { Button } from '@syncfusion/ej2-buttons';
import { Toolbar } from '@syncfusion/ej2-navigations';
import { ComboBox } from '@syncfusion/ej2/dropdowns';
import { ClickEventArgs } from '@syncfusion/ej2-buttons';
import { Uploader } from '@syncfusion/ej2-inputs';
import { Dialog } from '@syncfusion/ej2-popups';
// tslint:disable-next-line:max-line-length
PdfViewer.Inject(Toolbar, Magnification, Navigation, LinkAnnotation, BookmarkView, ThumbnailView, Print, TextSelection, TextSearch, Annotation, FormFields, FormDesigner, PageOrganizer, AppBar, Button);

(window as any).default = (): void => {

    loadCultureFiles();
    let viewer: PdfViewer = new PdfViewer();
    //Event listener for the download button
    document.getElementById('defaultButtonDownload').addEventListener('click', downloadClicked);

    viewer.documentPath = "https://cdn.syncfusion.com/content/pdf/programmatical-annotations.pdf";
    viewer.resourceUrl ="https://cdn.syncfusion.com/ej2/27.1.55/dist/ej2-pdfviewer-lib";

    //Creation of appbar
    const defaultAppBarObj: AppBar = new AppBar({
        colorMode: 'Primary'
    });
    defaultAppBarObj.appendTo('#defaultAppBar');

    //Creation download button
    let defaultButtonDownloadObj: Button = new Button({ cssClass: 'e-inherit', iconCss: 'e-icons e-download e-btn-icon e-icon-left', content: 'Download' });
    defaultButtonDownloadObj.appendTo('#defaultButtonDownload');

    let redactionCount: number = 0;
    let annotation: any;
    let fileName: string ="programmatical-annotations.pdf";
    const url = "https://ej2services.syncfusion.com/js/development/api/pdfviewer/Redaction";

    //Creation of Toolbar with open , text , image , pattern , blackout, whiteout and redaction buttons
    let primaryToolbarObj: Toolbar = new Toolbar({
        items: [
            { prefixIcon: 'e-icon e-folder', tooltipText: 'Open', cssClass: 'e-pv-open-container', id: 'pdfviewer_open', text: 'Open', click: openDocumentClicked.bind(this) },
            {
                type: 'Separator', id: 'separator1'
            },
            {
                prefixIcon: 'e-icon e-text-annotation', tooltipText: 'Text', cssClass: 'e-pv-font-container', text: 'Text', click: addText.bind(this)
            },
            {
                prefixIcon: 'e-icons e-image', tooltipText: 'Image', cssClass: 'e-pv-image-container', text: 'Image', id: 'targetButton'
            },
            {
                prefixIcon: 'e-icons e-opacity', tooltipText: 'Pattern', cssClass: 'e-pv-pattern-container', text: 'Pattern', click: addPattern.bind(this)
            },
            {
                prefixIcon: 'e-icons black-out', tooltipText: 'Black out', cssClass: 'e-pv-redact-sb-black-out-container', text: 'Blackout', click: addBlackout.bind(this)
            },
            {
                prefixIcon: 'e-icons white-out', tooltipText: 'White Out', cssClass: 'e-pv-redact-sb-white-out-container', text: 'Whiteout', click: addWhiteout.bind(this)
            },
            {
                type: 'Separator'
            },
            {
                prefixIcon: 'e-icons e-redact', cssClass: 'e-pv-redaction-container', tooltipText: 'Redaction' , text: 'Redact', id: 'redacticon', click: redaction.bind(this) , disabled: true
            }
        ]
    });
    primaryToolbarObj.appendTo('#e-pv-redact-sb-toolbar');

    let CurrentpageNumber: string = '<div><span id="e-pv-redact-sb-currentPage" title="Current Page">1 </span><span id="e-pv-redact-sb-totalPage" title="Total Page">/ 1</span></div>';
    let zoomList: string[] = ['10%', '25%', '50%', '75%', '100%', '200%', '400%'];

    //Creation of toolbar with navigations and zoom dropdown
    let secondaryToolbarObj: Toolbar = new Toolbar({
        items: [
            {
                prefixIcon: 'e-icon e-chevron-left', cssClass: 'e-pv-previous-container', id: 'previousPage', tooltipText: 'Previous Page', click: previousClicked.bind(this) , disabled: true 
            },
            {
                template: CurrentpageNumber
            },
            {
                prefixIcon: 'e-icon e-chevron-right', cssClass: 'e-pv-next-container', id: 'nextPage',tooltipText: 'Next Page', click: nextClicked.bind(this) , disabled: true
            },
            {
                type: 'Separator'
            },
            {
                type: 'Input', tooltipText: 'Zoom', cssClass: 'percentage', align: 'Left', template: new ComboBox({ width: 88, value: '100%', dataSource: zoomList, popupWidth: 85, showClearButton: false, readonly: false, change: zoomValueChange.bind(this) }), id: 'zoomBox'
            }
        ]
    });
    secondaryToolbarObj.appendTo("#e-pv-redact-sb-toolbar-secondary");

    //To create dialog box to upload the image
    let icontemp: string = '<button id="cancelButton" class="e-control e-btn e-primary" data-ripple="true">' + 'Cancel</button>';
    let headerimg: string = '<span class="header-content"></span>';
    let cancelButton: Button = new Button();
    let dialog: Dialog = new Dialog({
        header: headerimg + '<div id="dlg-template" title="upload" class="e-icon-settings"> Upload Image </div>',
        footerTemplate: icontemp,
        showCloseIcon: true,
        visible: false,
        target: '#e-pv-redact-sb-panel',
        width: '477px',
        isModal: true
    });
    dialog.appendTo("#e-pv-redact-sb-dialog");
    cancelButton.appendTo("#cancelButton");
    document.getElementById("targetButton").onclick = (): void => {
        dialog.show();
    };

    document.getElementById("cancelButton").onclick = (): void => {
        dialog.hide();
    };

    //To select image from file manager and displaying to the pdf
    let customStampSource: string = "";
    let dropElement: HTMLElement = document.getElementsByClassName(
        'drop-area-wrap'
    )[0] as HTMLElement;

    let uploadObj: Uploader = new Uploader({
        asyncSettings: {
            saveUrl:
                'https://services.syncfusion.com/js/production/api/FileUploader/Save',
            removeUrl:
                'https://services.syncfusion.com/js/production/api/FileUploader/Remove',
        },
        dropArea: dropElement,
        change: onFileChange,
        allowedExtensions: '.png, .jpg, .jpeg',
        multiple: false
    });
    uploadObj.appendTo('#fileupload');

    //When the selected image is clicked
    function handleImageClick(args: any): void {
        customStampSource = imageSrc;
        dialog.hide();
        addImage();

    }
    let imageSrc: any;
    function onFileChange(args: any): void {
        const file = args.file[0].rawFile;
        let imageElement = document.getElementById('imageView');
        let imageElementContainer = document.getElementById('imageContainer');
        const reader = new FileReader();
        reader.onload = function (e) {
            const base64String = e.target?.result as string;
            imageSrc = base64String;
            customStampSource = imageSrc;
            (imageElement as any).src = imageSrc;
            imageElementContainer.className =
                'image-container e-pv-redact-sb-image-container-selected';
            (imageElement as any).style.display = 'block';
            // Bind click event to the image element
            imageElement.addEventListener('click', handleImageClick);
        };
        reader.readAsDataURL(file);
    }

    viewer.appendTo('#pdfViewer');
    document.getElementById('fileUpload').addEventListener('change', readFile, false);

    //To get the curret page number
    let currentPageBox: HTMLSpanElement;
    currentPageBox = document.getElementById('e-pv-redact-sb-currentPage');
    (currentPageBox as HTMLSpanElement).textContent = '1'+' ';
    let totalPageBox: HTMLElement;
    totalPageBox = document.getElementById('e-pv-redact-sb-totalPage');
    (totalPageBox as HTMLElement as any).value = '1';

    //Updating the total number of pages while loading
    viewer.documentLoad = (args: LoadEventArgs): void => {
        document.getElementById('e-pv-redact-sb-totalPage').textContent = ' / ' + viewer.pageCount;
        (document.getElementById('e-pv-redact-sb-currentPage')).textContent = viewer.currentPageNumber.toString();
        updatePageNavigation();
        updateRedaction();

    };

    //Updating the number of redaction while the annotation has been added
    viewer.annotationAdd = (args: AnnotationAddEventArgs): void => {
        let pdfAnnotationList: Array<any> = new Array();
        pdfAnnotationList = viewer.annotationCollection;
        let selectedAnnotationIndex: number = pdfAnnotationList.findIndex(item => item.annotationId == args.annotationId);
        if (selectedAnnotationIndex != -1) {
            annotation = pdfAnnotationList[selectedAnnotationIndex];
        }
        if (annotation.author == "Redaction" || annotation.customStampName == "Image" || annotation.author == "Pattern" || annotation.author == "Text") {
            redactionCount = redactionCount + 1;
            updateRedaction();
        }

    }

    //Updating the number of redaction while the annotation has been removed
    viewer.annotationRemove = (args: AnnotationRemoveEventArgs): void => {
        if (annotation.author == "Redaction" || annotation.customStampName == "Image" || annotation.author == "Pattern" || annotation.author == "Text") {
            redactionCount = redactionCount - 1;
            updateRedaction();
        }

    }


    //Updating the current page number while changing the page
    viewer.pageChange = (args: PageChangeEventArgs): void => {
        (currentPageBox as HTMLInputElement).value = viewer.currentPageNumber.toString();
        (document.getElementById('e-pv-redact-sb-currentPage')).textContent = viewer.currentPageNumber.toString() + ' ';
        updatePageNavigation();
    };

    //Updating the navigation button based on the page number either "enabled" or "disabled"
    function updatePageNavigation(): void {
        if (viewer.currentPageNumber === 1) {
            secondaryToolbarObj.items[0].disabled=true;
            secondaryToolbarObj.items[2].disabled=false;
        }
        else if (viewer.currentPageNumber === viewer.pageCount) {
            secondaryToolbarObj.items[0].disabled=false;
            secondaryToolbarObj.items[2].disabled=true;
        }
        else {
            secondaryToolbarObj.items[0].disabled=false;
            secondaryToolbarObj.items[2].disabled=false;
        }
    }

    //To enable the redaction button based on count
    function updateRedaction(): void {
        if (redactionCount <= 0) {
            primaryToolbarObj.items[8].disabled = true;
        }
        else {
            primaryToolbarObj.items[8].disabled = false;
        }

    }

    //Method for moving to next page 
    function nextClicked(args: ClickEventArgs): void {
        viewer.navigation.goToNextPage();
    }

    //Method for moving to previous page
    function previousClicked(args: ClickEventArgs): void {
        viewer.navigation.goToPreviousPage();
    }

    //Zoom values changes when the percentage is selected from the dropdown
    function zoomValueChange(args: ChangeEventArgs): void {
        let zoom = (args as any).value;
        let previousZoom = (args as any).previousItemData.value;
        if (zoom !== null || previousZoom !== null) {
            let zoomchange = parseInt(zoom.replace("%", ""), 10);
            viewer.magnificationModule.zoomTo(zoomchange);
        }
    }


    //To download the redacted pdf 
    function downloadClicked() {
        viewer.saveAsBlob().then(function (value) {
            let reader = new FileReader();
            reader.readAsDataURL(value);
            reader.onload = function (e) {
                const base64String = e.target?.result as string;
                const xhr:XMLHttpRequest = new XMLHttpRequest();
                xhr.open('POST', url, true);
                xhr.setRequestHeader('Content-type', 'application/json; charset=UTF-8');
                const requestData = JSON.stringify({ base64String: base64String });
                xhr.onload = function () {
                    if (xhr.status === 200) {
                        const blobUrl = createBlobUrl(xhr.responseText.split('base64,')[1], 'application/pdf');
                        downloadDocument(blobUrl);
                    }
                    else {
                        console.error('Download failed:', xhr.statusText);
                    }
                };
                xhr.onerror = function () {
                    console.error('An error occurred during the download:', xhr.statusText);
                };
                xhr.send(requestData);
            };
        }).catch(function (error) {
            console.error('Error saving Blob:', error);
        });
    }

    function createBlobUrl(base64String: string, contentType: string):any {
        const sliceSize:number = 512;
        const byteCharacters:string = atob(base64String);
        const byteArrays:any = [];
        for (let offset:number = 0; offset < byteCharacters.length; offset += sliceSize) {
            const slice:string = byteCharacters.slice(offset, offset + sliceSize);
            const byteNumbers:any = new Array(slice.length);
            for (let i:number = 0; i < slice.length; i++) {
                byteNumbers[parseInt(i.toString(), 10)] = slice.charCodeAt(i);
            }
            const byteArray:any = new Uint8Array(byteNumbers);
            byteArrays.push(byteArray);
        }
        const blob:any = new Blob(byteArrays, { type: contentType });
        return blob;
    }

    function downloadDocument(blobUrl: string):void {
        const Url:any = URL || webkitURL;
        blobUrl = Url.createObjectURL(blobUrl);
        viewer.fileName = fileName;
        const anchorElement:HTMLElement = document.createElement('a');
        if (anchorElement.click) {
            (anchorElement as HTMLAnchorElement).href = blobUrl;
            (anchorElement as HTMLAnchorElement).target = '_parent';
            if ('download' in anchorElement) {
                const downloadFileName = viewer.fileName || 'downloadedFile.pdf';
                if (downloadFileName) {
                    if (downloadFileName.endsWith('.pdf')) {
                        (anchorElement as HTMLAnchorElement).download = downloadFileName;
                    }
                    else {
                        const splitPdf:string = downloadFileName.split('.pdf')[0] + '.pdf';
                        (anchorElement as HTMLAnchorElement).download = splitPdf;
                    }
                }
                else {
                    (anchorElement as HTMLAnchorElement).download = 'Default.pdf';
                }
            }
            (document.body || document.documentElement).appendChild(anchorElement);
            anchorElement.click();
        }
        else {
            if (window.top === window &&
                blobUrl.split('#')[0] === window.location.href.split('#')[0]) {
                const padCharacter:string = blobUrl.indexOf('?') === -1 ? '?' : '&';
                blobUrl = blobUrl.replace(/#|$/, padCharacter + '$&');
            }
            window.open(blobUrl, '_parent');
        }
    }

    //To read a new file
    function readFile(args: any): void {
        // tslint:disable-next-line
        let upoadedFiles: any = args.target.files;
        if (args.target.files[0] !== null) {
            let uploadedFile: File = upoadedFiles[0];
            if (uploadedFile) {
                let reader: FileReader = new FileReader();
                fileName = upoadedFiles[0].name;
                reader.readAsDataURL(uploadedFile);
                // tslint:disable-next-line
                reader.onload = (e: any): void => {
                    let uploadedFileUrl: string = e.currentTarget.result;
                    viewer.documentPath = uploadedFileUrl;
                    viewer.fileName = fileName;
                    viewer.downloadFileName = fileName;
                };
            }
        }
    }

    //To open a file from viewer
    function openDocumentClicked(args: ClickEventArgs): void {
        const textSearchToolbarElement = document.getElementById('textSearchToolbar');
        if (textSearchToolbarElement !== null && textSearchToolbarElement.style.display === 'block') {
            textSearchToolbarElement.style.display = 'none';
        }
        document.getElementById('fileUpload').click();
    }

    //Method to create rectangle annotation when "Text" button is clicked
    function addText(args: ClickEventArgs) {
        viewer.rectangleSettings = {
            fillColor: '#a3a2a0',
            strokeColor: '#a3a2a0',
            author: 'Text'
        }
        viewer.annotation.setAnnotationMode('Rectangle');

    }

    //Adding the image to the pdf
    function addImage() {
        viewer.stampSettings.author = "Image";
        viewer.customStampSettings = {
            width: 200,
            author: 'Image',
            height: 125,
            isAddToMenu: false,
            enableCustomStamp: false

        };
        viewer.customStamp = [
            {
                customStampName: 'Image',
                customStampImageSource: customStampSource
            },
        ];
    }

    //Method to create rectangle annotation when the "Pattern" button is clicked
    function addPattern(args: ClickEventArgs) {
        viewer.rectangleSettings = {
            fillColor: '#dedfe0',
            strokeColor: '#dedfe0',
            author: 'Pattern'
        }
        viewer.annotation.setAnnotationMode('Rectangle');
    }


    //Method to create rectangle annotation when the "Blackout" button is clicked
    function addBlackout(args: ClickEventArgs) {
        viewer.rectangleSettings = {
            fillColor: '#000000',
            strokeColor: '#000000',
            author: 'Redaction'
        }
        viewer.annotation.setAnnotationMode('Rectangle');

    }
    //Method to create rectangle annotation when the "Whiteout" button is clicked
    function addWhiteout(args: ClickEventArgs) {
        viewer.rectangleSettings = {
            fillColor: '#ffffff',
            strokeColor: '#ffffff',
            author: 'Redaction'
        }
        viewer.annotation.setAnnotationMode('Rectangle');

    }

    //To redact the pdf in server side using the button click event
    function redaction(): void {
        if (redactionCount > 0) {
            viewer.saveAsBlob().then(function (value) {
                const data = value;
                const reader = new FileReader();
                reader.readAsDataURL(data);
                reader.onload = function (e) {
                    const base64String = e.target?.result as string;
                    const xhr:XMLHttpRequest = new XMLHttpRequest();
                    xhr.open('POST', url, true);
                    xhr.setRequestHeader('Content-type', 'application/json; charset=UTF-8');
                    const requestData = JSON.stringify({ base64String: base64String });
                    xhr.onload = function () {
                        if (xhr.status === 200) {
                            viewer.load(xhr.responseText, null);
                        }
                        else {
                            console.error('Redaction failed:', xhr.statusText);
                        }
                    };
                    xhr.onerror = function () {
                        console.error('An error occurred during the redaction:', xhr.statusText);
                    };
                    xhr.send(requestData);
                };
            });
            redactionCount = 0;
            updateRedaction();
        }
    }

};



