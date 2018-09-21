import { Dialog } from '@syncfusion/ej2-popups';
import { Button } from '@syncfusion/ej2-buttons';
import { CheckBox, ChangeEventArgs } from '@syncfusion/ej2-buttons';

/**
 * Modal Dialog sample
 */

this.default = () => {
    // Rendering modal Dialog by enabling 'isModal' as true
    let dialogObj: Dialog = new Dialog({
        width: '335px',
        header: 'Software Update',
        content: 'Your current software version is up to date.',
        target: document.getElementById('target'),
        isModal: true,
        animationSettings: { effect: 'None' },
        buttons: [{
            click: dlgButtonClick,
            buttonModel: { content: 'OK', isPrimary: true }
        }],
        open: dialogOpen,
        close: dialogClose
    });
    dialogObj.appendTo('#modalDialog');
    document.getElementById('dialogBtn').focus();

    let checkBoxObj: CheckBox = new CheckBox({ checked: false, change: onChange });
    checkBoxObj.appendTo('#checkbox');

    // Button has been created to open the modal Dialog
    let button: Button = new Button({
    });
    button.appendTo('#dialogBtn');
    document.getElementById('dialogBtn').onclick = (): void => {
        dialogObj.show();
    };

    // Dialog will be closed, while clicking 'OK' button of the Dialog
    function dlgButtonClick(): void {
        dialogObj.hide();
    }

    // 'Open' Button will be shown, if modal Dialog is closed
    function dialogClose(): void {
        document.getElementById('dialogBtn').style.display = 'block';
    }

    // 'Open' Button will be hidden, if modal Dialog is opened
    function dialogOpen(): void {
        document.getElementById('dialogBtn').style.display = 'none';
    }
    // Dialog will be closed, while clicking on overlay
    function onChange(args: ChangeEventArgs): void {
        if (args.checked) {
            dialogObj.overlayClick = (): void => {
                dialogObj.hide();
            };
        } else {
            dialogObj.overlayClick = (): void => {
                dialogObj.show();
            };
        }
    }
};