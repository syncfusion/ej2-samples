import { loadCultureFiles } from '../common/culture-loader';
import { OtpInput } from "@syncfusion/ej2-inputs";

(window as any).default = (): void => {
    loadCultureFiles();

    let numberOtp: OtpInput = new OtpInput({
        value: "1234",
        type: 'number'
    });
    numberOtp.appendTo('#numberOtp');

    let textOtp: OtpInput = new OtpInput({
        value: "e3c7",
        type: 'text'
    });
    textOtp.appendTo("#textOtp");

    let passwordOtp: OtpInput = new OtpInput({
        value: "1234",
        type: 'password'
    });
    passwordOtp.appendTo("#passwordOtp");
};
