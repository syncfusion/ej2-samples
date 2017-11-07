import { Dialog } from '@syncfusion/ej2-popups';
import { Button } from '@syncfusion/ej2-buttons';
import { Ajax } from '@syncfusion/ej2-base';
/**
 * Ajax  Dialog sample
 */

this.default = () => {
    // Request to load AJAX content
    let ajax: Ajax = new Ajax('./src/dialog/twitter.html', 'GET', true);
    ajax.send().then();
    // Rendering Dialog on AJAX success
    ajax.onSuccess = (data: string): void => {
        let dialogObj: Dialog = new Dialog({
            header: 'Twitter',
            showCloseIcon: true,
            width: '500px',
            target: document.getElementById('target'),
            animationSettings: { effect: 'None' },
            open: dialogOpen,
            close: dialogClose,
            content: data
        });
        dialogObj.appendTo('#dialog');
        document.getElementById('dialogBtn').focus();

        // Button has been created to open the Dialog
        let button: Button = new Button({
        });
        button.appendTo('#dialogBtn');
        document.getElementById('dialogBtn').onclick = (): void => {
            dialogObj.show();
        };

        // 'Open' Button will be shown, if Dialog is closed
        function dialogClose(): void {
            document.getElementById('dialogBtn').style.display = 'block';
        }

        // 'Open' Button will be hidden, if Dialog is opened
        function dialogOpen(): void {
            document.getElementById('dialogBtn').style.display = 'none';
        }
    };
};