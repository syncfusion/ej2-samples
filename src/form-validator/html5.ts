import { loadCultureFiles } from '../common/culture-loader';
import { FormValidator, FormValidatorModel } from '@syncfusion/ej2-inputs';
import { Button } from '@syncfusion/ej2-buttons';

/**
 * FormValidator Sample
 */
(window as any).default = (): void => {
    loadCultureFiles();

    // Initialize Submit button
    let buttonFormValidate: Button = new Button({ isPrimary: true });
    buttonFormValidate.appendTo('#validateSubmit');

    // Initialize Reset button
    let buttonReset: Button = new Button();
    buttonReset.appendTo('#resetbtn');

    // Initialize Custom placement 
    let options: FormValidatorModel = {
        customPlacement: (inputElement: HTMLElement, errorElement: HTMLElement) => {
            inputElement.parentElement.appendChild(errorElement);
        }
    };

    // Initialize Form validation
    let formObj: FormValidator;
    formObj = new FormValidator('#formId', options);
    let formId: HTMLElement = <HTMLElement>document.getElementById('formId');
    document.getElementById('formId').addEventListener('submit', (e: Event) => {
        e.preventDefault();
        if (formObj.validate()) {
            alert('Your form has been submitted.');
            formObj.reset();
        }
    });
};