
import { PdfViewer,RectangleSettings, Toolbar, Magnification, Navigation, Annotation, LinkAnnotation, ThumbnailView, BookmarkView, TextSelection, TextSearch, FormFields, FormDesigner, PageOrganizer } from '@syncfusion/ej2-pdfviewer';
import { Browser } from '@syncfusion/ej2-base';
import { ClickEventArgs, Button } from '@syncfusion/ej2-buttons';
import { AppBar } from '@syncfusion/ej2-navigations';
import { Toolbar as Tool, TreeView } from '@syncfusion/ej2-navigations';
import { ContextMenuItem } from '@syncfusion/ej2/pdfviewer';
import { createSpinner, showSpinner, hideSpinner } from '@syncfusion/ej2-popups';

(window as any).default = (): void => {
    PdfViewer.Inject(Toolbar, Magnification, Navigation, Annotation, LinkAnnotation, ThumbnailView, BookmarkView, TextSelection, TextSearch, FormFields, FormDesigner, PageOrganizer);

    let pdfviewer: PdfViewer = new PdfViewer();
    pdfviewer.serviceUrl = 'SERVICE-URL';
    pdfviewer.enableAnnotationToolbar = false;
    pdfviewer.enableToolbar = false;
    pdfviewer.contextMenuSettings = { 
        contextMenuAction: 'RightClick', 
        contextMenuItems: [ContextMenuItem.Delete] 
    };
    pdfviewer.downloadFileName = "SmartRedaction.pdf";
    pdfviewer.zoomMode = "FitToPage";
    pdfviewer.annotationAdd = annotationAdded;
    pdfviewer.annotationRemove = annotationRemove;
    pdfviewer.documentLoad = documentLoaded;
    pdfviewer.created = sampleCreated;
    pdfviewer.appendTo('#e-pv-smartredact-pdfviewer');
    if (pdfviewer.element) {
        pdfviewer.load('Confidential_Medical_Record.pdf','');
    }
    let downloadBtn = document.getElementById('e-pv-smartredact-downloadBtn');
    const scanTreeObj = document.getElementById('e-pv-smartredact-treeViewScanObj');
    const selectedTreeObj = document.getElementById('e-pv-smartredact-treeViewSelectedObj');
    let scnaBtnObj = document.getElementById('e-pv-smartredact-redactScanBtn');
    let redactApplyBtnObj = document.getElementById('e-pv-smartredact-redactApplyBtn');
    let redactCancelBtnObj = document.getElementById('e-pv-smartredact-redactCancelBtn');
    const rightContainer = document.getElementById('e-pv-smartredact-right-container');
    const rightContainerBlack = document.getElementById('e-pv-smartredact-right-container-blackout');
    const fileUploadBtn =  document.getElementById('e-pv-smartredact-fileUpload');
    const zoomInBtn = document.getElementById('zoominButton');
    const zoomOutBtn = document.getElementById('zoomoutButton');
    const leftContainer = document.getElementById('e-pv-smartredact-left-container');
    const parentContainer = document.querySelector('.e-pv-viewer-container');
    let smartRedactContainerOpen: boolean = false;
    let isFindMobileDevice: boolean = false;
    let selectedTreeObjData: { [key: string]: Object }[] = [];
    let selectedTreeViewObj: TreeView = new TreeView();
    let redactionCount:number = 0;

    if(downloadBtn){
        downloadBtn.addEventListener('click', downloadClicked);
    }

    /* Function for the document download */
    function downloadClicked(){
        pdfviewer.download();
    }

    /* Function for the annotation add event */
    function annotationAdded(args:any){
        redactionCount++;
        updateRedactButton();
    }

    /* Function for the annotation remove event */
    function annotationRemove(args:any){
        const subject = args.annotationBounds.parentObj.properties.subject;
        selectedTreeViewObj.uncheckAll([subject]);
        redactionCount--;
        updateRedactButton();
    }

    /* Function for the pdfviewer created event */
    function sampleCreated(args:any) {
        const appbarContainer = document.getElementById('e-pv-smartredact-appbar-container');
        if(appbarContainer){
            appbarContainer.style.display = 'block';
        }
    }

    /* Function for the document load event */
    function documentLoaded(args:any){
        toolbarObj.hideItem(7,false);
        isMobileDevice();
        if(smartRedactContainerOpen){
            openSmartReact();
        }
        selectedTreeObjData = [];
        annotationCollection = [];
        redactionCount = 0;
        updateRedactButton();
    }

    /* Function for the enable or disable the redact button */
    function updateRedactButton(){
        const toolbarRedactBtn = document.getElementById('redactButton');
        if(redactionCount>0){
            if(toolbarRedactBtn) {
                toolbarObj.enableItems(toolbarRedactBtn, true);
                redactAIBtn.disabled = false;
                redactAIBtn.dataBind();
            }
        }
        else{
            if(toolbarRedactBtn) {
                toolbarObj.enableItems(toolbarRedactBtn, false);
                redactAIBtn.disabled = true;
                redactAIBtn.dataBind();
            }
        }
    }

    /* Initialize the Appbar */
    const defaultAppBarObj: AppBar = new AppBar({
        colorMode: 'Dark'
    });
    defaultAppBarObj.appendTo('#e-pv-smartredact-defaultappbar');
    let downloadBtnObj: Button = new Button({ cssClass: 'e-inherit', iconCss: 'e-icons e-download e-btn-icon e-icon-left', content: 'Download' });
    downloadBtnObj.appendTo('#e-pv-smartredact-downloadBtn');

    /* Initialize the Toolbar */
    let toolbarObj:Tool = new Tool({
        items: [
            { prefixIcon: 'e-icons e-folder', tooltipText: 'Open', text: 'Open File', id: 'openButton', cssClass: 'e-pv-open-container',click: openDocument },
            { type: "Separator", tooltipText: "separator" ,align: 'Left'},
            { prefixIcon: 'e-icons e-circle-remove', tooltipText: 'Zoom Out', text: 'Zoom Out', id: 'zoomoutButton', cssClass: 'e-pv-zoomout-container',click:zoomOutClicked },
            { prefixIcon: 'e-icons e-circle-add', tooltipText: 'Zoom In', text: 'Zoom In', id: 'zoominButton', cssClass: 'e-pv-zoomin-container',click:zoomInClicked },  
            { type: "Separator", tooltipText: "separator" },   
            { prefixIcon: 'e-icons e-pv-smartredact-mark-redact', tooltipText: 'Mark for Redaction', text: 'Mark for Redaction', id: 'markforRedaction', cssClass: 'e-pv-mark-container',click: applyRectangle },  
            { prefixIcon: 'e-icons e-redaction', tooltipText: 'Redaction', text: 'Redaction', id: 'redactButton', cssClass: 'e-pv-redact-container',click: redactionApply},
            { prefixIcon: 'e-icons e-redaction', tooltipText: 'Smart Redaction', text: 'Smart Redaction', id: 'smartredactButton', cssClass: 'e-pv-smartredact-container', align: 'Right',click: openSmartReact }
        ]
    });
    toolbarObj.appendTo('#e-pv-smartredact-toolbar');
    if (toolbarObj.element) {
        toolbarObj.hideItem(7,true);
    }

    /* Initialize the scan objects tree view */
    let treeObjData: { [key: string]: Object }[] = [
        { id: 1, name: 'Select All', hasChild: true, expanded: true, isChecked: true },
        { id: 2, pid: 1, name: 'Person Names' },
        { id: 3, pid: 1, name: 'Organization Names' },
        { id: 4, pid: 1, name: 'Email addresses' },
        { id: 5, pid: 1, name: 'Phone Numbers' },
        { id: 6, pid: 1, name: 'Addresses' },
        { id: 7, pid: 1, name: 'Dates' },
        { id: 8, pid: 1, name: 'Account Numbers' },
        { id: 9, pid: 1, name: 'Credit Card Numbers' }
    ];
    let treeObj: TreeView = new TreeView({
        fields: { dataSource: treeObjData, id: 'id', parentID: 'pid', text: 'name', hasChildren: 'hasChild'},
        showCheckBox: true,
    });
    treeObj.appendTo('#e-pv-smartredact-scantree');
    let scanBtn: Button = new Button({ content: 'Scan',isPrimary: true });
    scanBtn.appendTo('#e-pv-smartredact-redactScanBtn');
    let redactAIBtn: Button = new Button({ content: 'Redact',isPrimary: true });
    redactAIBtn.appendTo('#e-pv-smartredact-redactApplyBtn');
    let redactCancelBtn: Button = new Button({ content: 'Cancel' });
    redactCancelBtn.appendTo('#e-pv-smartredact-redactCancelBtn');

    if(rightContainer) {
        createSpinner({target: rightContainer});
        hideSpinner(rightContainer);
    }
    if(scnaBtnObj){
        scnaBtnObj.addEventListener('click', scanBtnClicked);
    }
    if(redactApplyBtnObj){
        redactApplyBtnObj.addEventListener('click', redactionApply);
    }
    if(redactCancelBtnObj){
        redactCancelBtnObj.addEventListener('click', redactCancel);
    }

    if(parentContainer) {
        parentContainer.addEventListener('touchstart',checkClickedDiv);
    }

    function checkClickedDiv(args:any) {
        if(Browser.isDevice && !isFindMobileDevice) { 
            if(rightContainer){
                rightContainer.style.display = 'none';
                smartRedactContainerOpen = false;
            }
        }
    }

    function isMobileDevice(): boolean {
        //Check if the device is mobile
        var isMobile = Browser.isDevice;
        var sampleContent = document.getElementById('e-pv-smart-redact-container')
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

    /* Filter the name from the collection */
    function getNamesByIds(ids: string[], data: { [key: string]: any }[]): string[] {
        return data
            .filter(item => ids.indexOf(item.id.toString()) !== -1) // Convert item.id to string for comparison
            .map(item => item.name);
    }

    /* Function for the aply rectangle annotation */
    function applyRectangle(){
        pdfviewer.rectangleSettings = {
            author: 'Redaction'
        };
        pdfviewer.annotation.setAnnotationMode('Rectangle');
    }
    interface Dimension {
        height: number;
        width: number;
        x: number;
        y: number;
        author: string;
        pageNumber: number;
        subject: string;
    }
    let annotationCollection: Dimension[] = [];

    /* Function for the redaction cancel button */
    function redactCancel(){
        if(rightContainer) {
            if(rightContainerBlack){
                rightContainerBlack.style.display = 'block';
            }
            showSpinner(rightContainer);
        }
        for(var i=0;i<annotationCollection.length;i++){
            if(annotationCollection[i].subject.includes("Details")){
                const filteredCollection = pdfviewer.annotationCollection.filter(item => item.subject === annotationCollection[i].subject);
                if(filteredCollection[0]) {
                    pdfviewer.annotationModule.deleteAnnotationById(filteredCollection[0].annotationId);
                }
            }
        }
        updateRedactButton();
        selectedTreeObjData = [];
        annotationCollection = [];
        if(rightContainer) {
            if(rightContainerBlack){
                rightContainerBlack.style.display = 'none';
            }
            hideSpinner(rightContainer);
        }
        if(scanTreeObj) {
            scanTreeObj.style.display = 'block';
        }
        if(selectedTreeObj){
            selectedTreeObj.style.display = 'none';
        }
    }

    /* Function for the redaction apply button */
    function redactionApply(){
        if(redactAIBtn.disabled == false) {
            pdfviewer.saveAsBlob().then(function (value) {
                if(rightContainer) {
                    if(rightContainerBlack){
                        rightContainerBlack.style.display = 'block';
                    }
                    showSpinner(rightContainer);
                }
                let data = value;
                let reader = new FileReader();
                reader.readAsDataURL(data);
                reader.onload = (e) => {
                    const base64String = e.target?.result as string;
                    sendRedactionequest(base64String);
                    selectedTreeObjData = [];
                    annotationCollection = [];
                    redactionCount = 0;
                };
            });
        }
    }

    /* Function for the send request for the redaction apply */
    function sendRedactionequest(data: string){
        var dictionary:any = {
            "hashId": data,
        };
        var post:any = JSON.stringify(dictionary);
        let url:any = "http://localhost:62869/api/pdfviewer/AIRedaction";
        let xhr:XMLHttpRequest = new XMLHttpRequest();
        xhr.open('Post', url, true);
        xhr.setRequestHeader('Content-type', 'application/json; charset=UTF-8');
        xhr.onload = function() {
            if (xhr.status >= 200 && xhr.status < 300) {
                let response = xhr.responseText;
                try {
                    if(rightContainer) {
                        if(rightContainerBlack){
                            rightContainerBlack.style.display = 'none';
                        }
                        hideSpinner(rightContainer);
                    }            
                    if(smartRedactContainerOpen){
                        openSmartReact();
                    }
                    pdfviewer.load(response,'null');              
                    if(scanTreeObj) {
                        scanTreeObj.style.display = 'none';
                    }
                    if(selectedTreeObj){
                        selectedTreeObj.style.display = 'none';
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
        xhr.send(post);
    }

    /* Fucntion for send request for the get details from the document */
    function scanBtnClicked(){
        if(rightContainer) {
            if(rightContainerBlack){
                rightContainerBlack.style.display = 'block';
            }
            showSpinner(rightContainer);
        }
        let data:any = pdfviewer.getRootElement();
        var hashId:any = data.ej2_instances[0].viewerBase.hashId;
        let selectedItems:string[] = treeObj.getAllCheckedNodes();
        const names:string[] = getNamesByIds(selectedItems, treeObjData);
        var dictionary:any = {
            "hashId": hashId
        };
        var post: any = JSON.stringify({
            jsonObject: dictionary,
            selectedItems: names
        });
        let url:any = "http://localhost:62869/api/pdfviewer/FindTextinDocument";
        let xhr:XMLHttpRequest = new XMLHttpRequest();
        xhr.open('Post', url, true);
        xhr.setRequestHeader('Content-type', 'application/json; charset=UTF-8');
        xhr.onload = function() {
            if (xhr.status >= 200 && xhr.status < 300) {
                let response = xhr.responseText;
                try {
                    let jsonResponse = JSON.parse(response);            
                    let count = 1;
                    let pidNumber;
                    let obj = {
                        id: `SelectAll`,name: `Select All`,expanded: true,hasChild: true,isChecked: true
                    };
                    selectedTreeObjData.push(obj);
                    for(var i=0;i<pdfviewer.viewerBase.pageCount;i++){
                        if(jsonResponse[i].length != 0) {
                            let obj = {
                                id: `Page${i+1}`,name: `Page ${i+1}`,pid: 'SelectAll',expanded: true,hasChild: true,isChecked: true
                            };
                            pidNumber = `Page${i+1}`;
                            selectedTreeObjData.push(obj);
                            for(var j=0;j<jsonResponse[i].length;j++) {
                                let content: string = (jsonResponse[i])[j].SensitiveInformation;
                                let obj = {
                                    id: `Details${count}`, name: `${content}`,pid: pidNumber
                                };
                                let annotObj:Dimension =  { width: (jsonResponse[i])[j].Bounds.Width,
                                height: (jsonResponse[i])[j].Bounds.Height,
                                x: (jsonResponse[i])[j].Bounds.X,
                                y: (jsonResponse[i])[j].Bounds.Y,
                                author: "Redaction",
                                pageNumber: i+1,
                                subject: `Details${count}` };
                                pdfviewer.annotation.addAnnotation("Rectangle",{
                                    width: (jsonResponse[i])[j].Bounds.Width,
                                    height: (jsonResponse[i])[j].Bounds.Height,
                                    offset: { x: (jsonResponse[i])[j].Bounds.X, y: (jsonResponse[i])[j].Bounds.Y },
                                    author: "Redaction",
                                    pageNumber: i+1,
                                    subject: `Details${count}`
                                } as RectangleSettings);
                                annotationCollection.push(annotObj);
                                selectedTreeObjData.push(obj);
                                count++;
                            }
                        }
                    }
                    selectedTreeViewObj.fields = { dataSource: selectedTreeObjData, id: 'id', parentID: 'pid', text: 'name', hasChildren: 'hasChild'};
                    selectedTreeViewObj.showCheckBox =  true;
                    selectedTreeViewObj.nodeChecked = nodeCheckedChange;
                    selectedTreeViewObj.nodeSelected = nodeSelected;
                    selectedTreeViewObj.dataBind();
                    if(rightContainer) {
                        if(rightContainerBlack){
                            rightContainerBlack.style.display = 'none';
                        }
                        hideSpinner(rightContainer);
                    }
                    if(scanTreeObj) {
                        scanTreeObj.style.display = 'none';
                    }
                    if(selectedTreeObj){
                        selectedTreeObj.style.display = 'block';
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
        xhr.send(post);
    }
    selectedTreeViewObj.appendTo("#e-pv-smartredact-selectedTree");

    /* Function for open the document */
    function openDocument(e: ClickEventArgs): void { 
        fileUploadBtn?.click();
    }

    /* Function for separate the page number */
    function separateNumbersAndStrings(input: string): number[] {
        const numbers: number[] = [];
        const regex = /\d+/g;
        let match: RegExpExecArray | null;
        while ((match = regex.exec(input)) !== null) {
            numbers.push(parseInt(match[0], 10));
        }
        return numbers;
    }

    /* Function for node selected event */
    function nodeSelected(args:any){
        if(args.nodeData.parentID){
            if(args.nodeData.parentID.includes('Page')){
                const pageNumber = separateNumbersAndStrings(args.nodeData.parentID);
                pdfviewer.navigation.goToPage(pageNumber[0]);
            }
            else {
                const pageNumber = separateNumbersAndStrings(args.nodeData.id);
                pdfviewer.navigation.goToPage(pageNumber[0]);
            }
        }
    }

    /* Function for node check event */
    function nodeCheckedChange(args:any){
        if(args.action == "check"){
            for(var i=0;i<args.data.length;i++){
                if(args.data[i].id.includes("Details")){
                    const filteredCollection = annotationCollection.filter(item => item.subject === args.data[i].id);
                    if(filteredCollection[0]){
                        pdfviewer.annotation.addAnnotation("Rectangle",{
                            width: filteredCollection[0].width,
                            height: filteredCollection[0].height,
                            offset: { x: filteredCollection[0].x, y: filteredCollection[0].y },
                            author: "Redaction",
                            pageNumber: filteredCollection[0].pageNumber,
                            subject: filteredCollection[0].subject
                        } as RectangleSettings);
                    }
                }
            }
            updateRedactButton();
        }
        if(args.action == "uncheck") {
            for(var i=0;i<args.data.length;i++){
                if(args.data[i].id.includes("Details")){
                    const filteredCollection = pdfviewer.annotationCollection.filter(item => item.subject === args.data[i].id);
                    if(filteredCollection[0]) {
                        pdfviewer.annotationModule.deleteAnnotationById(filteredCollection[0].annotationId);
                    }
                }
            }
            updateRedactButton();
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

    /* Open and close the right container */
    function openSmartReact(){
        if(!smartRedactContainerOpen) {
            if(!Browser.isDevice) { 
                if(leftContainer){
                    leftContainer.style.width = '70%';
                }
                pdfviewer.updateViewerContainer();
                toolbarObj.refreshOverflow();
            }
            if(rightContainer){
                rightContainer.style.display = 'block';
            }
            if(scanTreeObj) {
                scanTreeObj.style.display = 'block';
            }
            if(selectedTreeObj) {
                selectedTreeObj.style.display = 'none';
            }
            smartRedactContainerOpen = true;
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
            smartRedactContainerOpen = false;
        }
    }

    /* Function for the zoom in the pdfviewer */
    function zoomInClicked(args: ClickEventArgs): void {
        pdfviewer.magnification.zoomIn();
        updateZoomBtn();
    }

    /* Function for the zoom out the pdfviewer */
    function zoomOutClicked(args: ClickEventArgs): void {
        pdfviewer.magnification.zoomOut();
        updateZoomBtn();
    }

    /* Function for enable and disable zoom in adn zoom out button */
    function updateZoomBtn(){
        if(zoomInBtn && zoomOutBtn){
            if(pdfviewer.magnificationModule.zoomFactor == 4){
                toolbarObj.enableItems(zoomInBtn, false);
                toolbarObj.enableItems(zoomOutBtn, true);
            }
            else if(pdfviewer.magnificationModule.zoomFactor == 0.25){
                toolbarObj.enableItems(zoomInBtn, true);
                toolbarObj.enableItems(zoomOutBtn, false);
            }
            else {
                toolbarObj.enableItems(zoomInBtn, true);
                toolbarObj.enableItems(zoomOutBtn, true);
            }
        }
    }
    fileUploadBtn?.addEventListener('change', readFile, false);
}