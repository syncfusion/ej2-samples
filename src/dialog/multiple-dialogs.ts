import { enableRipple } from '@syncfusion/ej2-base';
enableRipple(true);
import { Dialog } from '@syncfusion/ej2-popups';
import { Button } from '@syncfusion/ej2-buttons';
/**
 * Multiple Dialogs sample
 */
this.default = () => {
    let dialogObj: Dialog = new Dialog({
        header: 'First Dialog',
        target: document.getElementById('target'),
        animationSettings: { effect: 'None' },
        showCloseIcon: true,
        height: 260,
        width: 330,
        buttons: [{
            click: dlgButtonClick,
            buttonModel: { content: 'Next', isPrimary: true }
        }],
        open: dialogOpen,
        close: dialogClose
    });
    dialogObj.appendTo('#defaultDialog');

    let dialogObj2: Dialog = new Dialog({
        header: 'Second Dialog',
        target: document.getElementById('target'),
        animationSettings: { effect: 'None' },
        height: 217,
        visible: false,
        showCloseIcon: true,
        isModal: true,
        width: 285,
        buttons: [{
            click: dlg2ButtonClick,
            buttonModel: { content: 'Close', isPrimary: true }
        }],
        open: dialogOpen,
        close: dialogClose2
    });
    dialogObj2.appendTo('#secondDialog');

    // Button has been created to open the Dialog
    let button: Button = new Button({});
    button.appendTo('#dialogBtn');

    document.getElementById('dialogBtn').onclick = (): void => {
        dialogObj.show();
    };

    // Navigate to corresponding link
    function dlgButtonClick(): void {
        dialogObj2.show();
    }

    function dlg2ButtonClick(): void {
        dialogObj2.hide();
    }

    // 'Open' Button will be shown, if Dialog is closed
    function dialogClose(): void {
        document.getElementById('dialogBtn').style.display = 'block';
    }

    function dialogClose2(): void {
        document.getElementById('dialogBtn').style.display = 'none';
    }

    // 'Open' Button will be hidden, if Dialog is opened
    function dialogOpen(): void {
        document.getElementById('dialogBtn').style.display = 'none';
    }
};