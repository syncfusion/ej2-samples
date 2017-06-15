import { FormValidator, FormValidatorModel } from '@syncfusion/ej2-base';
import { Button } from '@syncfusion/ej2-buttons';

/**
 * FormValidator Sample
 */
export default () => {
    let customFn: (args: Object) => boolean = (args: {}) => {
        return (args as { value: string[] }).value.length <= 5;
    };
    let buttonFormValidate: Button = new Button();
    buttonFormValidate.appendTo('#validateSubmit');
    let buttonReset: Button = new Button();
    buttonReset.appendTo('#resetbtn');
    let options: FormValidatorModel = {
        rules: {
            Required: { required: true },
            Email: { required: true, email: true },
            Url: { url: true },
            Date: { date: true },
            DateISO: { dateIso: true },
            Number: { number: true },
            Digits: { digits: true },
            MaxLength: { maxLength: 5 },
            MinLength: { minLength: 5 },
            RangeLength: { rangeLength: [5, 10] },
            Range: { range: [5, 10] },
            Max: { max: 5 },
            Min: { min: 5 },
            Regex: { regex: ['^[A-z]+$', 'Allowed only alphabets'] },
            Custom: { custom: [customFn, 'Allowed char length is 5'] }
        },
        customPlacement: (inputElement: HTMLElement, errorElement: HTMLElement) => {
            inputElement.parentElement.appendChild(errorElement);
        }
    };

    let formObj: FormValidator;
    formObj = new FormValidator('#formId', options);
};