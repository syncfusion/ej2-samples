
import { Uploader, FileInfo, SelectedEventArgs } from '@syncfusion/ej2-inputs';
import { detach } from '@syncfusion/ej2-base';
import { createSpinner, showSpinner, hideSpinner } from '@syncfusion/ej2-popups';
/**
 * Uploader file size and files count validation sample
 */
this.default = () => {

    let dropElement: HTMLElement = document.getElementsByClassName('control-fluid')[0] as HTMLElement;

    // Initialize the control with file validation
    let uploadObj: Uploader = new Uploader({
        autoUpload: false,
        minFileSize: 10000,
        allowedExtensions: '.doc, .docx, .xls, .xlsx',
        asyncSettings: {
            saveUrl: 'https://aspnetmvc.syncfusion.com/services/api/uploadbox/Save',
            removeUrl: 'https://aspnetmvc.syncfusion.com/services/api/uploadbox/Remove'
        },
        selected: onFileSelected,
        success: onUploadSuccess,
        dropArea: dropElement
    });
    uploadObj.appendTo('#validation');

    function onFileSelected(args : SelectedEventArgs) : void {
        // Filter the 5 files only to showcase
        args.filesData.splice(5);
        let filesData : FileInfo[] = uploadObj.getFilesData();
        let allFiles : FileInfo[] = filesData.concat(args.filesData);
        if (allFiles.length > 5) {
            for (let i : number = 0; i < allFiles.length; i++) {
                if (allFiles.length > 5) {
                    allFiles.shift();
                }
            }
            args.filesData = allFiles;
            // set the modified custom data
            args.modifiedFilesData = args.filesData;
        }
        args.isModified = true;
    }

    function onUploadSuccess(args: any): void {
        let li: HTMLElement = this.uploadWrapper.querySelector('[data-file-name="' + args.file.name + '"]');
        if (args.operation === 'upload') {
            (li.querySelector('.e-file-delete-btn') as HTMLElement).onclick = () => {
                generateSpinner(this.uploadWrapper);
            };
            (li.querySelector('.e-file-delete-btn') as HTMLElement).onkeydown = (e: any) => {
                if (e.keyCode === 13) {
                    generateSpinner(e.target.closest('.e-upload'));
                }
            };
        } else {
            hideSpinner(this.uploadWrapper);
            detach(this.uploadWrapper.querySelector('.e-spinner-pane'));
        }
    }

    function generateSpinner(targetElement: HTMLElement): void {
        createSpinner({ target: targetElement, width: '25px' });
        showSpinner(targetElement);
    }
};