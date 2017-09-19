import { Dialog } from '@syncfusion/ej2-popups';
import { Button } from '@syncfusion/ej2-buttons';

/**
 * Default Dialog sample
 */

this.default = () => {
    let dialogObj: Dialog = new Dialog({
        width: '335px',
        header: 'Software Update',
        content: 'Your current software version is up to date.',
        target: document.getElementById('target'),
        isModal: true,
        animationSettings: { effect: 'None' },
        buttons: [{
            click: dlgButtonClick,
            buttonModel: { content: 'OK', cssClass: 'e-flat', isPrimary: true }
        }],
        open: dialogOpen,
        close: dialogClose
    });
    dialogObj.appendTo('#modalDialog');
    document.getElementById('dialogBtn').focus();
    let button: Button = new Button({
    });
    button.appendTo('#dialogBtn');
    document.getElementById('dialogBtn').onclick = (): void => {
        dialogObj.show();
    };

    function dlgButtonClick(): void {
        dialogObj.hide();
    }

    function dialogClose(): void {
        document.getElementById('dialogBtn').style.display = 'block';
    }
    function dialogOpen(): void {
        document.getElementById('dialogBtn').style.display = 'none';
    }

    document.getElementById('checkbox').onclick = () => {
        if ((document.getElementById('checkbox') as HTMLInputElement).checked) {
            dialogObj.overlayClick = (): void => {
                dialogObj.hide();
            };
        } else {
            dialogObj.overlayClick = (): void => {
                dialogObj.show();
            };
        }
    };
};