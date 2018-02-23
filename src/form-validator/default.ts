import { FormValidator, FormValidatorModel } from '@syncfusion/ej2-inputs';
import { Button } from '@syncfusion/ej2-buttons';
/**
 * FormValidator Sample
 */

export default () => {

    // Initialize Submit button
    let buttonFormValidate: Button = new Button({ isPrimary: true });
    buttonFormValidate.appendTo('#validateSubmit');
    // Initialize Reset button
    let buttonReset: Button = new Button({});
    buttonReset.appendTo('#resetbtn');
    // Initialize Custom placement 
    let option: FormValidatorModel = {
        rules: {
            // Initialize the CustomPlacement.
            User: { required: true },
            DOB: { date: [true, 'Enter valid format'] },
            Email: { email: [true, 'Enter valid Email'] },
            City: { required: true },
            State: { required: true },
        }
    };
    // Initialize Form validation
    let formObj: FormValidator;
    formObj = new FormValidator('#formId', option);
    let formId: HTMLElement = <HTMLElement>document.getElementById('formId');
    document.getElementById('formId').addEventListener(
        'submit',
        (e: Event) => {
            e.preventDefault();
            if (formObj.validate()) {
                alert('Customer details added!');
                formObj.reset();
            }
        });
};