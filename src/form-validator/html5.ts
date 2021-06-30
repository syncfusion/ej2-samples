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

    document.getElementById('minlen').addEventListener('change', (e: Event) => {
        let floatElementInput: HTMLInputElement = e.currentTarget as HTMLInputElement;
        let floatElement: Element = floatElementInput.parentElement.getElementsByClassName('e-float-text')[0];
        if (floatElementInput.value.length > 0) {
            floatElement.classList.remove('e-label-bottom');
            floatElement.classList.add('e-label-top');
        } else {
            floatElement.classList.remove('e-label-top');
            floatElement.classList.add('e-label-bottom');
        }
    });
};