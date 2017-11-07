import { Dialog } from '@syncfusion/ej2-popups';
import { Button } from '@syncfusion/ej2-buttons';

/**
 * Default Dialog sample
 */

let rtlContent: string = '<div>Are you sure you want to delete sea.jpg?</div>';

this.default = () => {
    // Render Dialog in RTL format by setting 'enableRtl' as true
    let dialogObj: Dialog = new Dialog({
        header: 'Delete File',
        content: rtlContent,
        showCloseIcon: true,
        buttons: [{
            click: dlgButtonClick,
            buttonModel: { content: 'Yes', cssClass: 'e-flat', isPrimary: true }
        },
        {
            click: dlgButtonClick,
            buttonModel: { content: 'No', cssClass: 'e-flat' }
        }],
        target: document.getElementById('target'),
        width: '300px',
        enableRtl: true,
        open: dialogOpen,
        close: dialogClose,
        animationSettings: { effect: 'Zoom' }
    });
    dialogObj.appendTo('#dialog');
    document.getElementById('dialogBtn').focus();
    let button: Button = new Button({
    });
    button.appendTo('#dialogBtn');

    document.getElementById('dialogBtn').onclick = (): void => {
        dialogObj.show();
    };

    // Dialog will be closed, while clicking 'Yes'/'No' buttons of the Dialog
    function dlgButtonClick(): void {
        dialogObj.hide();
    }

    // 'Open' Button will be shown, if Dialog is closed
    function dialogClose(): void {
        document.getElementById('dialogBtn').style.display = 'block';
    }

    // 'Open' Button will be hidden, if Dialog is opened
    function dialogOpen(): void {
        document.getElementById('dialogBtn').style.display = 'none';
    }
};