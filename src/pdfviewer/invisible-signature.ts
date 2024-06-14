import { loadCultureFiles } from '../common/culture-loader';
import {
    PdfViewer, FormFields, Toolbar, Magnification, Navigation, LinkAnnotation, Annotation, BookmarkView, ThumbnailView, Print,
    PageChangeEventArgs, LoadEventArgs, TextSearch, TextSelection, FormDesigner, PageOrganizer
} from '@syncfusion/ej2-pdfviewer';
import { Toolbar as Tool, TreeView, NodeSelectEventArgs } from '@syncfusion/ej2-navigations';
import { ClickEventArgs, Button, CheckBox, ChangeEventArgs } from '@syncfusion/ej2-buttons';
import { Dialog } from '@syncfusion/ej2-popups';
import { Message } from '@syncfusion/ej2-notifications/src/message/message';

PdfViewer.Inject(FormDesigner, FormFields, Toolbar, Magnification, Navigation, LinkAnnotation, Annotation, BookmarkView, ThumbnailView, Print, TextSearch, TextSelection, PageOrganizer);


/**
 * Default PdfViewer sample
 */
let toolbarObj: Tool;
let viewer: PdfViewer;
let msgWarning: Message;
let msgError: Message;
let msgSuccess: Message;
//Specifies the visibility of the complete signing.
let buttonVisibility: boolean = true;
//Specifies the visibility of the download icon
let downloadVisibility: boolean = true;
let successVisible: boolean = false;
let errorVisible: boolean = false;
let warningVisible: boolean = false;
let documentData: string;
let fileName:any;
// Specifies whether the document has a digital signature or not.
let hasDigitalSignature: boolean = false;
 //Downloads the PDF document being loaded in the PDFViewer.
function downloadClicked(args: ClickEventArgs): void {
    viewer.download();
}



function openDocument(e: ClickEventArgs): void {
    document.getElementById('fileUpload').click();
}
function signDocument(e: ClickEventArgs): void {
    viewer.serverActionSettings.download = 'AddSignature';
    let data: any;
    let base64data: any;
    viewer.saveAsBlob().then(function (value) {
        data = value;
        var reader = new FileReader();
        reader.readAsDataURL(data);
        reader.onload = () => {

            base64data = reader.result;
            documentData = base64data;
            viewer.load(base64data, null);
            toolbarObj.items[1].disabled = true;
            toolbarObj.items[2].disabled = false;
            viewer.fileName = fileName;
            viewer.downloadFileName = fileName;
        };

    });
    viewer.serverActionSettings.download = 'Download';
}
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
                toolbarObj.items[2].disabled = true;
                let uploadedFileUrl: string = e.currentTarget.result;
                documentData = uploadedFileUrl;
                viewer.load(uploadedFileUrl, null);
                viewer.fileName = fileName;
                viewer.downloadFileName = fileName;
            };
        }
    }
}

(window as any).default = (): void => {
    loadCultureFiles();
    toolbarObj = new Tool({
        items: [
            { prefixIcon: 'e-icons e-folder-open', cssClass: "e-pv-open-document-container", tooltipText: 'Open file', id: 'openButton', click: openDocument.bind(this), align: "Left" },
            { text: "Complete Signing", width: "150px", disabled: buttonVisibility, align: "Right", tooltipText: "Finish Signing", id: "pdfviewer_sign", click: signDocument.bind(this), cssClass: "e-pv-button-container" },
            { prefixIcon: 'e-icons e-download', tooltipText: 'Download', align: 'Right', click: downloadClicked.bind(this), disabled: downloadVisibility, cssClass: "e-pv-download-document-container" }
        ]
    });
    toolbarObj.appendTo('#topToolbar');
    viewer = new PdfViewer({
        enableToolbar: false,
        enableNavigationToolbar: false,
        documentPath: 'InvisibleDigitalSignature.pdf',
        enableThumbnail: false,
        serviceUrl: 'https://services.syncfusion.com/js/production/api/pdfviewer'
    });
    viewer.enableTextSelection=true;
    viewer.downloadFileName = 'InvisibleDigitalSignature.pdf';
    viewer.addSignature = (args) => {
        let field: any;
        //To retrieve the form fields in the loaded PDF Document.
        field = viewer.retrieveFormFields();
        let signatureFieldCount = 0;
        let signaturesCount = 0;
        for (var i = 0; i < field.Count; i++) {
            if (field[i].Type.ToString() == ("SignatureField")) {
                signatureFieldCount++;
            }
            if (field[i].Value != "" && field[i].Value != null && field[i].Type.ToString() == ("SignatureField")) {
                signaturesCount++;
            }
        }
        // Checks whether all the signature fields are signed or not.
        if (signatureFieldCount == signaturesCount) {
            //Checks whether the document has a digital signature or not.
            if (!hasDigitalSignature) {
                buttonVisibility = false;
                toolbarObj.items[1].disabled = false;
            }
        }

    };
    viewer.documentLoad = (args) => {
        fileName = args.documentName;
        const postData: any = {
            documentData: documentData
        };
        let options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(postData)
        };
        const apiUrl = 'https://services.syncfusion.com/js/production/api/pdfviewer/ValidateSignature';
        fetch(apiUrl, options)
            .then(response => response.json())
            .then(body => {
                if (body.successVisible || body.warningVisible || body.errorVisible)
                    toolbarObj.items[1].disabled = true;
                if (!body.downloadVisibility)
                    toolbarObj.items[2].disabled = false;
                if ((body.successVisible)) {
                    setTimeout(() => {
                        msgSuccess.content = body.message;
                        msgSuccess.visible = true;
                    }, 1000);
                    setTimeout(() => {
                        msgSuccess.visible = false;
                    }, 5000);
                }
                if ((body.warningVisible)) {
                    msgWarning.content = body.message;
                    msgWarning.visible = true;
                }
                if (body.errorVisible) {
                    msgError.content = body.message;
                    msgError.visible = true;
                }

            });


    };
    viewer.appendTo('#pdfViewer');
    document.getElementById('fileUpload').addEventListener('change', readFile, false);
    msgSuccess = new Message({
        severity: "Success",
        visible: successVisible
    });
    msgSuccess.appendTo('#msg_success');

    msgWarning = new Message({
        severity: "Warning",
        visible: warningVisible
    });
    msgWarning.appendTo('#msg_warning'); 

    msgError = new Message({
        severity: "Error",
        visible: errorVisible
    });
    msgError.appendTo('#msg_error');

}; 