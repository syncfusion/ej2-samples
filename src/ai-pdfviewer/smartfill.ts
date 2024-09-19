
import { PdfViewer,RectangleSettings, Toolbar, Magnification, Navigation, Annotation, LinkAnnotation, ThumbnailView, BookmarkView, TextSelection, TextSearch, FormFields, FormDesigner, PageOrganizer } from '@syncfusion/ej2-pdfviewer';
import { Browser } from '@syncfusion/ej2-base';
import { ClickEventArgs, Button } from '@syncfusion/ej2-buttons';
import { AppBar } from '@syncfusion/ej2-navigations';
import { Toolbar as Tool, TreeView } from '@syncfusion/ej2-navigations';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { ContextMenuItem, FormFieldDataFormat } from '@syncfusion/ej2/pdfviewer';
import { TextArea } from  '@syncfusion/ej2-inputs';
import { createSpinner, showSpinner, hideSpinner } from '@syncfusion/ej2-popups';

(window as any).default = (): void => {

    PdfViewer.Inject(Toolbar, Magnification, Navigation, Annotation, LinkAnnotation, ThumbnailView, BookmarkView, TextSelection, TextSearch, FormFields, FormDesigner);

    let pdfviewer: PdfViewer = new PdfViewer();
    pdfviewer.serviceUrl = 'SERVICE-URL';
    pdfviewer.enableAnnotationToolbar = false;
    pdfviewer.enableToolbar = false;
    pdfviewer.zoomMode = "FitToPage";
    pdfviewer.downloadFileName = "SmartFill.pdf"
    pdfviewer.created = sampleCreated;
    pdfviewer.pageClick = checkClickedDiv;
    pdfviewer.documentLoad = documentLoaded;
    pdfviewer.appendTo('#e-pv-smartfill-pdfviewer');
    if (pdfviewer.element) {
        pdfviewer.load('form_document_1.pdf','');
    }
    const rightContainer = document.getElementById('e-pv-smartfill-right-container');
    const leftContainer = document.getElementById('e-pv-smartfill-left-container');
    const rightContainerBlack = document.getElementById('e-pv-smartfill-right-container-blackout');
    const parentContainer = document.querySelector('.e-pv-viewer-container');
    if(rightContainerBlack) {
        createSpinner({target: rightContainerBlack});
        hideSpinner(rightContainerBlack);
    }
    let smartFillContainerOpen: boolean = false;
    let isFindMobileDevice: boolean = false;
    const fileUploadBtn =  document.getElementById('e-pv-smartfill-fileUpload');

    /* Function for the document load event */
    function documentLoaded(args:any){
        toolbarObj.hideItem(5,false);
    }

    /* Function for download */
    function downloadClicked(){
        pdfviewer.download();
        isMobileDevice();
    }

    /* Function for print */
    function printClicked(){
        pdfviewer.print.print();
    }

    /* Function for create event */
    function sampleCreated(args:any) {
        const appbarContainer = document.getElementById('e-pv-smartfill-appbar-container');
        if(appbarContainer){
            appbarContainer.style.display = 'block';
        }
    }

    /* Initialize the appbar */
    const defaultAppBarObj: AppBar = new AppBar({
        colorMode: 'Dark'
    });
    defaultAppBarObj.appendTo('#e-pv-smartfill-defaultappbar');

    /* Initialize the toolbar */
    let toolbarObj:Tool = new Tool({
        items: [
            { prefixIcon: 'e-icons e-folder', tooltipText: 'Open', text: 'Open File', id: 'openButton', cssClass: 'e-pv-open-container',click: openDocument },
            { type: "Separator", tooltipText: "separator" ,align: 'Left'},
            { prefixIcon: 'e-icons e-download', tooltipText: 'Save', text: 'Save', id: 'saveButton', cssClass: 'e-pv-save-container',click: downloadClicked },
            { prefixIcon: 'e-icons e-print', tooltipText: 'Print', text: 'Print', id: 'printButton', cssClass: 'e-pv-print-container',click: printClicked },  
            { type: "Separator", tooltipText: "separator" },
            { prefixIcon: 'e-icons e-redaction', tooltipText: 'Smart Fill', text: 'Smart Fill', align: 'Right', id: 'smartFillButton', cssClass: 'e-pv-smartfill-btn-container',click: openSmartFill}
        ]
    });
    toolbarObj.appendTo('#e-pv-smartfill-toolbar');
    if (toolbarObj.element) {
        toolbarObj.hideItem(5,true);
    }
    /* Initialize the dropdown list for the documents */
    let listObj: DropDownList = new DropDownList({
        index: 0,
        change: valueChange
    });
    listObj.appendTo('#e-pv-smartfill-dropdown-options');

    /* Initialize the textarea to show the contents */
    let inputobj1: TextArea = new TextArea({
        floatLabelType: 'Auto',
        value: "Hi, this is Alice. You can contact me at alice456@gmail.com. I am female, born on July 15, 1998. I want to unsubscribe from a newspaper and learn courses, specifically a Cloud Computing course. I am from Texas."
    });
    inputobj1.appendTo('#e-pv-smartfill-default-textarea');

    /* Initialize the fill form button */
    let smartFillBtn: Button = new Button({ content: 'Fill Form',isPrimary: true });
    smartFillBtn.appendTo('#e-pv-smartfill-submit');
    let smartfillSubmit = document.getElementById('e-pv-smartfill-submit');
    if(smartfillSubmit){
        smartfillSubmit.addEventListener('click', getSmartFillResult);
    }

    /* Function for create request to get the form field data */
    function getSmartFillResult(){
        if(rightContainerBlack){
            rightContainerBlack.style.display = 'block';
        }
        if(rightContainerBlack){
            showSpinner(rightContainerBlack);
        }
        let data:any = pdfviewer.getRootElement();
        var hashId:any = data.ej2_instances[0].viewerBase.hashId;
        var dictionary:any = {
            "hashId": hashId
        };
        let url:any = "http://localhost:62869/api/pdfviewer/SmartFillClicked";
        let xhr:XMLHttpRequest = new XMLHttpRequest();
        xhr.open('Post', url, true);
        xhr.setRequestHeader('Content-type', 'application/json; charset=UTF-8');
        xhr.onload = function() {
            if (xhr.status >= 200 && xhr.status < 300) {
                let response = xhr.responseText;
                try {      
                    pdfviewer.importFormFields(response,FormFieldDataFormat.Xfdf);
                    pdfviewer.dataBind();
                    if(rightContainerBlack){
                        rightContainerBlack.style.display = 'none';
                    }
                    if(rightContainerBlack){
                        hideSpinner(rightContainerBlack);
                    }
                } catch (e) {
                    console.error('Failed to parse response as JSON:', e);
                }
            } else {
                console.error('Request failed with status:', xhr.status, xhr.statusText);
            }
        };   
        xhr.onerror = function() {
            console.error('Network error');
        };
        pdfviewer.exportFormFieldsAsObject(FormFieldDataFormat.Xfdf)
        .then((xfdfdata: any) => {
            var post: any = JSON.stringify({
                jsonObject: dictionary,
                textareaContent: inputobj1.value,
                exportFormFieldValue: xfdfdata
            });
            xhr.send(post); // Handle the XFDF data here
        })
        .catch((error: any) => {
            console.error('Error getting XFDF data:', error);
        });
    }

    /* Function for the value change event for the dropdown */
    function valueChange(args:any){
        if(args.itemData.text == "User Registration Form"){
            pdfviewer.load('form_document_1.pdf','');
            pdfviewer.dataBind();
            inputobj1.value = "Hi, this is Alice. You can contact me at alice456@gmail.com. I am female, born on July 15, 1998. I want to unsubscribe from a newspaper and learn courses, specifically a Cloud Computing course. I am from Texas.";
            inputobj1.dataBind();
        }
        if(args.itemData.text == "Job Application Form"){
            pdfviewer.load('form_document_2.pdf','');
            pdfviewer.dataBind();
            inputobj1.value = "Hello, my name is John Paul, and I'm interested in applying for the Coach position. I'm currently self-employed, and you can contact me at johnpaul2209@gmail.com. For reference, please use my designated email: john123@gmail.com.";
            inputobj1.dataBind();
        }
        if(args.itemData.text == "Contact Form"){
            pdfviewer.load('form_document_3.pdf','');
            pdfviewer.dataBind();
            inputobj1.value = "Hello, My name is Peter Parker. You can contact me at peterparker03@gmail.com or on my personal number, 9876543210. I'm writing to request the blocking of my credit card, which has unfortunately been lost.";
            inputobj1.dataBind();
        }
    }

    /* Function for read the open file */
    function readFile(args: any): void {
        let upoadedFiles: any = args.target.files;
        if (args.target.files[0] !== null) {
            let uploadedFile: File = upoadedFiles[0];
            if (uploadedFile) {
                let reader: FileReader = new FileReader();
                let filename: string = upoadedFiles[0].name;
                reader.readAsDataURL(uploadedFile);
                reader.onload = (e: any): void => {
                    let uploadedFileUrl: string = e.currentTarget.result;
                    pdfviewer.documentPath = uploadedFileUrl;
                    pdfviewer.fileName = filename;
                };
            }
        }
    }

    if(parentContainer) {
        parentContainer.addEventListener('touchstart',checkClickedDiv);
    }

    function checkClickedDiv(args:any) {
        if(Browser.isDevice && !isFindMobileDevice) { 
            if(rightContainer){
                rightContainer.style.display = 'none';
                smartFillContainerOpen = false;
            }
        }
    }
    function isMobileDevice(): boolean {
        //Check if the device is mobile
        var isMobile = Browser.isDevice;
        var sampleContent = document.getElementById('e-pv-smart-fill-container')
        if (isMobile) {
            var sampleContentRect = sampleContent?.getBoundingClientRect();
            var sampleContentMinWidth = 450;
            if (sampleContentRect && ((sampleContentRect.width) > sampleContentMinWidth)) {
                return false;
            } else {
                return true;
            }
        }
        isFindMobileDevice = isMobile;
        return isMobile;
    }
    /* Function to open the smart fill container */
    function openSmartFill(){
        if(!smartFillContainerOpen) {
            if(!Browser.isDevice) { 
                if(leftContainer){
                    leftContainer.style.width = '70%';
                }
                pdfviewer.updateViewerContainer();
                pdfviewer.dataBind();
                toolbarObj.refreshOverflow();
            }
            if(rightContainer){
                rightContainer.style.display = 'block';
            }
            smartFillContainerOpen = true;
        }
        else {
            if(!Browser.isDevice) { 
                if(leftContainer){
                    leftContainer.style.width = '100%';
                }
                setTimeout(() => {
                    pdfviewer.updateViewerContainer();
                },50);
                toolbarObj.refreshOverflow();
            }
            if(rightContainer){
                rightContainer.style.display = 'none';
            }
            smartFillContainerOpen = false;
        }
    }

    /* Function for open the document */
    function openDocument(e: ClickEventArgs): void { 
        fileUploadBtn?.click();
    }
    fileUploadBtn?.addEventListener('change', readFile, false)
}