
import { Uploader } from '@syncfusion/ej2-inputs';
import { detach } from '@syncfusion/ej2-base';
import { CheckBox, ChangeEventArgs } from '@syncfusion/ej2-buttons';
import { createSpinner, showSpinner, hideSpinner } from '@syncfusion/ej2-popups';

/**
 * Uploader default functionalities sample
 */
this.default = () => {

    let dropElement: HTMLElement = document.getElementsByClassName('control-fluid')[0] as HTMLElement;
    // Initialize the uploader component
    let uploadObj: Uploader = new Uploader({
        asyncSettings: {
            saveUrl: 'https://aspnetmvc.syncfusion.com/services/api/uploadbox/Save',
            removeUrl: 'https://aspnetmvc.syncfusion.com/services/api/uploadbox/Remove'
        },
        success: onUploadSuccess,
        dropArea: dropElement
    });
    uploadObj.appendTo('#fileupload');


    // initialize check box component
    let checkBoxObj: CheckBox = new CheckBox({
        checked: true,
        label: 'Auto Upload',
        change: (args: ChangeEventArgs) => {
            uploadObj.autoUpload = args.checked;
            if (uploadObj.element.closest('.e-upload').querySelector('.e-spinner-pane')) {
                detach((uploadObj.element.closest('.e-upload').querySelector('.e-spinner-pane')));
            }
            uploadObj.clearAll();
        }
    });
    checkBoxObj.appendTo('#checkAutoUpload');

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