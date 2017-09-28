import { FormValidator, FormValidatorModel } from '@syncfusion/ej2-inputs';
import { Button } from '@syncfusion/ej2-buttons';

/**
 * FormValidator Sample
 */
export default () => {

    // Submit button
    let buttonFormValidate: Button = new Button();
    buttonFormValidate.appendTo('#validateSubmit');

    // Reset button
    let buttonReset: Button = new Button();
    buttonReset.appendTo('#resetbtn');

    //Custom placement 
    let options: FormValidatorModel = {
        customPlacement: (inputElement: HTMLElement, errorElement: HTMLElement) => {
            inputElement.parentElement.appendChild(errorElement);
        }
    };

    //Form validation
    let formObj: FormValidator;
    formObj = new FormValidator('#formId', options);
};