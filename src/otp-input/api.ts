import { loadCultureFiles } from '../common/culture-loader';
import { OtpInput, TextBox, NumericTextBox, OtpInputEventArgs } from "@syncfusion/ej2-inputs";
import { Switch } from '@syncfusion/ej2-buttons';
import { DropDownList } from '@syncfusion/ej2-dropdowns';

(window as any).default = (): void => {
    loadCultureFiles();

    const basicOtp: OtpInput = new OtpInput({
        separator: "-",
        placeholder: "X",
        input: handleOtpChange
    });
    basicOtp.appendTo("#basicOtp");

    const disableSwitch: Switch = new Switch({
        change: (args) => {
            basicOtp.disabled = args.checked
        }
    });
    disableSwitch.appendTo('#disabled');

    const lengthTextBox: NumericTextBox = new NumericTextBox({
        min: 1,
        max: 6,
        value: 4,
        format: '0',
        change: (args) => {
            let value = parseInt(args.value);
            if (!args.value) {
                lengthTextBox.value = value = 1;
                lengthTextBox.dataBind();
            }
            basicOtp.length = value;
            (document.getElementById('placeholder') as HTMLInputElement).maxLength = basicOtp.length;
        }
    });
    lengthTextBox.appendTo('#length');

    const separatorTextBox: TextBox = new TextBox({
        cssClass: 'e-underline',
        input: (args) => {
            basicOtp.separator = args.value;
        }
    });
    separatorTextBox.appendTo('#separator');

    const placeholderTextBox: TextBox = new TextBox({
        cssClass: 'e-underline',
        input: (args) => {
            basicOtp.placeholder = args.value;
        }
    });
    placeholderTextBox.appendTo('#placeholder');

    const stlyingModeList: DropDownList = new DropDownList({
        index: 0,
        popupHeight: '200px',
        change: () => {
            basicOtp.stylingMode = (stlyingModeList.value as string);
        }
    });
    stlyingModeList.appendTo('#otpStylingMode');

    const validationList: DropDownList = new DropDownList({
        index: 0,
        popupHeight: '200px',
        change: () => {
            basicOtp.cssClass = (validationList.value == "") ? "" : "e-" + (validationList.value as string);
        }
    });
    validationList.appendTo('#otpValidation');

    /* OTP Validation & Submission */
    const verifyBtn = document.getElementById('verify-btn') as HTMLButtonElement;
    const resetBtn = document.getElementById('reset-btn') as HTMLButtonElement;

    function handleOtpChange(event: OtpInputEventArgs) {
        const otpLength = event.value.toString().length;
        verifyBtn.disabled = otpLength !== basicOtp.length;
        resetBtn.disabled = !otpLength;
    }

    resetBtn.addEventListener('click', () => {
        basicOtp.value = '';
        verifyBtn.disabled = resetBtn.disabled = true;
    });

    verifyBtn.addEventListener('click', () => {
        alert(`Entered OTP value is : ${basicOtp.value}`);
    });
};
