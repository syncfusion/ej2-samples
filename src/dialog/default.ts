import { Button } from '@syncfusion/ej2-buttons';
import { Dialog } from '@syncfusion/ej2-popups';

/**
 * Default Dialog sample
 */
 this.default = () => {

    let dialogObj: Dialog = new Dialog({
        header: 'About SYNCFUSION Succinctly Series',
        target: document.getElementById('target'),
        animationSettings: { effect: 'None' },
        showCloseIcon: true,
        width: '500px',
        buttons: [{
            click: dlgButtonClick,
            buttonModel: { content: 'Learn More', isPrimary: true }
        }],
        open: dialogOpen,
        close: dialogClose
    });
    dialogObj.appendTo('#defaultDialog');

    // Button has been created to open the Dialog
    let button: Button = new Button({});
    button.appendTo('#dialogBtn');

    document.getElementById('dialogBtn').onclick = (): void => {
        dialogObj.show();
    };

    // Navigate to corresponding link
    function dlgButtonClick(): void {
        window.open('https://www.syncfusion.com/company/about-us', '_blank');
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
