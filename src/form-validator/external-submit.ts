import { loadCultureFiles } from '../common/culture-loader';
import { FormValidator, Slider } from '@syncfusion/ej2-inputs';
import { Button } from '@syncfusion/ej2-buttons';
import { Dialog } from '@syncfusion/ej2-popups';
import { Uploader, NumericTextBox } from '@syncfusion/ej2-inputs';

/**
 * FormValidator Sample
 */
(window as any).default = (): void => {
    loadCultureFiles();

    let options: any = {
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
            'Emp': {
                required: true
            },
            'cSalary': {
                required: true
            }
        }
    };

    // Initialize the FormValidator.
    let formObj: FormValidator = new FormValidator('#formId', options);

    // Initialize external Button  and handle the form submit from external Button click action.
    let externalButton: Button = new Button({ isPrimary: true });
    externalButton.appendTo('#submitBtn');

    let externalSubmit: any = (event: any): any => {
        // Validate the form from external validate method
        let formStatus: Boolean = formObj.validate();
        if (formStatus) {
            formObj.element.reset();
            resume.remove();
            confirm.show();
        }
    };

    // Initialize Current Salary with currency textbox
    let currentSalary: NumericTextBox = new NumericTextBox({
        format: 'c2',
        placeholder: 'Current Salary',
        floatLabelType: 'Auto'
    });
    currentSalary.appendTo('#current-salary');

    // Add mousedown event to external button element
    document.getElementById('submitBtn').addEventListener('mousedown', externalSubmit);

    // Initialize the Resume with uploader
    let resume: Uploader = new Uploader({
        autoUpload: false,
        allowedExtensions: '.doc, .docx'
    });
    resume.appendTo('#resume');
    resume.buttons = {
        browse: 'Browse'
    };
    resume.dataBind();

    // Initialize the Expected Salary with slider
    let expectedSalary: Slider = new Slider({
        value: [0.2, 0.4],
        min: 0,
        max: 1,
        type: 'Range',
        step: 0.2,
        tooltip: { placement: 'Before', isVisible: true, format: 'P0' },
        ticks: { placement: 'After', largeStep: 0.1, smallStep: 0, showSmallTicks: true, format: 'P0' }
    });
    expectedSalary.appendTo('#expected-salary');

    // Intialization the confirmation popup using dialog
    let confirm: Dialog = new Dialog({
        width: '335px',
        visible: false,
        content: 'We appreciate your interest in our company. We will validate your profile and contact you soon...',
        target: document.getElementById('confirmation'),
        isModal: true,
        animationSettings: {
            effect: 'Zoom'
        }
    });
    confirm.appendTo('#confirmationDialog');

    confirm.overlayClick = () => {
        confirm.hide();
    };
};