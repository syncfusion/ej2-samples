
import { Uploader } from '@syncfusion/ej2-inputs';
import { detach } from '@syncfusion/ej2-base';
import { createSpinner, showSpinner, hideSpinner } from '@syncfusion/ej2-popups';

/**
 * Uploader preload functionalities sample
 */
this.default = () => {
    let dropElement: HTMLElement = document.getElementsByClassName('control-fluid')[0] as HTMLElement;
    // Define the set of file details in FilesInfo[] type.
    let preloadFiles: any = [
        {name: 'Nature', size: 500000, type: '.png'},
        {name: 'TypeScript Succintly', size: 12000, type: '.pdf'},
        {name: 'ASP.NET Webhooks', size: 500000, type: '.docx'},
    ];
    //Initialize the control by preload files 
    let uploadObj: Uploader = new Uploader({
        asyncSettings: {
            saveUrl: 'https://aspnetmvc.syncfusion.com/services/api/uploadbox/Save',
            removeUrl: 'https://aspnetmvc.syncfusion.com/services/api/uploadbox/Remove'
        },
        files: preloadFiles,
        removing: onRemove,
        failure: onUploadFail,
        success: onUploadSuccess,
        dropArea: dropElement
    });
    uploadObj.appendTo('#fileupload');

    document.getElementById('clearbtn').onclick = () => {
        uploadObj.clearAll();
    };

    function onRemove(args: any): void {
        let li: HTMLElement = this.uploadWrapper.querySelector('[data-file-name="' + args.filesData[0].name + '"]');
        if (li.classList.contains('e-icon-spinner')) { return; }
        generateSpinner(this.uploadWrapper);
    }
    function onUploadFail(args: any): void {
        let li: HTMLElement = this.uploadWrapper.querySelector('[data-file-name="' + args.file.name + '"]');
        li.classList.add('e-icon-spinner');
    }
    function onUploadSuccess(args: any): void {
        if (args.operation === 'remove') {
            // remove spinner
            hideSpinner(this.uploadWrapper);
            detach(this.uploadWrapper.querySelector('.e-spinner-pane'));
        } else {
            let li: HTMLElement = this.uploadWrapper.querySelector('[data-file-name="' + args.file.name + '"]');
            li.classList.add('e-icon-spinner');
            (li.querySelector('.e-icons') as HTMLElement).onclick = () => {
                generateSpinner(this.uploadWrapper);
            };
            (li.querySelector('.e-icons') as HTMLElement).onkeydown = (e: any) => {
                if (e.keyCode === 13) {
                    generateSpinner(e.target.closest('.e-upload'));
                }
            };
        }
    }
    function generateSpinner(targetElement: HTMLElement): void {
        createSpinner({ target: targetElement, width: '25px' });
        showSpinner(targetElement);
    }
};