import { FormValidator, FormValidatorModel } from '@syncfusion/ej2-inputs';
import { Button } from '@syncfusion/ej2-buttons';
import { DatePicker } from '@syncfusion/ej2-calendars';
import { RadioButton } from '@syncfusion/ej2-buttons';

/**
 * FormValidator Sample
 */
//ts-lint: disable
export default () => {

    let prevButton: Button = new Button({ isPrimary: true });
    prevButton.appendTo('#prevBtn');

    let nextButton: Button = new Button({ isPrimary: true });
    nextButton.appendTo('#nextBtn');

    let datepicker: DatePicker = new DatePicker({ placeholder: 'Choose Your DOB' });
    datepicker.appendTo('#datepicker');


    let options: FormValidatorModel = {
        customPlacement: (inputElement: HTMLElement, errorElement: HTMLElement) => {
            inputElement.parentElement.appendChild(errorElement);
        }
    };

    let formObj: FormValidator;
    formObj = new FormValidator('#formId', options);
    let currentTab: number = 0;

    let displayTab: any = (n: any): any => {
        let x: any = document.getElementsByClassName('tab');
        x[n].style.display = 'block';
        if (n === 0) {
            document.getElementById('prevBtn').style.display = 'none';
        } else {
            document.getElementById('prevBtn').style.display = 'inline';
        }
        if (n === (x.length - 1)) {
            document.getElementById('nextBtn').innerHTML = 'Submit';
        } else {
            document.getElementById('nextBtn').innerHTML = 'Next';
        }
    };
    displayTab(currentTab);
    let validateForm: Function = (): Boolean => {
        let valid: Boolean = true;
        let x: any = document.getElementsByClassName('tab');
        let y: any = x[currentTab].getElementsByTagName('input');
        for (let i: number = 0; i < y.length; i++) {
            formObj.validate(y[i].getAttribute('name'));
            if (y[i].getAttribute('aria-invalid') === 'true') {
                valid = false;
            }
        }
        return valid;
    };

    let tabNav: any = (n: number): any => {
        let x: any = document.getElementsByClassName('tab');
        if (n === 1 && !validateForm()) {
            return false;
        }
        x[currentTab].style.display = 'none';
        currentTab = currentTab + n;
        if (currentTab >= x.length) {
            (<HTMLInputElement>document.getElementById('nextBtn')).type = 'submit';
            if (formObj.validate()) {
                displayTab(0);
                alert('Account has been created.');
                formObj.reset();
            }
        }
        displayTab(currentTab);
    };

    let nextBtn: HTMLElement = document.getElementById('nextBtn');
    nextBtn.addEventListener('click', () => {
        tabNav(1);
    });

    let prevBtn: HTMLElement = document.getElementById('prevBtn');
    prevBtn.addEventListener('click', () => {
        tabNav(-1);
    });

    let radioButton: RadioButton = new RadioButton({
        label: 'Male',
        name: 'Gender',
        value: 'm',
        checked: true
    });
    radioButton.appendTo('#radio1');

    let radioButton2: RadioButton = new RadioButton({
        label: 'Female',
        name: 'Gender',
        value: 'fm'
    });
    radioButton2.appendTo('#radio2');

    let submit: any = (event: any) => {
        // Validate the form from external validate method
        let formStatus: Boolean = formObj.validate();
        if (formStatus) {
            formObj.element.reset();
        }
    };
};