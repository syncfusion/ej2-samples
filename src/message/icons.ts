import { loadCultureFiles } from '../common/culture-loader';
/**
 *  Message with icon sample
 */
import { CheckBox, ChangeEventArgs, Button } from '@syncfusion/ej2-buttons';
import { Message } from '@syncfusion/ej2-notifications';
import { getComponent } from '@syncfusion/ej2-base';

(window as any).default = (): void => {
    loadCultureFiles();
    let showButton: Button = new Button({ content: 'Show Default Message', cssClass: "e-outline e-primary msg-hidden" });
    showButton.appendTo('#btn1');
    showButton.element.onclick = (): void => {
        show(msgDefaultIcon, showButton);
    }

    let infoButton: Button = new Button({ content: 'Show Info Message', cssClass: "e-outline e-primary e-info msg-hidden" });
    infoButton.appendTo('#btn2');
    infoButton.element.onclick = (): void => {
        show(msgInfoIcon, infoButton);
    }
    let successButton: Button = new Button({ content: 'Show Success Message', cssClass: "e-outline e-primary e-success msg-hidden" });
    successButton.appendTo('#btn3');
    successButton.element.onclick = (): void => {
        show(msgSuccessIcon, successButton);
    }

    let warningButton: Button = new Button({ content: 'Show Warning Message', cssClass: "e-outline e-primary e-warning msg-hidden" });
    warningButton.appendTo('#btn4');
    warningButton.element.onclick = (): void => {
        show(msgWarningIcon, warningButton);
    }

    let errorButton: Button = new Button({ content: 'Show Error Message', cssClass: "e-outline e-primary e-danger msg-hidden" });
    errorButton.appendTo('#btn5');
    errorButton.element.onclick = (): void => {
        show(msgErrorIcon, errorButton);
    }

    let msgDefaultIcon: Message = new Message({
        content: "Editing is restricted",
        showCloseIcon: true,
        closed: () => {
            showButton.element.classList.remove('msg-hidden');
        }
    });
    msgDefaultIcon.appendTo('#msg_default_icon');

    let msgInfoIcon: Message = new Message({
        content: "Please read the comments carefully",
        severity: "Info",
        showCloseIcon: true,
        closed: () => {
            infoButton.element.classList.remove('msg-hidden');
        }
    });
    msgInfoIcon.appendTo('#msg_info_icon');

    let msgSuccessIcon: Message = new Message({
        content: "Your message has been sent successfully",
        severity: "Success",
        showCloseIcon: true,
        closed: () => {
            successButton.element.classList.remove('msg-hidden');
        }
    });
    msgSuccessIcon.appendTo('#msg_success_icon');

    let msgWarningIcon: Message = new Message({
        content: "There was a problem with your network connection",
        severity: "Warning",
        showCloseIcon: true,
        closed: () => {
            warningButton.element.classList.remove('msg-hidden');
        }
    });
    msgWarningIcon.appendTo('#msg_warning_icon');

    let msgErrorIcon: Message = new Message({
        content: "A problem occurred while submitting your data",
        severity: "Error",
        showCloseIcon: true,
        closed: () => {
            errorButton.element.classList.remove('msg-hidden');
        }
    });
    msgErrorIcon.appendTo('#msg_error_icon');

    let severityCheckbox: CheckBox = new CheckBox({
        label: 'Severity Icon',
        name: 'icons',
        value: 'severity-icon',
        checked: true,
        change: (args: ChangeEventArgs) => {
            changeProp("showIcon", args.checked);
        }
    });
    severityCheckbox.appendTo('#showIcon');

    let CloseCheckbox: CheckBox = new CheckBox({
        label: 'Close Icon',
        name: 'icons',
        value: "close-icon",
        checked: true,
        change: (args: ChangeEventArgs) => {
            changeProp("showCloseIcon", args.checked);
        }
    });
    CloseCheckbox.appendTo('#showCloseIcon');

    function show(message: Message, btn: Button): void {
        message.visible = true;
        btn.element.classList.add('msg-hidden');
    }

    function changeProp(prop: string, value: boolean): void {
        let msgTypes: string[] = ["default", "info", "success", "warning", "error"];
        for (let i: number = 0; i <= 4; i++) {
            let msgObj: Message = getComponent(document.getElementById("msg_" + msgTypes[i] + "_icon"), "message") as Message;
            if (msgObj) {
                if (value) {
                    msgObj[prop] = true;
                } else {
                    msgObj[prop] = false;
                }
            }
        }
    }
};
