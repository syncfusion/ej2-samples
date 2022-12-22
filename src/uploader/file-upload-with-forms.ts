import { loadCultureFiles } from '../common/culture-loader';

import { FormValidator } from '@syncfusion/ej2-inputs';
import { Uploader } from '@syncfusion/ej2-inputs';
import { Dialog } from '@syncfusion/ej2-popups';

/**
 * Uploader form support sample
 */
(window as any).default = (): void => {
    loadCultureFiles();
    // Initialize the uploader component
    let uploadObj: Uploader = new Uploader({
        autoUpload: false,
        selected: onFileSelect,
        allowedExtensions: 'image/*',
        multiple: false

    });
    uploadObj.appendTo('#fileupload');

    document.getElementById('browse').onclick = () => {
        document.getElementsByClassName('e-file-select-wrap')[0].querySelector('button').click(); return false;
    };
    function onFileSelect(args: any): void {
        let inputElement: HTMLInputElement  = document.getElementById('upload') as HTMLInputElement;
        inputElement.value = args.filesData[0].name;
        formObj.validate('upload');
    }

    let options: any  = {
        // Initialize the CustomPlacement.
        customPlacement: (inputElement: Element, errorElement: Element) => {
            inputElement = inputElement.closest('.form-group').querySelector('.error');
            inputElement.parentElement.appendChild(errorElement);
        },
        rules: {
            'Name': {
                required: true
            },
            'Email': {
                required: true
            },
            'upload': {
                required: true
            }
        }
    };

    let formObj: FormValidator = new FormValidator('#form1', options);

    function onFormSubmit(): void {
    let formStatus: Boolean = formObj.validate();
    if (formStatus) {
            formObj.element.reset();
            confirm.show();
        }
    }

    let confirm: Dialog = new Dialog({
        width: '335px',
        visible: false,
        header: 'Success',
        content: 'Your details have been updated successfully, Thank you.',
        target: document.getElementById('control_wrapper'),
        showCloseIcon: true,
        isModal: true,
        animationSettings: {
            effect: 'Zoom'
        }
    });
    confirm.appendTo('#confirmationDialog');

    document.getElementById('submit-btn').onclick = (args) => {
        onFormSubmit();
        args.preventDefault();
    };
};